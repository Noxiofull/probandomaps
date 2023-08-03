import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import GoogleSignOutButton from './componentes/GoogleSignOutButton';
const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const initialCenter = {
  lat: 10.391048, // Latitud del centro de Cartagena
  lng: -75.479426, // Longitud del centro de Cartagena
};

// Función para calcular la distancia en metros entre dos coordenadas
function calculateDistance(coord1, coord2) {
  const radianFactor = Math.PI / 180;
  const earthRadius = 6371000; // Radio de la Tierra en metros

  const lat1 = coord1.lat * radianFactor;
  const lng1 = coord1.lng * radianFactor;
  const lat2 = coord2.lat * radianFactor;
  const lng2 = coord2.lng * radianFactor;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}


const RouteRenderer = ({ directions }) => {
  return <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />;
};


const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAV4D2bdwymi7NH4aFixK92wJ8y8_ndqbg', // Reemplaza esto con tu propia API Key de Google Maps
  });

  const [userPosition, setUserPosition] = useState(null);
  const [directions, setDirections] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    let updateInterval;

    const updatePosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Comprobamos si userPosition es null antes de llamar a la función calculateDistance
            if (!userPosition || calculateDistance(userPosition, newPosition) > 1) {
              setUserPosition(newPosition);

              // Si tenemos una referencia al mapa, centrar el mapa en la nueva ubicación del usuario
              if (mapRef.current) {
                mapRef.current.panTo(newPosition);
              }
            }
          },
          (error) => {
            console.error('Error obteniendo la ubicación:', error.message);
          }
        );
      } else {
        console.error('La geolocalización no es compatible con este navegador.');
      }
    };

    updateInterval = setInterval(updatePosition, 5000); // Actualizar cada 5 segundos, ajusta el valor según tus necesidades

    // Limpiamos el intervalo cuando el componente se desmonta para detener el seguimiento de la ubicación
    return () => clearInterval(updateInterval);
  }, [userPosition]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  return isLoaded ? (
    <>
        <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={initialCenter}
      zoom={6}
      onLoad={handleMapLoad}
      clickableIcons={false} // Deshabilita la interacción con los íconos de Google Maps
    >
      {userPosition && <Marker position={userPosition} label="You are here" />}
      <Marker position={initialCenter} label="Point B" />

      {userPosition && (
        <DirectionsService
          options={{
            destination: initialCenter,
            origin: userPosition,
            travelMode: 'DRIVING',
          }}
          callback={(result) => {
            if (result !== null) {
              setDirections(result);
            }
          }}
        />
      )}

      {directions && <RouteRenderer directions={directions} />}
    </GoogleMap>
    <GoogleSignOutButton />
    </>

  ) : (
    <div>Cargando mapa...</div>
  );
};

export default GoogleMapComponent;