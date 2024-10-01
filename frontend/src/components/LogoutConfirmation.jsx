import React from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className=" bg-slate-200 py-6 px-20 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold">Confirm Logout</h3>
      <p className="mt-4">Are you sure you want to log out?</p>
      <div className="mt-6 flex justify-center space-x-12">
        <button
          className="bg-red-700 text-white py-2 px-4  rounded hover:bg-red-800"
          onClick={onConfirm}
        >
          Yes, Log out
        </button>
        <button
          className="bg-gray-400 text-gray-900 py-2 px-4 rounded hover:bg-gray-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
};

export default LogoutConfirmation;
