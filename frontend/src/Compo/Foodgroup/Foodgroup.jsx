import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

// import App from "./App";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Navbar2 from "../Nav/Navbar2";
// import Navbar1 from "../Nav/Navbar1";

export default function Foodgroup() {
  const [data, setdata] = useState([]);
  const [fd, setFg] = useState("");
  const [ud, setUd] = useState("");
  useEffect(() => {
    menucard();
  }, []);
  
  function menucard() {
    axios.get("http://192.168.43.158:3000/food_group").then((respones) => {
      let l = respones.data.foodgroup;
      setdata(l);
    });
  }
  
  
  function getFid(fid) {
    // Confirm before proceeding with deletion
    const isConfirmed = confirm(`Are you sure you want to delete the food group with id: ${fid}?`);

    // If user confirms, proceed with deletion
    if (isConfirmed) {
        // Use fid directly in the axios delete request
        axios.delete("http://192.168.43.158:3000/delfoodgroup", { data: { "id": fid } })
            .then((response) => {
                console.log(response.data); // Log the response for debugging
                alert(response.data); // Show response message
                menucard(); // Refresh the menu card
            })
            .catch((error) => {
                console.error("There was an error deleting the food group!", error); // Log the error
            });
    } else {
        // If user cancels, you can optionally alert them
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
      axios.post("http://192.168.43.158:3000/addfoodgroup", { group_name: fd })
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
  


function UpdateF(fid) {
  alert(`Update food group with id: ${fid}`);
  const ud = prompt("Please enter your food group update:");
setUd(ud);
  const data = {
    "gid":fid ,
    "group_name": ud
  }
  axios.put("http://192.168.43.158:3000/updatefoodgroup", data )
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
      <Navbar2 />
      <h1>Food Group</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Group Name </th>
            <th>Delete</th>
            <th>Add</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val) => {
            return (
              <tr>
                <td>{val.gid}</td>
                <td>{val.group_name}</td>
                <td>
                  <Button variant="danger" onClick={(e)=>getFid(val.gid)}>Delete</Button>
                </td>
                <td><Button variant="success" onClick={Addf}>Add</Button></td>
                <td> <Button variant="warning"onClick={(e)=>UpdateF(val.gid)}>Update</Button></td>
              </tr>
              
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
