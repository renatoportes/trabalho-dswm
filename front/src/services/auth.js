import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBZX0AUdM5vss6WWKXR9UEj1ch6mMXOv-w",
  authDomain: "trabalho-dswm.firebaseapp.com",
  projectId: "trabalho-dswm",
  storageBucket: "trabalho-dswm.firebasestorage.app",
  messagingSenderId: "945224669433",
  appId: "1:945224669433:web:6b6b27880a820c653daa28"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth };