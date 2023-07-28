import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const initialCenter = {
  lat: 4.570868, // Latitud de Colombia
  lng: -74.297332, // Longitud de Colombia
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAV4D2bdwymi7NH4aFixK92wJ8y8_ndqbg', // Reemplaza esto con tu propia API Key de Google Maps
  });

  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const updateInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
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
      }, 5000); // Actualizar cada 5 segundos, ajusta el valor según tus necesidades

      return () => clearInterval(updateInterval);
    } else {
      console.error('La geolocalización no es compatible con este navegador.');
    }
  }, []);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  // Lógica para establecer el centro del mapa y el nivel de zoom
  const centerMap = userPosition || initialCenter;
  const zoomLevel = userPosition ? 15 : 6; // Ajusta el nivel de zoom para mostrar más cerca el marcador si hay ubicación del usuario

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={centerMap}
      zoom={zoomLevel}
      onLoad={handleMapLoad}
    >
      {userPosition && <Marker position={userPosition} label="You are here" />}
    </GoogleMap>
  ) : (
    <div>Cargando mapa...</div>
  );
};

export default App;