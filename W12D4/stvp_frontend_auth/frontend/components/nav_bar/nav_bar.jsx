import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeBarContainer from './welcome_bar_container';
export default ({ currentUser, logout }) => {
  let display;
  if(currentUser.id === undefined){
    display =  <div>
      <Link className="btn" to="/signup">Sign Up</Link>
      <Link className="btn" to="/login">Log In</Link>
    </div>
  }else{
    display = <div>
      <WelcomeBarContainer />
      <button onClick={logout}>Logout</button>
    </div>
  };
  return (
    <header className="nav-bar">
      <h1 className="logo">BLUEBIRD</h1>
      <div>
        {display}
      </div>
    </header>
  );
};
