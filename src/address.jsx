import React from 'react';

const Address = ({ addressHandler }) => {

  return (
    <div>
      <form>
        <img src="https://d214hhm15p4t1d.cloudfront.net/nzr/00cf54ab5dcdbb74f6e98097c3b6538e341d6d3f/img/search.f9467441.svg"></img>
        <input type="text" placeholder="Search by city or neighborhood" onChange={addressHandler}></input>
      </form>
    </div>
  )
}

export default Address;