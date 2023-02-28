import React, { useState, useEffect } from "react";
import Map from "./map.jsx";
import Form from "./form.jsx";
import Search from "./search.jsx";
import Gyms from "./gyms.jsx";
import axios from "axios";

const App = () => {
  const [formStatus, setFormStatus] = useState(false);

  const [cordStatus, setCordStatus] = useState(false);

  const [addressStatus, setAddressStatus] = useState(false);

  const [coordinates, setCoordinates] = useState([]);

  const [preferences, setPreferences] = useState({
    availability: "",
    type: "",
    pricing: "",
  });

  const [gymInfo, setGymInfo] = useState([]);

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

  console.log(gymInfo);
  console.log(preferences.type);

  return (
    <div className='container'>
      {!formStatus && <h1>Find your forever Gym.</h1>}
      {!formStatus && <h2>Gyms near you that fit your needs</h2>}
      {addressStatus &&
        <Search setCoordinates={setCoordinates} setCordStatus={setCordStatus} setAddressStatus={setAddressStatus}/>
      }
      {cordStatus && <Map coordinates={coordinates} />}
      <Gyms gymInfo={gymInfo} />
      {!formStatus && (
        <Form
          formStatus={formStatus}
          setFormStatus={setFormStatus}
          setPreferences={setPreferences}
          setAddressStatus={setAddressStatus}
        />
      )}
    </div>
  );
};

export default App;
