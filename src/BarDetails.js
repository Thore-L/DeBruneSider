import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

// Import your custom marker icon
import customMarkerIcon from './assets/custom-marker-icon.png';
import bodegasData from './bodegas.json';  // Import the JSON file

// Define the custom icon
const customIcon = L.icon({
  iconUrl: customMarkerIcon,
  iconSize: [38, 38], // size of the icon
  iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const BarDetails = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bodega, setBodega] = useState(null);

  useEffect(() => {
    // Find the bodega by id in the JSON data
    const bodega = bodegasData.Bodegas.find(b => b.id === parseInt(id, 10));
    setBodega(bodega);
  }, [id]);

  if (!bodega) return <div>{language === 'Danish' ? 'Indlæser...' : 'Loading...'}</div>;

  console.log("BarDetails state:", location.state);

  const handleBack = () => {
    if (location.state) {
      navigate('/bodegas', { state: location.state });
    } else {
      navigate('/bodegas');
    }
  };

  return (
    <div className="p-4 general-text">
      <h1 className="text-2xl font-bold mb-4">{bodega.Name}</h1>
      <p>{language === 'Danish' ? 'Adresse' : 'Address'}: {bodega.Address}</p>
      <p>{language === 'Danish' ? 'Distrikt' : 'District'}: {bodega.District}</p>
      <p>{language === 'Danish' ? 'Rygning' : 'Smoking'}: {bodega.Smoking}</p>
      <p>{language === 'Danish' ? 'Udendørs siddepladser' : 'Outdoor Seating'}: {bodega.OutdoorSeating}</p>
      <p>{language === 'Danish' ? 'Øl på hanen' : 'Tap Beer'}: {bodega.TapBeer}</p>
      <p>{language === 'Danish' ? 'Pool' : 'Pool'}: {bodega.Pool}</p>
      <p>{language === 'Danish' ? 'Kicker' : 'Kicker'}: {bodega.Kicker}</p>
      <p>{language === 'Danish' ? 'Billigste øl' : 'Cheapest Beer'}: {bodega.CheapestBeer}</p>
      <p>{language === 'Danish' ? 'Special' : 'Special'}: {bodega.Special}</p>
      <p>{language === 'Danish' ? 'Beskrivelse' : 'Description'}: {bodega.Description}</p>
      <p>{language === 'Danish' ? 'Dato' : 'Date'}: {bodega.Date}</p>
      <p>{language === 'Danish' ? 'Noter' : 'Notes'}: {bodega.Notes}</p>
      
      <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
        <MapContainer center={[bodega.latitude, bodega.longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            position={[bodega.latitude, bodega.longitude]} 
            icon={customIcon}
          >
            <Popup>
              <strong>{bodega.Name}</strong><br />
              {bodega.Address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default BarDetails;
