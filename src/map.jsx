import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Gyms from './gyms.jsx';

const libraries = ["places"];

const Map = ({ coordinates, gymInfo, hover, hoverInfo }) => {
  console.log(hover);
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
    let lat = gym.geometry.location.lat;
    let lng = gym.geometry.location.lng;

    return (
      <div>
        <Marker
          position={{
            lat,
            lng,
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
      {map & hover ? (
        <Marker
          position={{ lat: Number(hoverInfo[0]), lng: Number(hoverInfo[1]) }}
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        />
      ) : null}
      {map && gymCordinates}
    </GoogleMap>
  );
};

export default Map;
