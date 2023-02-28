import React, { useState } from 'react';

const Form = ({ preferences, setFormStatus, setPreferences, setAddressStatus }) => {
  const [hours, setHours] = useState('');
  const [type, setType] = useState('');
  const [pricing, setPricing] = useState('');

  const selectHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'hours':
        setHours(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'pricing':
        setPricing(value);
        break;
    }
  }

  const submitHandler = (e) => {
    if (type) {
      e.preventDefault();
      setFormStatus(true);
      setAddressStatus(true);
      setPreferences({
        availability: hours,
        type: type,
        pricing: pricing,
      })
    } else {
      alert('Please select category')
    }
  }

  return (
    <div className="specs">
      <fieldset>
      <legend>Which category are you interested in?</legend>
        <input
          type="radio"
          name="type"
          id="type"
          value="Commercial"
          onChange={selectHandler}
        />
        <label>Commercial Gyms</label>
        <input
          type="radio"
          name="type"
          id="type"
          value="Crossfit"
          onChange={selectHandler}
        />
        <label>Crossfit Gyms</label>
        <input
          type="radio"
          name="type"
          id="type"
          value="Group"
          onChange={selectHandler}
        />
        <label>Group Fitness Classes</label>
        <input
          type="radio"
          name="type"
          id="type"
          value="rock%20climbing"
          onChange={selectHandler}
        />
        <label>Rock Climbing</label>
        <input
          type="radio"
          name="type"
          id="type"
          value="Yoga"
          onChange={selectHandler}
        />
        <label>Yoga</label>
        <input
          type="radio"
          name="type"
          id="type"
          value="Pilates"
          onChange={selectHandler}
        />
        <label>Pilates</label>
      </fieldset>
      <button type="submit" onClick={submitHandler}>Go</button>
      {/* <fieldset id="preferences">
        <legend>Availability hours</legend>
        <div>
          <input type="radio" name="hours" id="availability" value="24 hours" onChange={selectHandler}/>
          <label>24 hours</label>
          <input type="radio" name="hours" id="availability" value="none" onChange={selectHandler}/>
          <label>No preference</label>
        </div>
        <legend>Type</legend>
        <div>
          <input type="radio" name="type" id="type" value="Commercial" onChange={selectHandler}/>
          <label>Commercial Gyms</label>
          <input type="radio" name="type" id="type" value="Crossfit" onChange={selectHandler}/>
          <label>Crossfit Gyms</label>
          <input type="radio" name="type" id="type" value="Group" onChange={selectHandler}/>
          <label>Group Fitness Classes</label>
          <input type="radio" name="type" id="type" value="none" onChange={selectHandler}/>
          <label>No preference</label>
        </div>
        <legend>Monthly Pricing</legend>
        <div>
          <input type="radio" name="pricing" id="pricing" value="24 hours" onChange={selectHandler}/>
          <label>24 hours</label>
          <input type="radio" name="pricing" id="pricing" value="none" onChange={selectHandler}/>
          <label>No preference</label>
        </div>
      </fieldset>
        <button type="submit" form="preferences" onClick={submitHandler}>Submit</button> */}
    </div>
  );
}

export default Form;