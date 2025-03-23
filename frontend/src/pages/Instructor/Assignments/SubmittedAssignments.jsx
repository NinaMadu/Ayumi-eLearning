import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiFileText, FiUser, FiClock, FiTrash2, FiEye, FiEdit3 } from "react-icons/fi";
import AdminLayout from "../../../components/AdminLayout";

const SubmittedAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [grading, setGrading] = useState({ submissionId: null, grade: "", feedback: "" });

  const { courseId, assignmentId } = useParams();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/submissions/${courseId}/${assignmentId}`
        );
        const data = await res.json();

        if (res.ok) {
          setSubmissions(data.submissions);
          console.log(data.submissions);
        } else {
          setError(data.message || "Failed to fetch submissions");
        }
      } catch (err) {
        setError("Error fetching submissions");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && assignmentId) {
      fetchSubmissions();
    }
  }, [courseId, assignmentId]);

  const handleRemove = async (submissionId) => {
    if (!window.confirm("Are you sure you want to remove this submission?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/submissions/${submissionId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to remove submission");

      setSubmissions((prev) => prev.filter((s) => s._id !== submissionId));
      setSuccessMessage("Submission removed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGrade = async (submissionId) => {
    if (!grading.grade || grading.grade < 0 || grading.grade > 100) {
      setError("Grade must be between 0 and 100.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/submissions/grade/${submissionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grade: grading.grade,
            feedback: grading.feedback,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to grade submission");

      const updatedSubmission = await res.json();

      setSubmissions((prev) =>
        prev.map((s) => (s._id === submissionId ? updatedSubmission.submission : s))
      );

      setSuccessMessage("Submission graded successfully!");
      setGrading({ submissionId: null, grade: "", feedback: "" });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Submitted Answers
            </h1>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              {successMessage}
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {submissions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          <FiUser className="inline mr-2" />
                          Student
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          Assignment
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          <FiClock className="inline mr-2" />
                          Submitted At
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          Grade
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {submissions.map((submission) => (
                        <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {submission.userId?.firstName || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                            {submission.assignmentId?.title || "Untitled Assignment"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {submission.grade !== undefined ? (
                              <>
                                <span className="font-semibold">{submission.grade}/100</span>
                                <p className="text-xs text-gray-500">
                                  {submission.feedback?.length > 20
                                    ? `${submission.feedback.substring(0, 20)}...`
                                    : submission.feedback}
                                </p>
                              </>
                            ) : (
                              <span className="text-gray-400">Not graded</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 items-center">
                              <button
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                onClick={() => window.open(submission.fileUrl, "_blank")}
                              >
                                <FiEye className="text-lg" />
                              </button>

                              <button
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() =>
                                  setGrading({
                                    submissionId: submission._id,
                                    grade: submission.grade || "",
                                    feedback: submission.feedback || "",
                                  })
                                }
                              >
                                <FiEdit3 className="text-lg" />
                              </button>

                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                onClick={() => handleRemove(submission._id)}
                              >
                                <FiTrash2 className="text-lg" />
                              </button>
                            </div>

                            {grading.submissionId === submission._id && (
                              <div className="mt-2 p-4 border rounded-lg bg-gray-100">
                                <input
                                  type="number"
                                  value={grading.grade}
                                  onChange={(e) =>
                                    setGrading({ ...grading, grade: e.target.value })
                                  }
                                  className="p-2 border rounded w-20"
                                  placeholder="Grade"
                                />
                                <input
                                  type="text"
                                  value={grading.feedback}
                                  onChange={(e) =>
                                    setGrading({ ...grading, feedback: e.target.value })
                                  }
                                  className="p-2 border rounded ml-2 w-48"
                                  placeholder="Feedback"
                                />
                                <button className="ml-2 p-2 bg-blue-600 text-white rounded" onClick={() => handleGrade(submission._id)}>
                                  Submit
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-12">
                  <FiFileText className="text-gray-400 text-6xl mb-4" />
                  <p className="text-gray-500 text-lg">No submissions found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubmittedAssignments;
