import React from 'react';

import { Link } from 'react-router-dom';

import "./Home.css";

function Home() {

  return (

    <div>

      <h1>Home Page</h1>

      <p>Welcome to Fluolingo!</p>

      <Link to="/users/login">Login</Link>

    </div>

  );

}

export default Home;
