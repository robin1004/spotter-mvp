import React from 'react';
import axios from 'axios';
import icon from '../gymfindericon.jpeg';
import fav from '../favorite.jpeg';

const Banner = ({ favDisplay, setFavDisplay, setFavorites, setCordStatus, cordStatus }) => {
  console.log(favDisplay)

  const favHandler = (e) => {
    e.preventDefault;
    setFavDisplay(!favDisplay);
  }

  const homeHandler = () => {
    setCordStatus(false);
    setFavDisplay(false);
  }

  return (
    <header className="banner-container">
      <img className="icon" src={icon} onClick={homeHandler}></img>
      {!favDisplay && cordStatus ? <button className="bookmark-button" onClick={favHandler}><img src={fav} height="20" ></img>
</button> : null}
      {favDisplay && <button className="return-button" onClick={favHandler}>Return</button>}
    </header>
  )
}

export default Banner;