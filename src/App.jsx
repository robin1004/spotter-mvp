import React, { useState, useEffect } from "react";
import Map from "./map.jsx";
import Form from "./form.jsx";
import Search from "./search.jsx";
import Gyms from "./gyms.jsx";
import Banner from './banner.jsx'
import axios from "axios";
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

const App = () => {
  const [formStatus, setFormStatus] = useState(false);

  const [cordStatus, setCordStatus] = useState(false);

  const [coordinates, setCoordinates] = useState([]);

  const [preferences, setPreferences] = useState({
    type: "",
  });

  const [gymInfo, setGymInfo] = useState([]);

  const [near, setNear] = useState("");

  const [favorites, setFavorites] = useState([]);

  const [favImages, setFavImages] = useState([]);

  const [favDisplay, setFavDisplay] = useState(false);

  const [addedToFav, setAddedToFav] = useState(false);

  const [hover, setHover] = useState(false);

  const [hoverInfo, setHoverInfo] = useState([]);

  useEffect(() => {
    async function searchGyms() {
      if (preferences.type && coordinates) {
        await axios
          .get("http://localhost:1100/gyms", {
            params: {
              lat: coordinates[0],
              long: coordinates[1],
              type: preferences.type,
            },
          })

          .then((results) => {
            setGymInfo(results.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    searchGyms();
  }, [coordinates]);

  useEffect(() => {
    async function getFavorites() {
      await axios.get("http://localhost:1100/favorites")
      .then((results) => {
        setFavorites(results.data);
      })
    }
    getFavorites();
  }, [addedToFav])

  return (
    <div>
      <BrowserRouter>
      <Banner
        setCordStatus={setCordStatus}
        setFavorites={setFavorites}
        favDisplay={favDisplay}
        setFavDisplay={setFavDisplay}
        cordStatus={cordStatus}
      />
      <Routes>
        <Route path="/" element={
          <div className="preferences-container">
            <h1>Gym Finder</h1>
            <h2>Gyms near you that fit your needs.</h2>

            <Form
              formStatus={formStatus}
              setFormStatus={setFormStatus}
              setPreferences={setPreferences}
            />
            <Search
              setCoordinates={setCoordinates}
              setCordStatus={setCordStatus}
              setNear={setNear}
              type={preferences.type}
            />
          </div>
        } />
        <Route path="/gyms" element={
          <div className="container">
            <Gyms
              gymInfo={gymInfo}
              near={near}
              favDisplay={favDisplay}
              favorites={favorites}
              setFavorites={setFavorites}
              addedToFav={addedToFav}
              setAddedToFav={setAddedToFav}
              setHover={setHover}
              setHoverInfo={setHoverInfo}
            />
            <Map coordinates={coordinates} gymInfo={gymInfo} hover={hover} hoverInfo={hoverInfo} />
          </div>
        } />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
