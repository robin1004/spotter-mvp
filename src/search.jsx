import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";



  const Search = ({ setCoordinates, setCordStatus, formStatus, setNear, type }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });

    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };

    const handleSelect =
      ({ description }) =>
      () => {
        if (type) {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        setNear(description);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setCoordinates([lat, lng]);
          console.log("📍 Coordinates: ", { lat, lng });
          setCordStatus(true);
        });
      } else {
        alert('Please select category');
      }
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li className="list-item" key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small className="list-subitem">{secondary_text}</small>
          </li>
        );
      });

    return (
      <div ref={ref}>
        <form className="search-box">
          <input
            className="input"
            value={value}
            type="text"
            placeholder="Search by city or neighborhood"
            onChange={handleInput}
            disabled={!ready}
          />{status === "OK" && <ul className="list-box">{renderSuggestions()}</ul>}
        </form>
      </div>
    );
  };

export default Search;
