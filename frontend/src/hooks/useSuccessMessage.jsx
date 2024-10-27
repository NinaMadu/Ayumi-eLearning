import { useState } from 'react';
import SuccessBox from '../components/SuccessBox'; // Adjust the path based on your structure

const useSuccessMessage = () => {
  const [showSuccess, setShowSuccess] = useState(false); // Control visibility of the success box
  const [successMessage, setSuccessMessage] = useState(''); // Dynamic message content
  const [successTitle, setSuccessTitle] = useState(''); // Dynamic title content

  // Function to trigger the success box
  const triggerSuccess = (title, message) => {
    setSuccessTitle(title);
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  // Function to close the success box
  const closeSuccess = () => {
    setShowSuccess(false);
  };

  return {
    triggerSuccess, // Method to trigger the success box
    successBox: showSuccess && (
      <SuccessBox
        title={successTitle}
        message={successMessage}
        onClose={closeSuccess}
      />
    ),
  };
};

export default useSuccessMessage;
