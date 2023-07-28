import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAV4D2bdwymi7NH4aFixK92wJ8y8_ndqbg', // Reemplaza esto con tu propia API Key de Google Maps
  });

  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error.message);
        }
      );
    } else {
      console.error('La geolocalización no es compatible con este navegador.');
    }
  }, []);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={userPosition}
      zoom={15}
      onLoad={handleMapLoad}
    >
      {userPosition && <Marker position={userPosition} label="You are here" />}
    </GoogleMap>
  ) : (
    <div>Cargando mapa...</div>
  );
};

export default App;