import React from 'react';

const SuccessBox = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-200 py-6 px-20 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold">{title}</h3> {/* Dynamic title */}
        <p className="mt-4">{message}</p> {/* Dynamic message */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessBox;
