import React, { useState } from 'react';

const Form = ({ preferences, setFormStatus, setPreferences }) => {
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
        setPreferences({type: value});
        break;
      case 'pricing':
        setPricing(value);
        break;
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
    </div>
  );
}

export default Form;