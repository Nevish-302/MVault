import { useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
export default function Trans(props)
{
    const [trans, setTrans] = useState({id: props.data._id, to: props.data.to, from: props.data.from, amount:  props.data.amount, description:  props.data.description, date : props.data.date})
    const [userFriends, setUserFriends] = useState([])
    console.log(trans)
    const history = useHistory();
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(e.value);
        const res = await fetch("http://localhost:5000/data/update", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({trans}),
        });
        const data = await res.json();
        if (data.status === "400" || !data) {
          window.alert("Not Updated");
        }
        window.alert("Update Successful");
        history.push("/build");
      };
      const options = userFriends.map(friend => {
        return (<option value = {friend}>{friend}</option>)
      })
      const handleDelete = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/data/delete", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({trans}),
        });
        const data = await res.json();
        if (data.status === "400" || !data) {
          window.alert("Not Deleted");
        }
        window.alert("Deletion Successful");
        history.push("/launch");
      };
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
      setTrans({...trans, date : today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()})
    }, [1])
    function handletrans(event) {
        const {value, name} = event.target
        name == 'to' ? setTrans({...trans, to : value}) : name == "from" ? setTrans({...trans, from : [...trans.from, value]}) : name == "amount"? setTrans({...trans, amount : value}) : setTrans({...trans, description : value});
    }
    const remove_friend = (e) => {
      e.preventDefault();
      const {value} = e.target
      setTransaction({...trans, from : trans.from.filter(friend => friend != value)})
    }
    return (
            <form className="trans-form">
                <input onChange={handletrans} name = "to" placeholder={props.data.to} className="trans-input" type='text'/>
                <input placeholder={props.data.from} className="trans-input" type='text'/>
                <select onChange={handletrans} name = "from" placeholder="From" value={trans.from} className="trans-input" type='text'>
                  <option>{trans.from.map(friend => `${friend}, `)}</option>
                  <option value={'Me'}>Me</option>
                  {options}
                </select>
                <select onChange={remove_friend} name = "from" placeholder="From" value={trans.from} className="trans-input" type='text'>
                <option> Remove </option>
                  {trans.from.map(friend => {
                    return (<option value = {friend}>{friend}</option>)
                  })}
                </select>
                
                <input onChange={handletrans} name = "amount" placeholder={props.data.amount} className="trans-input" type='number'/>
                <input onChange={handletrans} name = "description" placeholder={props.data.description} className="trans-input" type='text'/>
                <input name = "date" placeholder={props.data.date.split('T')[0]} className="trans-input" type='text'/>
                <button onClick={handleUpdate} className="trans-add" >^</button>
                <button onClick={handleDelete} className="trans-add" >-</button>
            </form>
    )
}