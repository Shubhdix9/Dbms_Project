'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';

// Custom icons using standard HTML/CSS so we don't need image assets
import L from 'leaflet';

const JKLU_COORDS: [number, number] = [26.837, 75.659];

const jkluIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #22c55e; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const propertyIcon = (isSelected: boolean, price: number) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="display: flex; flex-direction: column; items-center; z-index: ${isSelected ? 1000 : 1}; position: relative;">
          <div style="background-color: ${isSelected ? '#22c55e' : 'white'}; color: ${isSelected ? 'white' : '#1f2937'}; border: 2px solid ${isSelected ? 'white' : '#e5e7eb'}; border-radius: 9999px; padding: 2px 8px; font-size: 11px; font-weight: 800; white-space: nowrap; margin-bottom: 4px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);">
            ₹${(price / 1000).toFixed(1)}k
          </div>
          <div style="width: 14px; height: 14px; background-color: ${isSelected ? '#22c55e' : '#3b82f6'}; border: 2px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2); align-self: center;"></div>
         </div>`,
  iconSize: [60, 40],
  iconAnchor: [30, 40]
});

function MapUpdater({ selectedProperty }: { selectedProperty: any }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedProperty) {
      const bounds = L.latLngBounds([JKLU_COORDS, [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng]]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true, duration: 1 });
    } else {
      map.setView(JKLU_COORDS, 14, { animate: true, duration: 1 });
    }
  }, [selectedProperty, map]);
  
  return null;
}

export default function Map({ properties, selectedProperty, onSelectProperty, calculateCost }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Loading Map...</div>;

  return (
    <MapContainer center={JKLU_COORDS} zoom={14} className="w-full h-full z-0" zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2"
        maxZoom={20}
      />
      
      <MapUpdater selectedProperty={selectedProperty} />
      
      {/* JKLU Marker */}
      <Marker position={JKLU_COORDS} icon={jkluIcon}>
        <Popup>JK Lakshmipat University</Popup>
      </Marker>

      {/* Property Markers */}
      {properties.map((p: any) => {
        const isSelected = selectedProperty?.id === p.id;
        return (
          <Marker 
            key={p.id} 
            position={[p.coordinates.lat, p.coordinates.lng]} 
            icon={propertyIcon(isSelected, calculateCost(p))}
            eventHandlers={{
              click: () => onSelectProperty(p)
            }}
          >
          </Marker>
        );
      })}

      {/* Animated Route Line */}
      {selectedProperty && (
        <Polyline 
          positions={[JKLU_COORDS, [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng]]} 
          pathOptions={{ color: '#3b82f6', weight: 5, opacity: 0.8 }}
        />
      )}
    </MapContainer>
  );
}
