import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD1e3LrEGStfFOvSr-Di5oBgQQPnvJtU-g",
  authDomain: "village-app-efa90.firebaseapp.com",
  projectId: "village-app-efa90",
  storageBucket: "village-app-efa90.firebasestorage.app",
  messagingSenderId: "351880359365",
  appId: "1:351880359365:web:489c4a605e748a17cbafac",
  measurementId: "G-WDPLXCKY31"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
