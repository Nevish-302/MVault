import React from "react";
import { useState } from "react";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //context username
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.value);
    const res = await fetch("http://localhost:5000/userauth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === "422" || !data) {
      window.alert("invalid registration");
    }
    window.alert("succesfully register");
    history.push("/Build");
  };

  function handleChange(event) {
    const { type, value } = event.target;
    type == "text"
      ? setUsername(value)
      : type == "email"
      ? setEmail(value)
      : setPassword(value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} action="" className="signup">
        <label htmlFor="text">Username</label>
        <input
          onChange={handleChange}
          value={username}
          placeholder="Username"
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          value={email}
          placeholder="Email"
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          value={password}
          placeholder="Password"
          type="password"
          id="password"
          name="password"
        />
        <button type="submit" className="sign" onClick={handleSubmit}>
          Sign Up
        </button>
        <br />
        <Button className="loginBtn">Already an User? Login here</Button>
      </form>
    </div>
  );
};

export default SignUp;
