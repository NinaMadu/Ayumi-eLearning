import React, { useEffect, useState } from "react";
import { storage } from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from "react-router-dom";
import { FaFilePdf, FaCalendarAlt, FaFileAlt, FaTimes, FaTrash } from "react-icons/fa";
import UserLayout from "../../components/UserLayout";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const SubmissionSection = ({ assignmentId, courseId, currentUser }) => {
  const [submission, setSubmission] = useState(null);
  const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fileUploading, setFileUploading] = useState(0);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/submissions/${currentUser._id}/${courseId}/${assignmentId}`
        );
        if (res.ok) {
          const data = await res.json();
          setSubmission(data.submission);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSubmission();
  }, [assignmentId, currentUser._id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      if (file && !["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        setError("Please upload a PDF, JPEG, or PNG file.");
        return;
      }
      setError(null);
      setFile(file);
    },
    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf']
    },
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
  
      if (!file) {
        setError("Please upload a file.");
        return;
      }
  
      const fileRef = ref(storage, `submissions/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      setFileUploading(0);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploading(progress);
        },
        (err) => {
          setError("Error uploading file: " + err.message);
          setFileUploading(0);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Always use POST since we don't have update functionality
            const response = await fetch(
              `${API_BASE_URL}/api/submissions/add`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  assignmentId,
                  userId: currentUser._id,
                  courseId,
                  fileUrl: downloadURL,
                  status: "submitted",
                  submittedAt: new Date().toISOString(),
                }),
              }
            );
  
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
  
            setSubmission(data.submission);
            setSuccessMessage("Submitted successfully!");
            setFileUploading(0);
            setModalOpen(false);
            setFile(null);
          } catch (err) {
            setError(err.message);
            setFileUploading(0);
          }
        }
      );
    };
    
  const handleRemove = async () => {
    if (!window.confirm("Are you sure you want to remove this submission?")) return;
    
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/submissions/${submission._id}`,
        { method: "DELETE" }
      );
      
      if (!res.ok) throw new Error("Failed to remove submission");
      setSubmission(null);
      setSuccessMessage("Submission removed successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <FaFileAlt className="text-blue-600 text-xl" />
        <h2 className="text-xl font-semibold">Submission</h2>
      </div>

      {submission ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-medium">Submitted File:</span>
            <a
              href={submission.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {submission.fileUrl.split('/').pop()}
            </a>
          </div>
          <div className="flex gap-4 mt-6">
            
            <button
              onClick={handleRemove}
              className="bg-red-600 text-white text-sm px-3 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <FaTrash className="text-sm" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setModalOpen(true)}
          >
            Submit Assignment
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-3/5 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Assignment</h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setFile(null);
                  setError(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-6 rounded-md cursor-pointer ${
                isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-600 text-center">
                Drag & drop a file here, or click to select a file
                <br />(PDF, JPEG, PNG only)
              </p>
            </div>

            {file && (
              <p className="mt-2 text-center text-gray-700">
                Selected File: {file.name}
              </p>
            )}

            {error && <p className="text-center text-red-500 mt-2">{error}</p>}

            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                disabled={!file || fileUploading > 0}
              >
                {fileUploading > 0 
                  ? `Uploading (${Math.round(fileUploading)}%)` 
                  : "Upload"}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}
    </div>
  );
};

const AssignmentDetails = () => {
  const { assignmentId, courseId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/assignments/${assignmentId}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setAssignment(data.assignment);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [assignmentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!assignment) return <div>Assignment not found</div>;

  return (
    <UserLayout>
      < div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{assignment.title}</h1>
            <button
              onClick={() => navigate(`/user/course-content/${courseId}`)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Back to Course
            </button>
          </div>

           {/* Assignment Details Card */}
           <div className="bg-white mb-8 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <FaFileAlt className="text-blue-600 text-xl" />
              <h2 className="text-xl font-semibold">Assignment Details</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-gray-500" />
                <span className="font-medium">Due Date:</span>
                <span className="text-gray-600">
                  {new Date(assignment.deadline).toLocaleDateString()}
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

          <SubmissionSection 
            assignmentId={assignmentId}
            courseId={courseId}
            currentUser={currentUser}
          />

          {/* Timeline Card */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Assignment Timeline</h3>
            <div className="flex items-center justify-between text-gray-600">
              <div className="text-center">
                <p className="font-medium">Assigned</p>
                <p>{new Date(assignment.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="h-1 bg-gray-200 flex-1 mx-4" />
              <div className="text-center">
                <p className="font-medium">Due Date</p>
                <p>{new Date(assignment.deadline).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      
        
      </div>
    </UserLayout>
  );
};

export default AssignmentDetails;