import React, { useState, useEffect } from "react";
import axios from "axios";

const Gyms = ({ gymInfo, near, favorites, setFavorites, favDisplay, favImages }) => {
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
      const favoriteHandler = () => {
        axios({
          method: 'post',
          url: 'http://localhost:1100/favorites',
          data: {
            ref_id: detail.reference,
            detail: detail,
            image: image,
          }
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log('error message: ', err);
        })
      }
      return (
        <div className="thumbnail" key={index}>
          <img className="thumbnailImage" src={image}></img>
          <div className="thumbnailInfo">
            <div>{detail.name}</div>
            <div className="details">
              <a href={detail.website}>Details</a>
              <div>Gym in {detail.address_components[3].long_name}</div>
              <button className="fav-button" value={{name: detail.name, website: detail.website}} onClick={favoriteHandler}><i class="fa fa-heart-o"></i></button>
            </div>
          </div>
        </div>
      );
    });
  };

  const eachFav = (details) => {
    return details.map((detail, index) => {
      return (
        <div className="thumbnail" key={index}>
          <img className="thumbnailImage" src={detail.image}></img>
          <div className="thumbnailInfo">
            <div>{detail.detail.name}</div>
            <div className="details">
              <a href={detail.detail.website}>Details</a>
              <div>Gym in {detail.detail.address_components[3].long_name}</div>
              <button className="fav-button" value={{name: detail.detail.name, website: detail.detail.website}}><i class="fa fa-window-close-o"></i></button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="thumbnail-container">
      {!favDisplay && eachGym(details, images)}
      {favDisplay && eachFav(favorites)}
      {/* {favDisplay && eachGym(favorites, images)} */}
      {near && (
        <div className="thumbnail-label">{`List of gyms near ${near}`}</div>
      )}
    </div>
  );
};

export default Gyms;
