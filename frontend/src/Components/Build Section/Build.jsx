import React, { useState } from "react";
import './Build.css'
import NavBar from "../Navbar/Navbar";

export default function Build()
{
    <NavBar />

    const [tran, setTransaction] = useState({to:'', from:['Me', ], amount: '', description: '', date : ''})
    const [userFriends, setUserFriends] = useState([])
    console.log(tran)
    const getFriend = async () => {
      const res = await fetch("http://localhost:5000/userauth/getFriends", {
          method: "GET",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await res.json()
        console.log('data' , data)
        if (data.status == "400" || !data) {
          console.log("No Friends");
        }
        
        setUserFriends(data.map(friend =>friend.Username))
      
        
    }
    React.useEffect(()=> {
      console.log('you know this')
      getFriend().then(()=>console.log( 'Okay so', userFriends))
      var today = new Date()
      setTransaction({...tran, date : today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()})
    
      
    }, [1])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/data/add", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({tran}),
        });
        const data = await res.json();
        if (data.status == "400" || !data) {
          window.alert("Not Added");
        }
        window.alert("Addition Successful");
      };
    
    function handleTransaction(event) {
        const {value, name} = event.target
        name == 'to' ? setTransaction({...tran, to : value}) : name == "from" ? setTransaction({...tran, from : [...tran.from, value]}) : name == "amount"? setTransaction({...tran, amount : value}) : setTransaction({...tran, description : value});
    }
    const remove_friend = (e) => {
      e.preventDefault();
      const {value} = e.target
      setTransaction({...tran, from : tran.from.filter(friend => friend != value)})
    }
    const options = userFriends.map(friend => {
      return (<option value = {friend}>{friend}</option>)
    })
    return (
        <div className="transaction">
            <div className="transaction-title"> Add Transaction </div>
            <form className="transaction-form">
                <input required onChange={handleTransaction} name = "to" placeholder="To" className="transaction-input" type='text'/>
                <select onChange={handleTransaction} name = "from" placeholder="From" value={tran.from} className="transaction-input" type='text'>
                  <option>{tran.from.map(friend => `${friend}, `)}</option>
                  <option value={'Me'}>Me</option>
                  {options}
                </select>
                <select onChange={remove_friend} name = "from" placeholder="From" value={tran.from} className="transaction-input" type='text'>
                <option> Remove </option>
                  {tran.from.map(friend => {
                    return (<option value = {friend}>{friend}</option>)
                  })}
                </select>
                <input required onChange={handleTransaction} name = "amount" placeholder="Amount" className="transaction-input" type='number'/>
                <input required onChange={handleTransaction} name = "description" placeholder="Description" className="transaction-input" type='text'/>
                <button onClick = {handleSubmit} className="transaction-add" >Add</button>
            </form>
        </div>        
    )
}