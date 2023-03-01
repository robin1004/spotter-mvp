import React from 'react';
import axios from 'axios';
import icon from '../gymfindericon.jpeg'

const Banner = ({ favDisplay, setFavDisplay, setFavorites }) => {
  console.log(favDisplay)

  const favHandler = (e) => {
    e.preventDefault;
    setFavDisplay(!favDisplay);
  }

  return (
    <header className="banner-container">
      <img className="icon" src={icon}></img>
      {!favDisplay && <button onClick={favHandler}>See Favorites</button>}
      {favDisplay && <button onClick={favHandler}>Go back</button>}
    </header>
  )
}

export default Banner;