import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link, useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

// Import your custom marker icon
import customMarkerIcon from './assets/custom-marker-icon.png';

// Define the custom icon
const customIcon = L.icon({
  iconUrl: customMarkerIcon,
  iconSize: [38, 38], // size of the icon
  iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const MapView = ({ bodegas, filters, showMap, page }) => {
  const location = useLocation();
  const state = location.state || { filters, showMap, page }; // Use passed props as default values

  console.log("MapView state:", state);

  return (
    <MapContainer center={[55.6761, 12.5683]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bodegas.map(bodega => (
        <Marker 
          key={bodega.id} 
          position={[bodega.latitude, bodega.longitude]} 
          icon={customIcon}
        >
          <Popup>
            <Link 
              to={`/bodegas/${bodega.id}`}
              state={{ filters: state.filters, showMap: state.showMap, page: state.page }}
            >
              <strong>{bodega.Name}</strong>
            </Link><br />
            {bodega.Address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
