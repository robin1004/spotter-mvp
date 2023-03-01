import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const Map = ({ coordinates, gymInfo }) => {
  console.log(gymInfo);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const onLoad = (map) => {
    setMap(map);
  };

  const gymCordinates = gymInfo.map((gym) => {
    return (
      <div>
        <Marker
          position={{
            lat: gym.geometry.location.lat,
            lng: gym.geometry.location.lng,
          }}
        />
        ;
      </div>
    );
  });

  return (
      <GoogleMap
        onLoad={onLoad}
        zoom={10}
        center={{ lat: coordinates[0], lng: coordinates[1] }}
        mapContainerClassName="map-container"
      >
        {map && (
          <Marker position={{ lat: coordinates[0], lng: coordinates[1] }} />
        )}
        {map && gymCordinates}
      </GoogleMap>
  );
};

export default Map;
