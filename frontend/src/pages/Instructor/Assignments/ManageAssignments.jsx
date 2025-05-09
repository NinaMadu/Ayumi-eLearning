import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../../../components/AdminLayout";
import DeleteConfirmation from "../../../components/confirmations/DeleteConfirmation";
import SuccessBox from "../../../components/SuccessBox";

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteAssignmentId, setDeleteAssignmentId] = useState(null);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/assignments`
        );
        const data = await res.json();

        if (res.ok) {
          setAssignments(data.assignments);
        } else {
          setError(data.message || "Failed to fetch assignments");
        }
      } catch (err) {
        setError("Error fetching assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading assignments...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <p>{error}</p>
      </AdminLayout>
    );
  }

  const handleDelete = async (assignmentId) => {
    if (!deleteAssignmentId) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/assignments/${deleteAssignmentId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setAssignments((prev) =>
          prev.filter((assignment) => assignment._id !== deleteAssignmentId)
        );
        setShowSuccessBox(true);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete assignment");
      }
    } catch (error) {
      alert("Error deleting assignment");
    } finally {
      setShowDeleteConfirmation(false);
      setDeleteAssignmentId(null);
    }
  };

  return (
    <AdminLayout>

         {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}

      {/* Success Message Box */}
      {showSuccessBox && (
        <SuccessBox
          title="Assignment Deleted"
          message="The assignment has been successfully deleted."
          onClose={() => setShowSuccessBox(false)}
        />
      )}

      {/* Add New Assignment Button */}
      <div className="flex justify-end p-4">
        <Link to="/instructor/add-assignment">
          <button
            className="py-2 px-6 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            style={{ background: "linear-gradient(to right, #4CAF50, #388E3C)" }}
          >
            + Add New Assignment
          </button>
        </Link>
      </div>

      {/* Assignments List */}
      <div className="container mx-auto p-4 space-y-4 bg-slate-50 rounded-lg">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-transform hover:scale-105"
              onClick={() => navigate(`/instructor/submitted-assignments/${assignment.courseId._id}/${assignment._id}`)} // Redirect to submitted assignments page
          
            >
              {/* Assignment Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
  <strong>Course:</strong> {assignment.courseId?.title || "Untitled Course"}
</p>

                <p className="text-sm text-gray-600 mt-1">
                  <strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                  className="text-blue-800 hover:text-blue-600"
                  onClick={() => navigate(`/instructor/edit-assignment/${assignment._id}`)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-red-700 hover:text-red-500"
                  onClick={() => {
                    setDeleteAssignmentId(assignment._id);
                    setShowDeleteConfirmation(true);
                  }}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No assignments found!</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageAssignments;
