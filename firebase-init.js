
  // Import the functions you need from the SDKs you need
    import {initializeApp} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
    import {getAnalytics} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyD3lbh7gFC_mOsrC8qRCOc8PX71RQ1ngM4",
    authDomain: "examhelp-7939a.firebaseapp.com",
    projectId: "examhelp-7939a",
    storageBucket: "examhelp-7939a.firebasestorage.app",
    messagingSenderId: "799197837592",
    appId: "1:799197837592:web:17ec7a83bf5cc16665066d",
    measurementId: "G-H6JS3PYLTN"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
