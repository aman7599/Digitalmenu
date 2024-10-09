// Navbar1.js
import React from "react";
import { assets } from "../../assets/assets";

import './Navbar1.css'
import Menu1 from "../Menu1/Menu1";
import Admin2 from "../Admin/Admin2";
import Cards from "../Card/Cards";

function Navbar2() {
  
 
  return (<>
  
    <div className="Navbar">
      <div className="navlogo">
        <img src={assets.logo} alt="" srcset="" />
      </div>
      <nav className="navl">
          <a href="/Foodgroup">FoodGroup</a>
          <a href="/Qty">Qty</a>
          <a href="/menu2">Menu2</a>
      </nav>
      
    </div>
    
    </>
  ); 
}

export default Navbar2;
