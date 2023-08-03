
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA8ymNsrFSxJgOL7F6QR99RuUuWVVZRVrc",
    authDomain: "restaurantegru-5dd5d.firebaseapp.com",
    projectId: "restaurantegru-5dd5d",
    storageBucket: "restaurantegru-5dd5d.appspot.com",
    messagingSenderId: "589683454497",
    appId: "1:589683454497:web:f217a483fa3ddcf203e960",
    measurementId: "G-VT7L6KDYGF"
  };
  
  // Inicializa Firebase en tu aplicación
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };