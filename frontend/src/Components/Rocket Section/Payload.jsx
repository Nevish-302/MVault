import React, { useState } from "react";
import Button from "../Button/Button";
import "./Payload.css";

import { Link } from "react-router-dom";

function Payload() {
  const [inputValue, setInputValue] = useState("");
  const [buttonColor, setButtonColor] = useState({
    background: "#bebebe",
    border: "none",
  });

// use context get weight, faring size from here

const [weight, setweight] = useState(0)
const [fairingSize, setFaringSize] = useState('4 meter')

  const handleInputChange = (event) => {
    event.target.name == "weight" ? setweight(event.target.value) : setFaringSize(event.target.value)
    setInputValue(event.target.value);
    
    if (event.target.name == "weight" && event.target.value) {
      setButtonColor({ background: "#ff005c" });
    } else {
      setButtonColor({
        background: "#bebebe",
        border: "none",
      });
    }
  };

  return (
    <div className="payload-section">
      <h3>PAYLOAD WEIGHT</h3>
      <div className="payload-weight-input" style={{ marginTop: "1rem" }}>
        <div className="payload">
          <input
            onChange={handleInputChange}
            type="number"
            name="weight"
            min="1"
            max="18,831"
          />
          <h5>Kg</h5>
        </div>
        <div className="payload-small-content">
          <p>
            Max Payload weight with <br /> current fairing: 18,831 kg
          </p>
          <div className="plus-button">
            <svg
              width="13"
              height="13"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM12 15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16C10.7348 16 10.4804 15.8946 10.2929 15.7071C10.1054 15.5196 10 15.2652 10 15V12H7C6.73478 12 6.48043 11.8946 6.29289 11.7071C6.10536 11.5196 6 11.2652 6 11C6 10.7348 6.10536 10.4804 6.29289 10.2929C6.48043 10.1054 6.73478 10 7 10H10V7C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7V10H15C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.2652 15.8946 11.5196 15.7071 11.7071C15.5196 11.8946 15.2652 12 15 12H12V15Z"
                fill="#699BF7"
              />
            </svg>
            <p style={{ marginTop: "0", marginLeft: "0.4rem" }}>
              Required for Orbit
            </p>
          </div>
        </div>
        <div className="payload-size">
          <h4>Payload Fairing Size</h4>
          <div className="" style={{ marginLeft: "5px" }}>
            <input
              type="radio"
              id="four-meter"
              name="size"
              value="4 meter"
              checked
            />
            <label for="four-meter">4 meter</label>

            <input type="radio" id="five-meter" name="size" value="5 meter" />
            <label for="five-meter">5 meter</label>
          </div>
        </div>
        <div className="submit-btn">
          <Link to="/orbit" style={{ margin: "0" }}>
            <Button disabled={!inputValue} style={buttonColor}>
              Next &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Payload;
