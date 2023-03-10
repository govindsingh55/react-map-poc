import { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';;
// lat: 26.837730 long: 83.710610
function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [markers, setMarkers] = useState([{ lat: 28.7041, lng: 77.1025 }]);
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  const handleLatInputChange = (event) => {
    setLatInput(event.target.value);
  }

  const handleLngInputChange = (event) => {
    setLngInput(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newMarker = { lat: parseFloat(latInput), lng: parseFloat(lngInput) };
    setMarker(newMarker);
    setCenter(newMarker);
    setLatInput('');
    setLngInput('');
  }


  const handleMapClick = (event) => {
    const newMarker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkers([...markers, newMarker]);
  }

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>

  return isLoaded ? (
    <div style={{ height: '100vh', width: '100%' }}>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="lat-input">Latitude: </label>
        <input id="lat-input" type="text" value={latInput} onChange={handleLatInputChange} className="border border-gray-500 rounded-sm my-1" />
        <br />
        <label htmlFor="lng-input">Longitude: </label>
        <input id="lng-input" type="text" value={lngInput} onChange={handleLngInputChange} className="border border-gray-500 rounded-sm my-1" />
        <br />
        <button type="submit" className="m-auto bg-indigo-500 text-white px-2 py-1 rounded-sm">Update</button>
      </form>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={center}
        zoom={5}
        onClick={handleMapClick}
      >
        {markers.map(marker => (
          <Marker
            position={marker}
            icon={{
              url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
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
