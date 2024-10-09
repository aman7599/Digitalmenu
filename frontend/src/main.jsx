import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Navbar1 from './Compo/Nav/Navbar1';
import Cards from './Compo/Card/Cards';
import Menu1 from './Compo/Menu1/Menu1';
import Home from './Compo/Home/Home';
import About from './Compo/About/About';
import Admin from './Compo/Admin/Admin1';
import Navbar2 from './Compo/Nav/Navbar2';
import Foodgroup from './Compo/Foodgroup/Foodgroup';
import Qty from './Compo/Qty/Qty';
import Menu2 from './Compo/Menu1/Menu2';
import Admin2 from './Compo/Admin/Admin2';
import About2 from './Compo/About/About2';
// import Card from './Compo/Card/Card';



const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Home' element={<App/>} />
        <Route path='/About' element={<About2/>}/>
        <Route path='/menu' element={<Menu1 />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Navbar2' element={<Navbar2 />} />
        <Route path='/Foodgroup' element={<Foodgroup/>} />
        <Route path='/qty' element={<Qty />} />
        <Route path='/menu2' element={<Menu2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
