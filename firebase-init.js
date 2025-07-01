import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "AIzaSyD3lbh7gFC_mOsrC8qRCOc8PX71RQ1ngM4",
    authDomain: "examhelp-7939a.firebaseapp.com",
    projectId: "examhelp-7939a",
    storageBucket: "examhelp-7939a.firebasestorage.app",
    messagingSenderId: "799197837592",
    appId: "1:799197837592:web:17ec7a83bf5cc16665066d",
    measurementId: "G-H6JS3PYLTN"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export both storage and db
export const storage = getStorage(app);
export const db = getFirestore(app);
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js";

initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6Le-i3MrAAAAAH9QMiF-D9LNvWHpjic7cZ6Cw7sy"), // 👈 From Google
    isTokenAutoRefreshEnabled: true
});
