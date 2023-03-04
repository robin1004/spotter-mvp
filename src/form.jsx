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
      <fieldset className="specs-field">
      <legend className="specs-title">Which category are you interested in?</legend>
      <div className="specs-input">
        <input
          type="radio"
          name="type"
          id="commercial"
          value="Commercial"
          onChange={selectHandler}
        />
        <label for="commercial">Commercial Gyms</label>
        <input
          type="radio"
          name="type"
          id="crossfit"
          value="Crossfit"
          onChange={selectHandler}
        />
        <label for="crossfit">Crossfit Gyms</label>
        <input
          type="radio"
          name="type"
          id="group"
          value="Group"
          onChange={selectHandler}
        />
        <label for="group">Group Fitness Classes</label>
        <input
          type="radio"
          name="type"
          id="rock"
          value="rock%20climbing"
          onChange={selectHandler}
        />
        <label for="rock">Rock Climbing</label>
        <input
          type="radio"
          name="type"
          id="yoga"
          value="Yoga"
          onChange={selectHandler}
        />
        <label for="yoga">Yoga</label>
        <input
          type="radio"
          name="type"
          id="pilates"
          value="Pilates"
          onChange={selectHandler}
        />
        <label for="pilates">Pilates</label>
        </div>
      </fieldset>
    </div>
  );
}

export default Form;