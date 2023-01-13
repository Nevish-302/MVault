import React, { useState } from "react";
import rocket from "../../assets/Rocket-type.png";
import buttonPlus from "../../assets/button-plus.png";
import buttonMinus from "../../assets/button-minus.png";
import rocketTypeData from "./RocketData";
import moon from "../images/moon-build.png";

import "./Rocket.css";
import Payload from "./Payload";

export default function Rocket() {
  const Style = {
    backgroundImage: `url(${rocket})`,
  };
  function handleButton(event, number) {
    console.log("Hello");
    var changeButton = document.getElementById(`button-${number}`).src;
    const displayMessage = document.getElementById(`message-${number}`).style
      .display;
    displayMessage == "none" ? (display = "block") : (display = "none");
    displayMessage == "none" ? (changeButton = buttonMinus) : buttonPlus;
  }

  const [m1, setM1] = useState(false);
  const [m2, setM2] = useState(false);
  const [m3, setM3] = useState(false);
  const [m4, setM4] = useState(false);
  const [m5, setM5] = useState(false);

  function openModal() {
    setM1(!m1);
  }
  function openm2() {
    setM2(!m2);
  }
  function openm3() {
    setM3(!m3);
  }
  function openm4() {
    setM4(!m4);
  }
  function openm5() {
    setM5(!m5);
  }

  return (
    <div className="rocket-section">
      <img className="moon-img" src={moon} />
      <div className="rocket-type">
        <div className="rocket-title">Rocket Type:</div>
        <img src={rocket} className="rocket-image" />

        {m1 ? (
          <div className="message" id="message-1">
            <b>{rocketTypeData.message1.title}</b> {rocketTypeData.message1.ex}
          </div>
        ) : null}

        {m2 ? (
          <div className="message" id="message-2">
            <b>{rocketTypeData.message2.title}</b> {rocketTypeData.message2.ex}
          </div>
        ) : null}

        {m3 ? (
          <div className="message" id="message-3">
            <b>{rocketTypeData.message3.title}</b> {rocketTypeData.message3.ex}
          </div>
        ) : null}

        {m4 ? (
          <div className="message" id="message-4">
            <b>{rocketTypeData.message4.title}</b> {rocketTypeData.message4.ex}
          </div>
        ) : null}

        {m5 ? (
          <div className="message" id="message-5">
            <b>{rocketTypeData.message5.title}</b> {rocketTypeData.message5.ex}
          </div>
        ) : null}

        <div className="rocket-button-group" style={Style}>
          <img
            src={buttonPlus}
            onClick={openModal}
            className="rocket-button"
            id="button-1"
          />
          <img
            src={buttonPlus}
            onClick={openm2}
            className="rocket-button"
            id="button-2"
          />
          <img
            src={buttonPlus}
            onClick={openm3}
            className="rocket-button"
            id="button-3"
          />
          <img
            src={buttonPlus}
            onClick={openm4}
            className="rocket-button"
            id="button-4"
          />
          <img
            src={buttonPlus}
            onClick={openm5}
            className="rocket-button"
            id="button-5"
          />
        </div>
      </div>

      <Payload />
    </div>
  );
}
