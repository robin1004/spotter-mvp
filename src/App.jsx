import React, { useState } from 'react';
import Map from './map.jsx';
import Form from './form.jsx';
import Address from './address.jsx';

const App = () => {

  const [formStatus, setFormStatus] = useState(false);

  const [inputAddress, setInputAddress] = useState("");

  const [preferences, setPreferences] = useState({
    availability: "",
    type: "",
    pricing: "",
  })

  const addressHandler = (e) => {
    let address = e.target.value;
    setInputAddress(address);
  }

  console.log(preferences);

  return (
    <div>
      <h1>Find your forever Gym.</h1>
      <h2>Gyms near you that fit your needs</h2>
      {!formStatus && <Address addressHandler={addressHandler} />}
      {formStatus && <Map />}
      {!formStatus && <Form formStatus={formStatus} setFormStatus={setFormStatus} setPreferences={setPreferences}/>}
    </div>
  )
}

export default App;