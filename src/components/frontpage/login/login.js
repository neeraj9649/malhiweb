import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

function Login({ show, handleClose }) {
  const [key, setKey] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleAuthentication = () => {
    if (login(key)) {
      handleClose(); // Close the modal on successful login
      navigate('/'); // Redirect to home page
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAuthentication(); // Trigger the authentication function on Enter key press
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="password"
          value={key}
          onChange={handleKeyChange}
          onKeyDown={handleKeyDown} // Add onKeyDown event
          placeholder="Enter key"
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAuthentication}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
