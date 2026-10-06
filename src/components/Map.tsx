'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';

import L from 'leaflet';

const JKLU_COORDS: [number, number] = [26.8379, 75.6495];

const jkluIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="display: flex; flex-direction: column; align-items: center;">
          <div style="background-color: #3b5c9b; color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; padding: 4px 10px; font-size: 13px; font-weight: 900; white-space: nowrap; margin-bottom: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
            JKLU CAMPUS
          </div>
          <div style="background-color: #3b5c9b; border: 4px solid white; border-radius: 50%; width: 24px; height: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
            <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
          </div>
         </div>`,
  iconSize: [120, 60],
  iconAnchor: [60, 60]
});

const propertyIcon = (isSelected: boolean, price: number) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="display: flex; flex-direction: column; align-items: center; z-index: ${isSelected ? 1000 : 1}; position: relative;">
          <div style="background-color: ${isSelected ? '#f97316' : 'white'}; color: ${isSelected ? 'white' : '#1f2937'}; border: 2px solid ${isSelected ? 'white' : '#e5e7eb'}; border-radius: 9999px; padding: 2px 8px; font-size: 11px; font-weight: 800; white-space: nowrap; margin-bottom: 4px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);">
            ₹${(price / 1000).toFixed(1)}k
          </div>
          <div style="width: 14px; height: 14px; background-color: ${isSelected ? '#f97316' : '#cbd5e1'}; border: 2px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);"></div>
         </div>`,
  iconSize: [60, 40],
  iconAnchor: [30, 40]
});

const distanceLabelIcon = (distance: string, duration: number) => {
  const mins = Math.ceil(duration / 60);
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: white; color: #1f2937; border-radius: 20px; padding: 6px 14px; font-size: 13px; font-weight: 900; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; border: 1px solid #e5e7eb; letter-spacing: 0.3px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; color: #4b5563;"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            ${mins} min <span style="color: #6b7280; font-weight: 600; margin-left: 4px;">(${distance} km)</span>
           </div>`,
    iconSize: [140, 34],
    iconAnchor: [70, 17]
  });
};

// Google Maps tile URLs
const TILE_LAYERS = {
  map: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  satellite: 'https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
};

// OSRM routing: fetches actual road path between two points
async function fetchRoute(from: [number, number], to: [number, number]): Promise<{ coords: [number, number][]; distance: number; duration: number } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coords: [number, number][] = route.geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
      return { coords, distance: route.distance, duration: route.duration };
    }
    return null;
  } catch {
    return null;
  }
}

function RoutingLayer({ selectedProperty }: { selectedProperty: any }) {
  const map = useMap();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);

  useEffect(() => {
    if (selectedProperty) {
      const dest: [number, number] = [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng];
      const bounds = L.latLngBounds([JKLU_COORDS, dest]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15, animate: true, duration: 0.8 });

      fetchRoute(JKLU_COORDS, dest).then(result => {
        if (result) {
          setRouteCoords(result.coords);
          setRouteInfo({ distance: result.distance, duration: result.duration });
        } else {
          setRouteCoords([JKLU_COORDS, dest]);
          setRouteInfo({ distance: parseFloat(selectedProperty.distanceKm) * 1000, duration: parseFloat(selectedProperty.distanceKm) * 180 });
        }
      });
    } else {
      setRouteCoords([]);
      setRouteInfo(null);
      map.setView(JKLU_COORDS, 15, { animate: true, duration: 0.8 });
    }
  }, [selectedProperty, map]);

  if (routeCoords.length === 0 || !routeInfo) return null;

  const midIdx = Math.floor(routeCoords.length / 2);
  const midPoint = routeCoords[midIdx];
  const distKm = (routeInfo.distance / 1000).toFixed(1);

  return (
    <>
      <Polyline positions={routeCoords} pathOptions={{ color: '#ea580c', weight: 8, opacity: 0.3 }} />
      <Polyline positions={routeCoords} pathOptions={{ color: '#f97316', weight: 5, opacity: 1 }} />
      <Marker position={midPoint} icon={distanceLabelIcon(distKm, routeInfo.duration)} interactive={false} />
    </>
  );
}

// Component to dynamically swap tile layers
function TileSwapper({ tileUrl }: { tileUrl: string }) {
  const map = useMap();

  useEffect(() => {
    map.eachLayer((layer) => {
      if ((layer as any)._url && (layer as any)._url.includes('google.com')) {
        map.removeLayer(layer);
      }
    });
    L.tileLayer(tileUrl, { maxZoom: 20 }).addTo(map);
  }, [tileUrl, map]);

  return null;
}

// Zoom controls using useMap
function ZoomControls() {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden" style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
      <button
        onClick={() => map.zoomIn()}
        className="px-3 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100 transition-all leading-none"
      >
        +
      </button>
      <div className="border-t border-gray-200"></div>
      <button
        onClick={() => map.zoomOut()}
        className="px-3 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100 transition-all leading-none"
      >
        −
      </button>
    </div>
  );
}

export default function Map({ properties, selectedProperty, onSelectProperty, calculateCost }: any) {
  const [mounted, setMounted] = useState(false);
  const [mapType, setMapType] = useState<'map' | 'satellite'>('map');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Loading Map...</div>;

  return (
    <div className="w-full h-full relative" style={{ background: '#f2efe9' }}>
      <MapContainer center={JKLU_COORDS} zoom={14} className="w-full h-full z-0" zoomControl={false} maxZoom={20}>
        <TileLayer
          url={TILE_LAYERS[mapType]}
          maxZoom={20}
        />

        <TileSwapper tileUrl={TILE_LAYERS[mapType]} />
        <RoutingLayer selectedProperty={selectedProperty} />
        <ZoomControls />

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
              eventHandlers={{ click: () => onSelectProperty(p) }}
            >
              <Popup>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{p.location}</div>
                <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4 }}>₹{calculateCost(p).toLocaleString()}/mo</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map / Satellite Toggle */}
      <div className="absolute bottom-4 left-4 z-[1000] flex bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => setMapType('map')}
          className={`px-4 py-2 text-xs font-bold transition-all ${
            mapType === 'map'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Map
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={`px-4 py-2 text-xs font-bold transition-all border-l border-gray-200 ${
            mapType === 'satellite'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Satellite
        </button>
      </div>
    </div>
  );
}
