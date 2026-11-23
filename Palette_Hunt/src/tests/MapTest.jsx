
import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapUpdater({ position }) {
    const map = useMap();

    if (position) {
        map.setView(position, 16);
    }

    return null;
}

export default function MapTest() {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState("");

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (result) => {
                setPosition([
                    result.coords.latitude,
                    result.coords.longitude
                ]);
                setError("");
            },
            (err) => setError(err.message)
        );
    };

    return (
        <div>
            <h2>Map & GPS Test</h2>

            <button onClick={getLocation}>
                Get My Location
            </button>

            {position && (
                <p>
                    Latitude: {position[0]} <br />
                    Longitude: {position[1]}
                </p>
            )}

            {error && <p>{error}</p>}

            <MapContainer
                center={position || [35.6812, 139.7671]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {position && <Marker position={position} />}

                <MapUpdater position={position} />
            </MapContainer>
        </div>
    );
}
