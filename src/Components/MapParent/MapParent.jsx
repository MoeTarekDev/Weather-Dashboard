import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function MapParent({ lat, lon }) {
  return (
    <div className="md:col-span-2 lg:col-span-full border border-newBoxesBorder rounded-lg h-[23rem]">
      <MapContainer
        center={[lat, lon]} // Properly set the center prop
        zoom={13} // Properly set the zoom prop
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ width: "calc(100% - 2rem)", height: "calc(100% - 2rem)" }} // Ensure style is passed correctly
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}></Marker>
      </MapContainer>
    </div>
  );
}
