import React, { useEffect, useState } from "react";
import "./launching.css";
import Trans from "./Trans";

function Launching() {
  const [list, setList] = React.useState([])
  const [owedTo, setOwedTo] = React.useState([])
  const [render, Setrender] = React.useState(1)
  const [owedFrom, setOwedFrom] = React.useState([])
  const [balance, setBalance] = React.useState()
  const fuck = async () => {
    console.log("Hello")
    var res = await fetch("http://localhost:5000/data/get", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json",
          },
        });
        var jack = await res.json();
        console.log("list" , jack)
        setList(jack)
    console.log("Hello Bro")
    var res = await fetch("http://localhost:5000/userauth/getBorrowed", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json"  ,
          },
        });
    var jack = await res.json();
    console.log("Owed" , jack.owedTo, jack.owedFrom)
    setOwedTo(jack.owedTo, 'owedTo')
    setOwedFrom(jack.owedFrom, 'owedFrom')

    var res = await fetch("http://localhost:5000/data/get_balance", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json"  ,
          },
        });
    var jack = await res.json();
    console.log("Balance" , jack)
    setBalance(jack)  
    
  }
  React.useEffect(()=> {
    fuck();
    
  }, [0])
  var history = list.map(item => <Trans data = {item} />)

  const OwedTo = owedTo.map(item => <div className="money"><div className="money-field">{item.from}</div><div className="money-field">{item.amount}</div></div>)
  const OwedFrom = owedFrom.map(item =><div className="money"><div className="money-field">{item.to}</div><div className="money-field">{item.amount}</div></div>)
  console.log('list', list)
  const sort = (e) => {
    const {value} = e.target
    value == 'Date' ? setList(list.sort((a, b) => {
      return a.date > b.date ? 1 * render : a.date < b.date ? -1 * render : 0})) : setList(list.sort((a, b) => {
      return a.description > b.description ? 1 * render : a.description < b.description ? -1 * render : 0}))
    console.log(list)
  console.log(history, render)
  Setrender(r => r == 1 ? -1 : 1)
  }
  return (
    <div className="history">
      <div  className="trans">
              <div className="money"><div className="trans-head money-field">Balance</div><div className="trans-head money-field">{balance}</div></div>
              </div>
              
      <h1>History<hr className="separator"/></h1>
        <div className="trans">
        <form className="trans-form">
                <div className="trans-head trans-input"> To </div>
                <div className="trans-head trans-input"> From </div>
                <div className="trans-head trans-input"> Add Friend(s) </div>
                <div className="trans-head trans-input"> Remove Friend(s) </div>
                <div className="trans-head trans-input" > Amount </div>
                <div className="trans-head trans-input" onClick={sort}> Description</div>
                <div className="trans-head trans-input" onClick={sort}> Date </div>
                <div className="trans-head" >Upd</div>
                <div className="trans-head" > Del</div>
            </form>
      {history}
        </div>        
      <h1>Money owed To<hr className="separator"/></h1>
              <div className="trans">
              <div className="money"><div className="money-head">Owed To</div><div className="money-head">Amount</div></div>
      {OwedTo}
              </div>
      <h1>Money owed From<hr className="separator"/></h1>
              <div className="trans">
              <div className="money"><div className="money-head">Owed From</div><div className="money-head">Amount</div></div>
      {OwedFrom}
              </div>
      
    </div>
  );
}

export default Launching;
