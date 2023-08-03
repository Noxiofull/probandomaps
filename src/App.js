import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GoogleSignInButton from './componentes/GoogleSignInButton';
import GoogleMapComponent from './GoogleMapComponent';

const App = () => {
  const [user, setUser] = useState(null);

  // Obtener el objeto de autenticación de Firebase
  const auth = getAuth();

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpiar el suscriptor cuando el componente se desmonte
    return () => unsubscribe();
  }, [auth]);

  console.log(user);

  return (
    <>
        <div>
      {!user ? <GoogleSignInButton /> : <GoogleMapComponent />}
    </div>
    </>

  );
};

export default App;