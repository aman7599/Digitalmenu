// Navbar1.js
import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router";
import "./Navbar1.css";
import { Link } from 'react-scroll';
function Navbar1() {
  const navigate = useNavigate();
  
  function Admin() {
    navigate("/Admin");
  }

  useEffect(() => {
    const navbar = document.querySelector(".Navbar");
    navbar.style.opacity = 0;
    setTimeout(() => {
      navbar.style.opacity = 1;
      navbar.style.transition = "opacity 2s";
    }, 500); // delay before starting the fade-in effect
  }, []);

  return (
    <div className="Navbar flex items-center justify-center">
      <div className="navlogo">
        <img src={assets.logo} alt="Luxuray Logo" />
      </div>
      <nav className="navl">
        <a href="/Home"  >Home</a>
        <a href="/About">About</a>
        
        <a href="/menu">Menu</a>
      </nav>
      <button onClick={Admin}>Admin</button>
    </div>
  );
}

export default Navbar1;


// import React from 'react';
// import './Navbar1.css';

// function Navbar1() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <a href="/" className="navbar-logo">RoyalSite</a>
//         <div className="navbar-links">
//           <a href="#home">Home</a>
//           <a href="#about">About</a>
//           <a href="#services">Services</a>
//           <a href="#contact">Contact</a>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar1;
