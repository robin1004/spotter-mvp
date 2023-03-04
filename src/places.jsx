import { useState, useEffect } from 'react';

const MyMap = () => {
  const [gmapsLoaded, setGmapsLoaded] = useState(false);

  useEffect(() => {
    const initMap = () => {
      setGmapsLoaded(true);
    };

    window.initMap = initMap;

    const gmapScriptEl = document.createElement('script');
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=SECRET_EATING&libraries=places&callback=initMap`;

    document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
  }, []);

  return (
    <div>
      {gmapsLoaded && <PlacesAutocomplete />}
    </div>
  );
};

export default MyMap;
