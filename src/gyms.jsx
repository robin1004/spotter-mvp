import React, { useState, useEffect } from "react";
import axios from "axios";

const Gyms = ({ gymInfo }) => {
  const [img, setImg] = useState(false);
  const [details, setDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [placeId, setPlaceId] = useState([]);
  const [imageRef, setImageRef] = useState([]);

  useEffect(() => {
    if (gymInfo && gymInfo.length > 0) {
      setPlaceId(
        gymInfo.map((gym) => {
          return gym.place_id;
        })
      );

      setImageRef(
        gymInfo.map((gym) => {
          if (gym.photos === undefined) {
            return "123";
          } else {
            return gym.photos[0].photo_reference;
          }
        })
      );
    }
  }, [gymInfo]);

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:1100/info", {
          params: {
            info: placeId,
          },
        })
        .then((results) => {
          console.log(results);
          setDetails(results.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function getImages() {
      await axios
        .get("http://localhost:1100/pics", {
          params: {
            photoRef: imageRef,
          },
        })
        .then((results) => {
          console.log("here", results.data);
          setImages(results.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
    getImages();
  }, [placeId, imageRef]);

  const eachGym = (details, images) => {
    return details.map((detail, index) => {
      const image = images[index];
      return (
        <div className="thumbnail">
          <img className="thumbnailImage" src={image}></img>
          <div className="thumbnailInfo">
          <div>{detail.name}</div>
          <a href={detail.website}>
            Website
            </a>
          </div>
        </div>
      );
    });
  };

  return <div className="thumbnail-container">{eachGym(details, images)}</div>;
};

export default Gyms;
