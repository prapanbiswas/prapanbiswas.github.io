/* =========================================
   Firebase App Check — Public Site Guard
   =========================================
   This module initializes Firebase App Check with
   reCAPTCHA Enterprise on public pages. It provides
   a secure fbGet() that attaches an App Check token
   to every REST request to Firebase RTDB.
   ========================================= */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAbL-DvzapDfWnYOY6abNhPvBW614GdEJE",
    authDomain: "prapan-biswas.firebaseapp.com",
    databaseURL: "https://prapan-biswas-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "prapan-biswas",
    storageBucket: "prapan-biswas.firebasestorage.app",
    messagingSenderId: "453264451702",
    appId: "1:453264451702:web:fda490119ff32667701757"
};

const RECAPTCHA_SITE_KEY = "YOUR_NEW_SITE_KEY_ENDING_IN_6qT";
const FIREBASE_DB = FIREBASE_CONFIG.databaseURL;

let _appCheckInstance = null;
let _appCheckTokenCache = { token: null, expireTime: 0 };
let _firebaseInitialized = false;

/**
 * Initialize Firebase + App Check on the public site.
 * Must be called after Firebase SDK scripts are loaded.
 * Safe to call multiple times — will only init once.
 */
function initPublicFirebase() {
    if (_firebaseInitialized) return;
    _firebaseInitialized = true;

    try {
        // Check if Firebase is already initialized (e.g. admin page)
        let app;
        try {
            app = firebase.app();
        } catch (e) {
            app = firebase.initializeApp(FIREBASE_CONFIG);
        }

        // Initialize App Check with standard reCAPTCHA v3 (NOT Enterprise)
        _appCheckInstance = firebase.appCheck();
        _appCheckInstance.activate(
            new firebase.appCheck.ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
            /* isTokenAutoRefreshEnabled */ true
        );
        console.log('[AppCheck] Initialized with reCAPTCHA v3');
    } catch (err) {
        console.warn('[AppCheck] Init failed:', err.message);
    }
}

/**
 * Get a valid App Check token (with caching).
 * Returns the token string or null if unavailable.
 */
async function getAppCheckToken() {
    if (!_appCheckInstance) return null;

    // Return cached token if still valid (with 60s buffer)
    const now = Date.now();
    if (_appCheckTokenCache.token && _appCheckTokenCache.expireTime > now + 60000) {
        return _appCheckTokenCache.token;
    }

    try {
        const result = await _appCheckInstance.getToken(/* forceRefresh */ false);
        _appCheckTokenCache = {
            token: result.token,
            expireTime: now + 3300000 // ~55 min cache (tokens last ~60 min)
        };
        return result.token;
    } catch (err) {
        console.warn('[AppCheck] Token fetch failed:', err.message);
        return null;
    }
}

/**
 * Secure Firebase REST read — attaches App Check token header.
 * Falls back to plain request if App Check is unavailable.
 */
async function fbGet(path) {
    const token = await getAppCheckToken();
    const headers = {};

    if (token) {
        headers['X-Firebase-AppCheck'] = token;
    }

    const res = await fetch(`${FIREBASE_DB}/${path}.json`, { headers });

    if (!res.ok) {
        throw new Error(`Firebase fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
