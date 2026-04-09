/* =========================================
   Firebase Messaging Service Worker
   =========================================
   Must be at the root of the site for FCM to work.
   Handles background push notifications.
   ========================================= */

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAbL-DvzapDfWnYOY6abNhPvBW614GdEJE",
    authDomain: "prapan-biswas.firebaseapp.com",
    projectId: "prapan-biswas",
    storageBucket: "prapan-biswas.firebasestorage.app",
    messagingSenderId: "453264451702",
    appId: "1:453264451702:web:fda490119ff32667701757"
});

const messaging = firebase.messaging();

// Handle background messages (when page is not in focus)
messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Background message:', payload);

    const data = payload.notification || payload.data || {};
    const title = data.title || 'New Update';
    const options = {
        body: data.body || 'Check out what\'s new!',
        icon: '/attached_assets/file_0000000087f072078bb72ddd1c8138a2_1763603473698.png',
        badge: '/attached_assets/file_0000000087f072078bb72ddd1c8138a2_1763603473698.png',
        image: data.image || undefined,
        data: {
            url: data.click_action || data.url || '/'
        },
        actions: [
            { action: 'open', title: 'View' }
        ],
        vibrate: [100, 50, 100],
        tag: 'prapan-notification'
    };

    return self.registration.showNotification(title, options);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }
            return clients.openWindow(url);
        })
    );
});
