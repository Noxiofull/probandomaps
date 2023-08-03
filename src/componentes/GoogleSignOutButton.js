import React from 'react';
import { signOut ,getAuth} from "firebase/auth";
import '../styleCss/GoogleButton.css'; // Importa los estilos CSS

const GoogleSignOutButton = () => {
    const signOutWithGoogle = async () => {
        const auth = getAuth();
        return await signOut(auth);
    };

  return (
    <button onClick={signOutWithGoogle} className="google-button">
      <span className="material-icons google-icon">exit_to_app</span>
      Cerrar Sesión
    </button>
  );
};

export default GoogleSignOutButton;