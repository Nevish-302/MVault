import React from "react";
import "./About.css";
import { Container } from "react-bootstrap";

function About() {
  const [list, setList] = React.useState([])
  const fuck = async () => {
    console.log("Hello")
    const res = await fetch("http://localhost:5000/data/get", {
          method: "POST",
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jack = await res.json();
        console.log("list" , jack)
        setList(jack)
  }
  React.useEffect(()=> {
    fuck();
  }, [0])
  const history = list.map(item => <tr><td>${item.amount}</td></tr>)
  console.log(list)
  return (
      <div className="history">
      Hello
      <table>
      {history}
      </table>
      </div>
  );
}

export default About;
