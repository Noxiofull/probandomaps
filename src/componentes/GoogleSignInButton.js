import React from 'react';
import firebase from 'firebase/compat/app'
import { GoogleAuthProvider,signInWithPopup ,getAuth} from "firebase/auth";
import { auth } from '../firebaseConfig';
import '../styleCss/GoogleButton.css'; // Importa los estilos CSS

const GoogleSignInButton = () => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        // console.log(auth.config)
        return await signInWithPopup(auth, provider);
    };

  return (
    <button onClick={signInWithGoogle} className="google-button">
      <span className="material-icons google-icon">account_circle</span>
      Iniciar sesión con Google
    </button>
  );
};

export default GoogleSignInButton;