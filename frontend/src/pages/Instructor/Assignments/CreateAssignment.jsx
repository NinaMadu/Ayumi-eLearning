import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "../../../components/AdminLayout";
import SuccessBox from "../../../components/SuccessBox";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    instructorId: "", // You can set this as the logged-in instructor's ID
    deadline: "",
    pdfUrl: "",
    imageUrl: "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setFormData((prev) => ({
        ...prev,
        instructorId: currentUser._id, // Update instructorId dynamically
      }));
    }

    
  }, [currentUser]);


  useEffect(() => {


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

    fetchCourses();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
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
      const pdfUrl = formData.pdfFile ? await uploadFile(formData.pdfFile, "assignments/pdfs") : "";
      const imageUrl = formData.imageFile ? await uploadFile(formData.imageFile, "assignments/images") : "";
      
      const assignmentData = {
        ...formData,
        pdfUrl,
        imageUrl,
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentData),
      });

      if (res.ok) {
        setShowSuccessBox(true);
        setTimeout(() => navigate("/instructor/assignment-management"), 2000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to create assignment");
      }
    } catch (err) {
      setError("Error creating assignment");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <AdminLayout>

        {/* Success Message Box */}
              {showSuccessBox && (
                <SuccessBox
                  title=""
                  message="Assignment created successfully!"
                  onClose={() => setShowSuccessBox(false)}
                />
              )}

      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add New Assignment</h1>

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

        
          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Documents</label>
          <input type="file" name="pdfFile" 
          accept=".pdf" onChange={handleFileChange} 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>

          <input type="file" name="imageFile" 
          accept=".jpg,.jpeg,.png" onChange={handleFileChange} 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
            </div>
          <button type="submit" className="w-full py-2 px-6 bg-green-600 text-white font-semibold rounded-lg mt-6 hover:bg-green-700" disabled={uploading || loading}>
            {uploading || loading ? "Submitting..." : "Create Assignment"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddAssignment;
