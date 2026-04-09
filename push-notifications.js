/* =========================================
   Push Notifications — Frontend Setup
   =========================================
   - Custom glassmorphism permission popup
   - FCM token registration & storage in RTDB
   - Cookie/localStorage-based suppression
   ========================================= */

(function () {
    'use strict';

    // ── Config ──────────────────────────────────
    // Replace with your VAPID key from Firebase Console:
    // Project Settings → Cloud Messaging → Web Push certificates → Generate key pair
    const VAPID_KEY = 'YOUR_VAPID_KEY_HERE';

    const DB_URL = 'https://prapan-biswas-default-rtdb.asia-southeast1.firebasedatabase.app';
    const STORAGE_KEY_GRANTED = 'pb_push_granted';
    const STORAGE_KEY_DISMISSED = 'pb_push_dismissed_at';
    const DISMISS_COOLDOWN_DAYS = 7;
    const POPUP_DELAY_MS = 2000;

    // ── Guard ───────────────────────────────────
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

    // ── Should we show the popup? ───────────────
    function shouldShowPopup() {
        // Already granted permission & registered
        if (localStorage.getItem(STORAGE_KEY_GRANTED) === 'true') return false;

        // Browser-level permanently denied
        if (Notification.permission === 'denied') return false;

        // Already allowed in browser but we haven't stored token yet
        if (Notification.permission === 'granted') {
            // Silently register token without popup
            registerFCMToken();
            return false;
        }

        // User dismissed our popup — check cooldown
        const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
        if (dismissedAt) {
            const elapsed = Date.now() - parseInt(dismissedAt, 10);
            const cooldown = DISMISS_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
            if (elapsed < cooldown) return false;
        }

        return true;
    }

    // ── Create Popup ────────────────────────────
    function createPopup() {
        // Inject styles
        const style = document.createElement('style');
        style.textContent = `
            .pb-push-overlay {
                position: fixed; inset: 0; z-index: 9999;
                background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
                display: flex; align-items: center; justify-content: center;
                opacity: 0; transition: opacity 0.4s ease;
                padding: 1rem;
            }
            .pb-push-overlay.show { opacity: 1; }
            .pb-push-card {
                max-width: 400px; width: 100%;
                background: rgba(15,15,25,0.85);
                backdrop-filter: blur(24px) saturate(1.4);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 1.25rem;
                padding: 2rem;
                box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 80px rgba(99,102,241,0.08);
                transform: translateY(30px) scale(0.95);
                transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
                opacity: 0; text-align: center;
                font-family: 'Inter', -apple-system, sans-serif;
            }
            .pb-push-overlay.show .pb-push-card {
                transform: translateY(0) scale(1); opacity: 1;
            }
            .pb-push-icon {
                width: 56px; height: 56px; margin: 0 auto 1rem;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2));
                border: 1px solid rgba(99,102,241,0.25);
                display: flex; align-items: center; justify-content: center;
                font-size: 1.6rem;
                animation: pb-push-bell 2s ease-in-out infinite;
            }
            @keyframes pb-push-bell {
                0%, 100% { transform: rotate(0deg); }
                10% { transform: rotate(14deg); }
                20% { transform: rotate(-14deg); }
                30% { transform: rotate(8deg); }
                40% { transform: rotate(-4deg); }
                50%, 100% { transform: rotate(0deg); }
            }
            .pb-push-title {
                font-family: 'Outfit', 'Inter', sans-serif;
                font-size: 1.2rem; font-weight: 700;
                color: #fff; margin-bottom: 0.5rem;
            }
            .pb-push-desc {
                font-size: 0.85rem; color: rgba(255,255,255,0.55);
                line-height: 1.55; margin-bottom: 1.5rem;
            }
            .pb-push-actions { display: flex; gap: 0.6rem; justify-content: center; }
            .pb-push-btn {
                padding: 0.65rem 1.5rem; border: none; border-radius: 0.65rem;
                font-size: 0.82rem; font-weight: 600; cursor: pointer;
                font-family: inherit; transition: all 0.25s;
                -webkit-tap-highlight-color: transparent;
            }
            .pb-push-btn:active { transform: scale(0.96); }
            .pb-push-allow {
                background: linear-gradient(135deg, #6366f1, #a855f7);
                color: #fff; box-shadow: 0 2px 16px rgba(99,102,241,0.3);
            }
            .pb-push-allow:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 24px rgba(99,102,241,0.4);
            }
            .pb-push-dismiss {
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.1);
                color: rgba(255,255,255,0.6);
            }
            .pb-push-dismiss:hover { background: rgba(255,255,255,0.1); color: #fff; }
        `;
        document.head.appendChild(style);

        // Create DOM
        const overlay = document.createElement('div');
        overlay.className = 'pb-push-overlay';
        overlay.innerHTML = `
            <div class="pb-push-card">
                <div class="pb-push-icon">🔔</div>
                <div class="pb-push-title">Stay in the loop!</div>
                <div class="pb-push-desc">
                    Want to know when I publish new projects or blog posts?
                    Allow notifications to get updates — no spam, I promise!
                </div>
                <div class="pb-push-actions">
                    <button class="pb-push-btn pb-push-allow" id="pb-push-allow">Allow</button>
                    <button class="pb-push-btn pb-push-dismiss" id="pb-push-dismiss">Not now</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.add('show'));
        });

        // Close popup
        function closePopup() {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 400);
        }

        // Allow button
        document.getElementById('pb-push-allow').addEventListener('click', () => {
            closePopup();
            requestPermissionAndRegister();
        });

        // Dismiss button
        document.getElementById('pb-push-dismiss').addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
            closePopup();
        });

        // Click overlay to dismiss
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
                closePopup();
            }
        });
    }

    // ── Request Permission & Register ───────────
    async function requestPermissionAndRegister() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                await registerFCMToken();
            }
        } catch (err) {
            console.warn('[Push] Permission request failed:', err);
        }
    }

    // ── Register FCM Token ──────────────────────
    async function registerFCMToken() {
        try {
            // Ensure Firebase is initialized
            if (typeof firebase === 'undefined') {
                console.warn('[Push] Firebase not loaded');
                return;
            }

            // Register service worker
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('[Push] Service Worker registered');

            // Get FCM instance
            const messaging = firebase.messaging();

            // Get token
            const token = await messaging.getToken({
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration
            });

            if (token) {
                console.log('[Push] FCM Token:', token.substring(0, 20) + '...');

                // Save token to RTDB
                await saveTokenToDatabase(token);

                // Mark as granted
                localStorage.setItem(STORAGE_KEY_GRANTED, 'true');
                localStorage.removeItem(STORAGE_KEY_DISMISSED);
            }
        } catch (err) {
            console.warn('[Push] Token registration failed:', err);
        }
    }

    // ── Save Token to RTDB ──────────────────────
    async function saveTokenToDatabase(token) {
        try {
            // Create a simple hash of the token for the key
            const tokenKey = btoa(token).replace(/[.#$/\[\]]/g, '_').substring(0, 40);

            const payload = {
                token: token,
                createdAt: new Date().toISOString(),
                userAgent: navigator.userAgent.substring(0, 200),
                platform: navigator.platform || 'unknown'
            };

            // Use App Check token if available
            const headers = { 'Content-Type': 'application/json' };
            if (typeof getAppCheckToken === 'function') {
                try {
                    const acToken = await getAppCheckToken();
                    if (acToken) headers['X-Firebase-AppCheck'] = acToken;
                } catch (e) { /* proceed without */ }
            }

            const resp = await fetch(
                `${DB_URL}/fcm_tokens/${tokenKey}.json`,
                { method: 'PUT', headers, body: JSON.stringify(payload) }
            );

            if (resp.ok) {
                console.log('[Push] Token saved to database');
            }
        } catch (err) {
            console.warn('[Push] Failed to save token:', err);
        }
    }

    // ── Handle Foreground Messages ──────────────
    function setupForegroundHandler() {
        if (typeof firebase === 'undefined' || !firebase.messaging) return;

        try {
            const messaging = firebase.messaging();
            messaging.onMessage((payload) => {
                console.log('[Push] Foreground message:', payload);

                const data = payload.notification || payload.data || {};
                const title = data.title || 'New Update';
                const body = data.body || 'Check out what\'s new!';

                // Show a subtle in-app toast instead of native notification
                showInAppNotification(title, body, data.image, data.click_action || '/');
            });
        } catch (err) {
            console.warn('[Push] Foreground handler failed:', err);
        }
    }

    // ── In-App Notification Toast ────────────────
    function showInAppNotification(title, body, image, url) {
        const style = document.createElement('style');
        style.textContent = `
            .pb-notif-toast {
                position: fixed; top: 1rem; right: 1rem; z-index: 9998;
                max-width: 360px; width: calc(100% - 2rem);
                background: rgba(15,15,25,0.9); backdrop-filter: blur(20px);
                border: 1px solid rgba(99,102,241,0.2);
                border-radius: 0.85rem; padding: 1rem; cursor: pointer;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                display: flex; gap: 0.75rem; align-items: flex-start;
                font-family: 'Inter', sans-serif;
                transform: translateX(120%); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
            }
            .pb-notif-toast.show { transform: translateX(0); }
            .pb-notif-toast img { width: 48px; height: 48px; border-radius: 0.5rem; object-fit: cover; flex-shrink: 0; }
            .pb-notif-toast .notif-content { flex: 1; min-width: 0; }
            .pb-notif-toast .notif-title { font-weight: 600; font-size: 0.85rem; color: #fff; margin-bottom: 0.2rem; }
            .pb-notif-toast .notif-body { font-size: 0.78rem; color: rgba(255,255,255,0.6); line-height: 1.4; }
            .pb-notif-close {
                background: none; border: none; color: rgba(255,255,255,0.3);
                font-size: 1.1rem; cursor: pointer; padding: 0; line-height: 1;
                transition: color 0.2s;
            }
            .pb-notif-close:hover { color: #fff; }
        `;
        if (!document.querySelector('style[data-pb-notif]')) {
            style.setAttribute('data-pb-notif', '');
            document.head.appendChild(style);
        }

        const toast = document.createElement('div');
        toast.className = 'pb-notif-toast';
        toast.innerHTML = `
            ${image ? `<img src="${image}" alt="">` : ''}
            <div class="notif-content">
                <div class="notif-title">${title}</div>
                <div class="notif-body">${body}</div>
            </div>
            <button class="pb-notif-close">✕</button>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        toast.querySelector('.notif-content').addEventListener('click', () => {
            window.location.href = url;
        });

        toast.querySelector('.pb-notif-close').addEventListener('click', (e) => {
            e.stopPropagation();
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        });

        // Auto dismiss after 8s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 8000);
    }

    // ── Init ────────────────────────────────────
    function init() {
        // Setup foreground handler
        setupForegroundHandler();

        // Check if we should show popup
        if (shouldShowPopup()) {
            setTimeout(createPopup, POPUP_DELAY_MS);
        }
    }

    // Wait for DOM + Firebase
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
    } else {
        setTimeout(init, 500);
    }

})();
