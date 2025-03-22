import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "../../../components/AdminLayout";
import SuccessBox from "../../../components/SuccessBox";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const EditAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    instructorId: "",
    deadline: "",
    pdfUrl: "",
    imageUrl: "",
  });
  const [selectedPdf, setSelectedPdf] = useState(null); // State for selected PDF
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve the assignment ID from the URL

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setFormData((prev) => ({
        ...prev,
        instructorId: currentUser._id, // Update instructorId dynamically
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    // Fetch courses for the dropdown
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course`);
        const data = await res.json();
        if (res.ok) {
          setCourses(data.courses);
        } else {
          setError(data.message || "Failed to fetch courses");
        }
      } catch (err) {
        setError("Error fetching courses");
      }
    };

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
      

    // Fetch assignment details for editing
    const fetchAssignment = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            ...data.assignment,
            courseId: data.assignment.courseId._id, // Assuming courseId is populated
            deadline: formatDateForInput(data.assignment.deadline),
        });
          setSelectedPdf(data.assignment.pdfUrl); // Set existing PDF URL
          setSelectedImage(data.assignment.imageUrl); // Set existing Image URL
        } else {
          setError(data.message || "Failed to fetch assignment");
        }
      } catch (err) {
        setError("Error fetching assignment details");
      }
    };

    fetchCourses();
    fetchAssignment();
  }, [id]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
    
    if (name === "pdfFile") {
      setSelectedPdf(URL.createObjectURL(files[0])); // Preview selected PDF
    } else if (name === "imageFile") {
      setSelectedImage(URL.createObjectURL(files[0])); // Preview selected Image
    }
  };

  const uploadFile = async (file, folder) => {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, `${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);
    try {
      const pdfUrl = formData.pdfFile ? await uploadFile(formData.pdfFile, "assignments/pdfs") : selectedPdf;
      const imageUrl = formData.imageFile ? await uploadFile(formData.imageFile, "assignments/images") : selectedImage;

      const assignmentData = {
        ...formData,
        pdfUrl,
        imageUrl,
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentData),
      });

      if (res.ok) {
        setShowSuccessBox(true);
        setTimeout(() => navigate("/instructor/assignment-management"), 2000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update assignment");
      }
    } catch (err) {
      setError("Error updating assignment");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleRemovePdf = () => {
    setSelectedPdf(null); // Remove selected PDF
    setFormData((prev) => ({ ...prev, pdfFile: null })); // Clear form data for PDF
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove selected Image
    setFormData((prev) => ({ ...prev, imageFile: null })); // Clear form data for Image
  };

  return (
    <AdminLayout>
      {showSuccessBox && (
        <SuccessBox
          title=""
          message="Assignment updated successfully!"
          onClose={() => setShowSuccessBox(false)}
        />
      )}

      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Assignment</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              required
            />
          </div>

          {/* PDF File Preview and Download */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Documents</label>
  {selectedPdf ? (
    <div>
      <a 
        href={selectedPdf} 
        download="document.pdf" 
        className="text-blue-500 underline"
      >
        Download PDF
      </a>
      <button 
        type="button" 
        onClick={handleRemovePdf} 
        className="ml-4 text-red-500"
      >
        Remove PDF
      </button>
    </div>
  ) : (
    <input
      type="file"
      name="pdfFile"
      accept=".pdf"
      onChange={handleFileChange}
      className="w-full p-3 border border-gray-300 rounded-lg mb-4"
    />
  )}
</div>


          {/* Image File Preview and Remove */}
          <div className="mb-4">
            {selectedImage ? (
              <div>
                <img src={selectedImage} alt="Selected" width="100%" height="auto" />
                <button type="button" onClick={handleRemoveImage} className="mt-2 text-red-500">Remove Image</button>
              </div>
            ) : (
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              disabled={loading || uploading}
            >
              {loading || uploading ? "Updating..." : "Update Assignment"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditAssignment;
