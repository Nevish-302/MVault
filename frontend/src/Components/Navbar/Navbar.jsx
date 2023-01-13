import React from "react";
import { NavLink, Route, Link} from "react-router-dom";

import logo from "../../assets/logo.png";
import './NavBar.css';
import Button from "../Button/Button";

function NavBar() {
  return (
    <nav>
      <div className='logo'>
        <img src={logo} />
        <span>MVault</span>
      </div>
      {document.cookie && <ul>
        <NavLink activeClassName='active' to='/home'>Home</NavLink>
        <NavLink activeClassName='active'  to='/build'>Send Money</NavLink>
        <NavLink activeClassName='active'  to='/launch-date'>Add Friends</NavLink>
        <NavLink activeClassName='active'  to='/launch'>History</NavLink>
      </ul>
      }
      {!document.cookie && <ul>
        <NavLink activeClassName='active' to='/home'>Home</NavLink>
        </ul>
      }
      <div className='cta'>
        {!document.cookie && <ul>
        <Link to="/login">
        <Button className= "inverted">Log In</Button>
        </Link>
        <Link to="/signup">
        <Button>Sign Up</Button>
        </Link>
        </ul>}
        {document.cookie && <ul>
        <Link to="/logout">
        <Button className= "inverted">Log Out</Button>
        </Link>
        </ul>}

      </div>
    </nav>
  );
}

export default NavBar;
