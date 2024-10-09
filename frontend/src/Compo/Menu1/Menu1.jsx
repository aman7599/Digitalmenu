import { useEffect, useState } from "react";
// import App from "./App";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Navbar1 from "../Nav/Navbar1";

import './Menu1.css'


function Menu1() {
  const [data ,setdata] = useState([]);
  const [add , addMenu] = useState({})
  useEffect(() => {
    menucard();
  }, []);
  function menucard(){
    axios.get("http://192.168.43.158:3000/menucard")
    .then(respones=>{
    let l = respones.data.menucard;
    setdata(l);
    
    })
    
  }
 
    
    
  return (
    <>
    <div className="menu">
    <Navbar1/>
      <h1>MENU CARD</h1>
      <Table className="th" striped bordered hover>
      <thead >
        <tr>
        
          <th>Menu Name</th>
          <th>Menu price</th>
          <th>Group Name </th>
          <th>Qty</th>
          
        </tr>
      </thead>
      <tbody>
      {data.map((item)=>{
        return(
          <tr >
          <td>{item.menu_name}</td>
          <td>{item.menu_price}</td>
          <td>{item.group_name}</td>
          <td>{item.qty_type}</td>
          </tr>
        )
      })}
       
      
       
       
      </tbody>
    </Table>
    </div>
      
        </>
  );
}

export default Menu1;
