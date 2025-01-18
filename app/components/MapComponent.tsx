import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for Leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
})

type Location = {
  lat: number;
  lng: number;
}

type MapComponentProps = {
  value: Location;
  onChange: (location: Location) => void;
}

function LocationMarker({ position, onChange }: { position: Location; onChange: (location: Location) => void }) {
  const map = useMapEvents({
    click(e) {
      onChange(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position ? <Marker position={position} /> : null
}

export default function MapComponent({ value, onChange }: MapComponentProps) {
  const [position, setPosition] = useState<Location>(value)

  useEffect(() => {
    setPosition(value)
  }, [value])

  const handlePositionChange = (newPosition: Location) => {
    setPosition(newPosition)
    onChange(newPosition)
  }

  return (
    <div className="h-[200px] rounded-md overflow-hidden">
      <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={position} onChange={handlePositionChange} />
      </MapContainer>
    </div>
  )
}

