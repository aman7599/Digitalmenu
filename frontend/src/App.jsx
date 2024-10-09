
// import Navbar1 from "./Compo/Nav/Navbar1";


// import './index.css'
import Cards from "./Compo/Card/Cards";
import Footer1 from "./Footer/Footer1";
import Slider1 from "./Compo/Slider/Slider1";
// import Chef1 from "./Compo/Chef/Chef1";
import About from "./Compo/About/About";

// export default  function App(){
//   return(
//     <>
//     <Navbar1/>
//     <Cards/>
//   <Slider1 />
//   <About />
//   <Footer1 />
  
//       </> 
//   )
// }


// import React from 'react';
// import Navbar1 from './components/Navbar1';
// import Cards from './components/Cards';
// import Slider1 from './components/Slider1';
// import About from './components/About';
// import Footer1 from './components/Footer1';
import './App.css';
import Navbar1 from "./Compo/Nav/Navbar1";
import About2 from "./Compo/About/About2";

function App() {
  return (
    <div className="app-container">
      <Navbar1 />
      <Slider1 />
      <Cards />
      <About />
      {/* <About2 /> */}
      <Footer1 />
    </div>
  );
}

export default App;
