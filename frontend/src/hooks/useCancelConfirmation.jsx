import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ConfirmationBox from '../components/ConfirmationBox.jsx'; // Adjust path to your ConfirmationBox
import { resetCourseData } from '../redux/courseSlice.js'; // Adjust the path to your Redux slice

const useCancelConfirmation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false); // Control visibility of the confirmation box
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to trigger the confirmation box
  const triggerCancel = () => {
    setShowConfirmation(true);
  };

  // Function to handle confirmed cancellation
  const confirmCancel = () => {
    dispatch(resetCourseData()); // Reset the course data
    navigate('/instructor/create-course'); // Navigate to the specified page
    setShowConfirmation(false); // Hide confirmation box after confirming
  };

  // Function to handle cancellation of the confirmation box
  const handleCancelConfirmation = () => {
    setShowConfirmation(false); // Close confirmation box without action
  };

  // Return the cancel trigger and the confirmation box to use in components
  return {
    triggerCancel,
    confirmationBox: showConfirmation && (
      <ConfirmationBox
        title="Confirm Cancel"
        message="Are you sure you want to cancel and reset your course creating process?"
        onConfirm={confirmCancel}
        onCancel={handleCancelConfirmation}
      />
    ),
  };
};

export default useCancelConfirmation;
