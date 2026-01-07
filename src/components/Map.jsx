import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";

export const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([250, 50]);
  const {
    position: useGeolocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();

  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat || 40, mapLng || 0]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (useGeolocationPosition) {
      setMapPosition([useGeolocationPosition.lat, useGeolocationPosition.lng]);
    }
  }, [useGeolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!useGeolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangePos position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangePos({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      // console.log(e);
    },
  });
}
