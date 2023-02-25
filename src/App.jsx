import React, { useState } from 'react';
import Map from './map.jsx';
import Form from './form.jsx';
import Search from './search.jsx';

const App = () => {

  const [formStatus, setFormStatus] = useState(false);

  const [cordStatus, setCordStatus] = useState(false);

  const [coordinates, setCoordinates] = useState([]);

  const [preferences, setPreferences] = useState({
    availability: "",
    type: "",
    pricing: "",
  })

  console.log(coordinates);

  return (
    <div>
      <h1>Find your forever Gym.</h1>
      <h2>Gyms near you that fit your needs</h2>
      {!cordStatus && <Search setCoordinates={setCoordinates} setCordStatus={setCordStatus}/>}
      {cordStatus && <Map coordinates={coordinates}/>}
      {!formStatus && <Form formStatus={formStatus} setFormStatus={setFormStatus} setPreferences={setPreferences}/>}
    </div>
  )
}

export default App;