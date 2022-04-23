import React from "react";
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div className="jumbotron centered">
      <div className="container">
        <i class="fas fa-key fa-6x"></i>
        <h1 class="display-3">Secrets</h1>
        <p class="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />
        <Link to="/register" className="btn btn-light btn-lg">Register</Link>
        {/* <a class="btn btn-light btn-lg" href="/register" role="button">
          Register
        </a> */}
        <Link to="/login" className="btn btn-dark btn-lg">Login</Link>
        {/* <a class="btn btn-dark btn-lg" href="/login" role="button">
          Login
        </a> */}
      </div>
    </div>
  );
};

export default Home;
