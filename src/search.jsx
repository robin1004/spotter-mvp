import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

  const Search = ({ setCoordinates, setCordStatus, formStatus, setAddressStatus }) => {
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
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        setAddressStatus(false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setCoordinates([lat, lng]);
          console.log("📍 Coordinates: ", { lat, lng });
          setCordStatus(true);
        });
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <div ref={ref}>
        <form>
          <img src="https://d214hhm15p4t1d.cloudfront.net/nzr/00cf54ab5dcdbb74f6e98097c3b6538e341d6d3f/img/search.f9467441.svg"></img>
          <input
            value={value}
            type="text"
            placeholder="Search by city or neighborhood"
            onChange={handleInput}
            disabled={!ready}
          />{status === "OK" && <ul>{renderSuggestions()}</ul>}
        </form>
      </div>
    );
  };

export default Search;
