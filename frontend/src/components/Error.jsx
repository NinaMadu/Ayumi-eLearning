import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorDialog = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-red-700">Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        An error occurred while performing the action. Please try again.
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          className="bg-red-700 text-white hover:bg-red-700 active:bg-red-700 focus:outline-none"
          style={{ boxShadow: 'none' }} 
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Error() {
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleAction = () => {
    setShowErrorDialog(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button
        onClick={handleAction}
        className="bg-blue-500 text-white hover:bg-blue-500 active:bg-blue-500 focus:outline-none"
        style={{ boxShadow: 'none' }}>
        Trigger Error
      </Button>

      <ErrorDialog show={showErrorDialog} handleClose={() => setShowErrorDialog(false)} />
    </div>
  );
}
