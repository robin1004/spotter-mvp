import React, { useState, useEffect } from "react";
import axios from "axios";

const Gyms = ({ gymInfo, near, favorites, setFavorites, favDisplay, setAddedToFav, addedToFav, setHover, setHoverInfo }) => {
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

  const handleHover = (e) => {
    setHover(true)
    setHoverInfo([e.target.dataset.value.split(',')]);
    console.log('this is e:', e, 'this is value:', e.target.dataset.value)
  }

  const eachGym = (details, images) => {
    return details.map((detail, index) => {
      const image = images[index];
      if (detail.website === undefined) {
        detail.website = "https://en.wikipedia.org/wiki/HTTP_404";
      }
      const favoriteHandler = () => {
        setAddedToFav(!addedToFav);
        axios({
          method: "post",
          url: "http://localhost:1100/favorites",
          data: {
            ref_id: detail.reference,
            detail: detail,
            image: image,
          },
        })
          .then((res) => {
            setFavorites(res.data);
          })
          .catch((err) => {
            console.log("error message: ", err);
          });
      };
      return (
        <div className="thumbnail" key={index}>
          <img className="thumbnailImage" src={image}></img>
          <div className="thumbnailInfo">
            <div
              className="gym-name"
              data-value={[
                detail.geometry.location.lat,
                detail.geometry.location.lng,
                detail.website
              ]}
              onMouseEnter={(e) => handleHover(e)}
              onMouseLeave={() => setHover(false)}
            >
              {detail.name}
            </div>
            <div className="details">
              <a href={detail.website}>Details</a>
              <div>Gym in {detail.address_components[3].long_name}</div>
              <button
                className="fav-button"
                value={{ name: detail.name, website: detail.website }}
                onClick={favoriteHandler}
              >
                <i class="fa fa-heart-o"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const eachFav = (details) => {
    return details.map((detail, index) => {
      const innerDetail = detail.detail;
      const deleteHandler = () => {
        axios({
          method: "delete",
          url: "http://localhost:1100/favorites",
          data: {
            ref_id: innerDetail.reference
          }
        })
        .then((res) => {
          setFavorites(res.data);
        })
        .catch(err => {
          console.log("error message: ", err);
        })
      }
      return (
        <div className="thumbnail" key={index}>
          <img className="thumbnailImage" src={detail.image}></img>
          <div className="thumbnailInfo">
            <div
              className="gym-name"
              data-value={[
                innerDetail.geometry.location.lat,
                innerDetail.geometry.location.lng,
                innerDetail.website
              ]}
              onMouseEnter={(e) => handleHover(e)}
              onMouseLeave={() => setHover(false)}
            >
              {innerDetail.name}
            </div>
            <div className="details">
              <a href={innerDetail.website}>Details</a>
              <div>Gym in {innerDetail.address_components[3].long_name}</div>
              <button
                className="fav-button"
                value={{ name: innerDetail.name, website: innerDetail.website }}
                onClick={deleteHandler}
              >
                <i class="fa fa-trash"></i>
              </button>
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