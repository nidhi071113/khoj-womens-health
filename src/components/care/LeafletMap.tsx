import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapProvider {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  type: string;
}

const PUNE_CLINIC_COORDS: MapProvider[] = [
  { id: 'prov-2', name: 'Sahyadri Super Speciality Hospital', area: 'Deccan Gymkhana', lat: 18.5158, lng: 73.8415, type: 'Gynecology | Private' },
  { id: 'prov-4', name: 'Ruby Hall Clinic', area: 'Sassoon Road', lat: 18.5323, lng: 73.8765, type: 'Gynecology | Private' },
  { id: 'prov-3', name: 'KEM Hospital & Research Centre', area: 'Rasta Peth', lat: 18.5195, lng: 73.8683, type: 'Gynecology | Subsidized' },
  { id: 'prov-1', name: 'Kamala Nehru General Hospital', area: 'Mangalwar Peth', lat: 18.5255, lng: 73.8642, type: 'Gynecology | Public' },
  { id: 'prov-5', name: 'Dr. Ananya Joshi Women’s Clinic', area: 'Kothrud', lat: 18.5074, lng: 73.8077, type: 'Gynecology | Private' },
  { id: 'prov-7', name: 'Cloudnine Hospital', area: 'Shivajinagar', lat: 18.5308, lng: 73.8475, type: 'Maternity | Private' }
];

export const LeafletMap: React.FC<{ selectedProviderId?: string; onSelectProvider?: (id: string) => void }> = ({
  selectedProviderId,
  onSelectProvider
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [18.5204, 73.8467],
        zoom: 12,
        scrollWheelZoom: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(map);

      // Custom marker icon using Khoj brand colors
      const customPin = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div style="
            background-color: #C8553D;
            width: 28px;
            height: 28px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #FFF8F2;
            box-shadow: 0 4px 10px rgba(91,42,78,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 10px;
              height: 10px;
              background-color: #FFF8F2;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
      });

      PUNE_CLINIC_COORDS.forEach(clinic => {
        const marker = L.marker([clinic.lat, clinic.lng], { icon: customPin }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #2B2230;">
            <strong style="color: #5B2A4E; display: block; font-size: 13px;">${clinic.name}</strong>
            <span style="color: #C8553D; font-size: 11px;">${clinic.type}</span><br/>
            <span style="color: #6E6072;">${clinic.area}, Pune</span>
          </div>
        `);
        marker.on('click', () => {
          if (onSelectProvider) onSelectProvider(clinic.id);
        });
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-clay shadow-plum-sm z-10">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-plum border border-clay shadow-xs z-[1000] pointer-events-none">
        Pune, Maharashtra
      </div>
    </div>
  );
};
