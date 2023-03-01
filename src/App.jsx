import React, { useState, useEffect } from "react";
import Map from "./map.jsx";
import Form from "./form.jsx";
import Search from "./search.jsx";
import Gyms from "./gyms.jsx";
import Banner from './banner.jsx'
import axios from "axios";

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
  }, [])

  return (
    <div>
      <Banner setFavorites={setFavorites} favDisplay={favDisplay} setFavDisplay={setFavDisplay} />
      {!cordStatus && <div className="preferences-container">
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
      </div>}
      {cordStatus && <div className="container">
        <Gyms gymInfo={gymInfo} near={near} favDisplay={favDisplay} favorites={favorites} setFavorites={setFavorites} />
        {cordStatus && <Map coordinates={coordinates} gymInfo={gymInfo} />}
      </div>}
    </div>
  );
};

export default App;
