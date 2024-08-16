import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuccessDialog = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton  className=''>
        <Modal.Title className=" text-blue-700">Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your action was completed successfully.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} className='bg-blue-700'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Success() {
  const [showDialog, setShowDialog] = useState(false);

  const handleAction = () => {
    
    setShowDialog(true);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Button variant="primary" onClick={handleAction}>
        Perform Action
      </Button>

      <SuccessDialog show={showDialog} handleClose={() => setShowDialog(false)} />
    </div>
  );
}
