import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal

function Login({ show, handleClose }) {
  const [key, setKey] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null); // Create a reference for the input field

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleAuthentication = () => {
    if (login(key)) {
      handleClose(); // Close the modal on successful login
      navigate("/"); // Redirect to home page
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAuthentication(); // Trigger the authentication function on Enter key press
    }
  };

  // Focus on the input when the modal is shown
  useEffect(() => {
    if (show) {
      inputRef.current.focus(); // Focus the input field when modal is shown
    }
  }, [show]);

  // Update handleClose to also navigate to home
  const closeAndNavigate = () => {
    handleClose(); // Call the original handleClose
    navigate("/"); // Redirect to home page
  };

  return (
    <Modal show={show} onHide={closeAndNavigate}>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="password"
          ref={inputRef} // Attach the ref to the input field
          value={key}
          onChange={handleKeyChange}
          onKeyDown={handleKeyDown} // Add onKeyDown event
          placeholder="Enter key"
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeAndNavigate}>
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
