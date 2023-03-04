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
      zoom={11}
      center={{ lat: coordinates[0] || hoverInfo[0], lng: coordinates[1] || hoverInfo[1] }}
      mapContainerClassName="map-container"
    >
      {map && hover ? (
        <Marker
          position={{ lat: Number(hoverInfo[0]), lng: Number(hoverInfo[1]) }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new window.google.maps.Size(41, 37),
          }}
        />
      ) : null}
      {map && gymCordinates}
      <Marker
        position={{ lat: coordinates[0], lng: coordinates[1] }}
        icon={{
          url: "https://maps.google.com/mapfiles/ms/icons/blue-pushpin.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
    </GoogleMap>
  );
};

export default Map;
