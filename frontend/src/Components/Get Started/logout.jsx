import React from "react";
import { useState } from "react";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import "./signup.css";

const Logout = async () => {
    // const jack = await fetch("http://localhost:5000/userauth/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: 'include',
    // })
    
        const history = useHistory();
        history.push("/signup")
        
    
    return (
        <></>
    )
};

export default Logout;
