import { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';
// lat: 26.837730 long: 83.710610

const DEFAULT_MAP_CENTER = { lat: 26.837730, lng: 83.710610 };
function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    libraries: ['places']
  });
  const [mapCenter, setMapCenter] = useState(DEFAULT_MAP_CENTER);
  const [markers, setMarkers] = useState([{ lat: 28.7041, lng: 77.1025 }]);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleMapClick = (event) => {
    const newMarker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkers([...markers, newMarker]);
  }

  const handlePlaceSelect = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setMapCenter({ lat, lng });
  };

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>

  return isLoaded ? (
    <div style={{ height: '100vh', width: '100%' }}>
      <Autocomplete
        onLoad={(autocomplete) => {
          console.log('auto complete : ', autocomplete)
          setAutocomplete(autocomplete)
        }}
        onPlaceChanged={() => {
          const place = autocomplete.getPlace();
          handlePlaceSelect(place);
        }}
      >
        <input placeholder="Enter an address" />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={mapCenter}
        zoom={8}
        onClick={handleMapClick}
      >
        {markers.map(marker => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={marker}
            icon={{
              url: 'education-marker.png',
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 50)
            }}
          />
        ))}
      </GoogleMap>
    </div>
  ) : <div>Loading...</div>
}


function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
