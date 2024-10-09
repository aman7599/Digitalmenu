import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

// import App from "./App";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Navbar2 from "../Nav/Navbar2";
// import Navbar1 from "../Nav/Navbar1";

export default function Qty() {
 const [data , setdata] = useState([])
 const [fd, setFg] = useState("");
 const [ud, setUd] = useState("");
  useEffect(() => {
    menucard();
  }, []);
  function menucard() {
    axios.get("http://192.168.43.158:3000/qtymast").then((respones) => {
      let l = respones.data.foodgroup;
      setdata(l);
    });
  }
  
  function getFid(qid) {
    // Confirm before deleting
    const isConfirmed = confirm(`Deleting food group with id: ${qid}. Do you want to proceed?`);

    if (isConfirmed) {
        // Use fid directly in the axios delete request
        axios.delete("http://192.168.43.158:3000/delqtymast", { data: { "qid": qid } })
            .then((response) => {
                console.log(response.data);
                alert(response.data);
                menucard(); // Update the menu card after deletion

                // Optional: You can add success alert here
                if (response.data.status === 200) {
                    alert("Food group deleted successfully!");
                }
            })
            .catch((error) => {
                console.error("There was an error deleting the food group!", error.response.data);
                alert("Error deleting food group. Please try again.");
            });
    } else {
        // If user clicks "Cancel", do nothing or show a message
        alert("Deletion cancelled.");
    }
}

  
    
  const Addf = () => {
    const fd = prompt("Please enter your food group name:");
    if (fd !== null) {
      setFg(fd);
      console.log(`User entered: ${fd}`);
      // Add your logic to add food group here
      // For example:
      axios.post("http://192.168.43.158:3000/addqtymast", { qty_type: fd })
        .then((response) => {
            if(response.data.status ==200){
                console.log("Food group added:", response.data);
            }
        //   console.log("Food group added:", response.data);
        //   // Update the data
          menucard();
                alert("data add sucsefull")
        
        })
        .catch((error) => {
          console.error("There was an error adding the food group!", error);
        });
    }
}
  


function UpdateF(qid) {
  alert(`Update food group with id: ${qid}`);
  const ud = prompt("Please enter your food group update:");
setUd(ud);
  const data = {
    "qty_type":ud ,
    "qid": qid
  }
  console.log(data)
  axios.put("http://192.168.43.158:3000/updateqtymast", data )
  .then((response) => {
    if (response.status == 200) {
      console.log("Food group updated:", response.data);
      alert("Update successful");
      menucard(); // Update the data
    }
  
  })
  .catch((error) => {
    console.error("There was an error updating the food group!", fid , ud);
  });
}  

  return (
    <>
    <Navbar2/>
      <h1>Food Group</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quntaty ID</th>
            <th>Quantity Type</th>
            <th>Delete</th>
            <th>Add</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val) => {
            return (
              <tr>
                <td>{val.qid}</td>
                <td>{val.qty_type}</td>
                <td>  <Button variant="danger" onClick={(e)=>getFid(val.qid)}>Delete</Button> </td>
                <td><Button variant="success" onClick={Addf}>Add</Button></td>
                <td> <Button variant="warning"onClick={(e)=>UpdateF(val.qid)}>Update</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
