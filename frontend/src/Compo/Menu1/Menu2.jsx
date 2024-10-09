

import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Navbar2 from "../Nav/Navbar2";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Menu2() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({});

  useEffect(() => {
    menucard();
  }, []);

  function menucard() {
    axios.get("http://192.168.43.158:3000/menucardid")
      .then(response => {
        let l = response.data.menucard;
        setData(l);
      });
  }
  
  function getMid(mid) {
    // Confirm before proceeding with deletion
    const isConfirmed = confirm(`Are you sure you want to delete the food group with id: ${mid}?`);

    // If user confirms, proceed with deletion
    if (isConfirmed) {
        axios.delete("http://192.168.43.158:3000/delmenu", { data: { "id": mid } })
            .then(response => {
                alert(response.data); // Show response message
                menucard(); // Refresh the menu card
            })
            .catch(error => {
                console.error("There was an error deleting the food group!", error);
            });
    } else {
        // If user cancels, you can optionally alert them
        alert("Deletion cancelled.");
    }
}
  

  const handleShow = (menu = {}) => {
    setCurrentMenu(menu);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentMenu({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { menu_name, menu_price, gid, qid, mid } = currentMenu;
    
    const data = { menu_name, menu_price, gid, qid };
    
    if (mid) {
      // Update
      axios.put("http://192.168.43.158:3000/updatemenu", { ...data, mid })
        .then(response => {
          alert("Update successful");
          menucard();
          handleClose();
        })
        .catch(error => {
          console.error("There was an error updating the food group!", error);
        });
    } else {
      // Add
      axios.post("http://192.168.43.158:3000/addmenu", data)
        .then(response => {
          alert("Data added successfully");
          menucard();
          handleClose();
        })
        .catch(error => {
          console.error("There was an error adding the food group!", error);
        });
    }
  };

  return (
    <>
      <Navbar2 />
      <h1>MENU CARD</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Menu id</th>
            <th>Menu Name</th>
            <th>Menu Price</th>
            <th>Group Name</th>
            <th>Qty</th>
            <th>Delete</th>
            <th>Add</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.mid}>
              <td>{item.mid}</td>
              <td>{item.menu_name}</td>
              <td>{item.menu_price}</td>
              <td>{item.group_name}</td>
              <td>{item.qty_type}</td>
              <td>
                <Button variant="danger" onClick={() => getMid(item.mid)}>Delete</Button>
              </td>
              <td>
                <Button variant="success" onClick={() => handleShow()}>Add</Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleShow(item)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Update */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentMenu.mid ? 'Update Menu Item' : 'Add Menu Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="menuName">
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter menu name"
                value={currentMenu.menu_name || ''}
                onChange={(e) => setCurrentMenu({ ...currentMenu, menu_name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="menuPrice">
              <Form.Label>Menu Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter menu price"
                value={currentMenu.menu_price || ''}
                onChange={(e) => setCurrentMenu({ ...currentMenu, menu_price: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="gid">
              <Form.Label>Group ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter group ID"
                value={currentMenu.gid || ''}
                onChange={(e) => setCurrentMenu({ ...currentMenu, gid: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="qid">
              <Form.Label>Quantity ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity ID"
                value={currentMenu.qid || ''}
                onChange={(e) => setCurrentMenu({ ...currentMenu, qid: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {currentMenu.mid ? 'Update' : 'Add'} Menu Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Menu2;
