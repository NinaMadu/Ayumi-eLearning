import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiFileText, FiUser, FiClock, FiTrash2, FiEye } from "react-icons/fi";
import AdminLayout from "../../../components/AdminLayout";

const SubmittedAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { courseId, assignmentId } = useParams();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/submissions/${courseId}/${assignmentId}`
        );
        const data = await res.json();

        if (res.ok) {
          setSubmissions(data.submissions);
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {submissions.map((submission) => (
                        <tr
                          key={submission._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {submission.userId?.firstName || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                            {submission.assignmentId?.title ||
                              "Untitled Assignment"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 items-center">
                              <div className="relative group">
                                <button
                                  className="flex items-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  onClick={() =>
                                    window.open(submission.fileUrl, "_blank")
                                  }
                                >
                                  <FiEye className="text-lg shrink-0" />
                                  <span className="max-w-[160px] truncate text-sm font-medium">
                                    {submission.fileUrl.split("/").pop()}
                                  </span>
                                </button>

                                {/* Tooltip for full filename */}
                                <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md">
                                  {submission.fileUrl.split("/").pop()}
                                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                                </div>
                              </div>

                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <FiTrash2 className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="text-gray-400 text-6xl mb-4 flex justify-center">
                    <FiFileText />
                  </div>
                  <p className="text-gray-500 text-lg">
                    No submissions found for this assignment
                  </p>
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
