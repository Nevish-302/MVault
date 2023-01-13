import React, { useState } from "react";

const LaunchDate = () => {
  const [username, setUsername] = React.useState()
  console.log(username)
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/userauth/addFriend", {
        method: "POST",
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username
        }),
      });
      const data = res.json();
      if (res.status == "400" || !data) {
        window.alert("Incorrect username");
        history.push("/launch-date");
      }
      else{
      window.alert("Successfully added");
      history.push("/launch-date");
    }};  
    
  return (
    <div className="transaction">
      <form className="transaction-form">
        <div className="transaction-title"> Add Friends </div>
        <input onChange={(e) => {setUsername(e.target.value)}} name = "username" placeholder="Username" className="transaction-input" type='text'/>
        <button onClick = {handleSubmit} className="transaction-add" >Add</button>
      </form>
    </div>
  );
};

export default LaunchDate;
