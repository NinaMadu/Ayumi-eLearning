import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaCalendarAlt, FaFileAlt, FaTimes } from "react-icons/fa";
import UserLayout from "../../components/UserLayout";

const AssignmentDetails = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null); // Add this state to store the uploaded file
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/assignments/${assignmentId}`
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setAssignment(data.assignment);
        setLoading(false);
      } catch (error) {
        setError("Error fetching assignment details");
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = () => {
    if (file) {
      // Handle the file submission logic here
      console.log("File submitted:", file);
      setIsSubmitted(true); // Mark the submission as successful
      setModalOpen(false); // Close the modal after submission
    } else {
      alert("Please choose a file to submit.");
    }
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {assignment.title}
              </h1>
            </div>
          </div>

          <div className="bg-white mb-8 rounded-xl shadow-lg">
            {/* Assignment Details Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaFileAlt className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold">Assignment Details</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-500" />
                  <span className="font-medium">Due Date:</span>
                  <span className="text-gray-600">
                    {new Date(assignment.deadline).toISOString().split("T")[0]}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <FaFileAlt className="text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium mb-2">Description:</p>
                    <p className="text-gray-600">{assignment.description}</p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <a
                    href={assignment.pdfUrl}
                    download
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaFilePdf className="text-xl" />
                    <span>Download Assignment PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaFileAlt className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Submission</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-medium">Upload File:</span>
                <button
                  onClick={() => setModalOpen(true)} // Open the modal when clicked
                  className=" text-gray-600 underline hover:text-blue-600 transition-colors"
                >
                  Choose File
                </button>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-4 mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleSubmit}
                >
                  {isSubmitted ? "Update Submission" : "Submit Assignment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for file upload */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Upload Assignment</h3>
              <button
                onClick={() => setModalOpen(false)} // Close the modal
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mt-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border p-2 rounded-md"
              />
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
                <button
                  onClick={() => setModalOpen(false)} // Close the modal
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Assignment Timeline</h3>
        <div className="flex items-center justify-between text-gray-600">
          <div className="text-center">
            <p className="font-medium">Assigned</p>
            <p>2023-12-01</p>
          </div>
          <div className="h-1 bg-gray-200 flex-1 mx-4" />
          <div className="text-center">
            <p className="font-medium">Due Date</p>
            <p>
              {new Date(assignment.deadline).toISOString().split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default AssignmentDetails;
