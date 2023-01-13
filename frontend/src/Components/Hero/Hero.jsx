import React from "react";
import ring1 from "../../assets/rings-1.png";
import ring2 from "../../assets/rings-2.png";
import moon from "../../assets/moon 1.png";
import distance from "../../assets/distance.png";
import rocket from "../../assets/Rocket.png";

import "./Hero.css";
import Button from "../Button/Button";
import Box from "../Box/Box";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <React.Fragment>
      <div className="hero">
        <img className="ring1" src={ring2} />
        <img className="ring2" src={ring1} />
        <img className="moon" src={moon} />

        <div className="main-content">
          <div className="distance">
            <img src={distance} />
            <div>
              <p>Here And</p>
              <h4></h4>
              <h3>Now</h3>
            </div>
          </div>
          <h1>MVault</h1>
          <p>
            Keep Track of your transactions
          </p>
          <Link to = '/signup'>
          <Button>Get Started</Button>
          </Link>
          
        </div>
      </div>
    </React.Fragment>
  );
}

export default Hero;
