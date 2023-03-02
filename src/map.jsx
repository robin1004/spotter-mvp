import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Gyms from './gyms.jsx';

console.log(Gyms);

const libraries = ["places"];

const Map = ({ coordinates, gymInfo, hover, hoverInfo }) => {
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

  console.log(hoverInfo);

  return (
    <GoogleMap
      onLoad={onLoad}
      zoom={10}
      center={{ lat: coordinates[0], lng: coordinates[1] }}
      mapContainerClassName="map-container"
    >
      {/* {map && (
          <Marker position={{ lat: coordinates[0], lng: coordinates[1] }} />
        )} */}
      {map && hover && (
        <Marker
          position={{ lat: Number(hoverInfo[0]), lng: Number(hoverInfo[1]) }}
          icon={{
            url: "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",
          scaledSize: new window.google.maps.Size(64, 64),
          labelOrigin: new window.google.maps.Point(32, 26),
        }}
        />
      )}
      {map && gymCordinates}
    </GoogleMap>
  );
};

export default Map;
