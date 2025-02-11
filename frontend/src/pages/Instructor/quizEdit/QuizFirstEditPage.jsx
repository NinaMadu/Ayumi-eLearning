import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuizData, resetQuizData } from "../../../redux/quizSlice";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
import useCancelConfirmation from "../../../hooks/useCancelConfirmation";

const QuizFirstEditPage = () => {
  const { triggerCancel, confirmationBox } = useCancelConfirmation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.quiz.quizData); // Fetch Redux data
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);

  // Function to map API response data
  const mapQuizDataToForm = (data) => ({
    quizTitle: data.quizTitle,
    description: data.description,
    category: data.category,
    difficulty: data.difficulty,
    questions: Array.isArray(data.questions)
      ? data.questions.map((q) => ({
          questionText: q.questionText,
          questionType: q.questionType,
          answers: q.answers,
          correctAnswer: q.correctAnswer,
          marks: q.marks,
        }))
      : [],
    duration: data.duration,
    totalMarks: data.totalMarks,
    passingScore: data.passingScore,
  });

  // Fetch quiz data from API
  useEffect(() => {
    if (!formData.quizTitle) {
      const fetchQuizData = async () => {
        try {
          dispatch(resetQuizData()); // Reset existing data before fetching
          const response = await axios.get(
            `http://localhost:5000/api/quiz/${quizId}`
          );
          const mappedData = mapQuizDataToForm(response.data.quiz);
          dispatch(updateQuizData(mappedData)); // Dispatch fetched data to Redux
          setLoading(false);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
          setLoading(false);
        }
      };
      fetchQuizData();
    } else {
      setLoading(false);
    }
  }, [quizId, dispatch, formData.quizTitle]); // Dependency on formData.quizTitle ensures it doesn't re-fetch if data exists

  // Debugging Redux State
  useEffect(() => {
    console.log("Redux Quiz Slice:", formData);
  }, [formData]);

  // Handle next button click
  const handleNext = () => {
    console.log(formData);
    navigate(`/instructor/edit-quiz-second/${quizId}`, { state: formData });
  };

  // Handle input change and update Redux properly
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateQuizData({ [id]: value }));
  };

  if (loading) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="w-full max-w-6xl px-6 bg-white rounded-lg">
          <div className="flex flex-row justify-between w-full mb-4">
            <h1 className="text-3xl font-semibold">Step 01</h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={triggerCancel}
            >
              Cancel Process
            </button>
          </div>

          <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
            <h1
              className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
              style={{
                background: "linear-gradient(to right, #D16262, #C53B3B)",
              }}
            >
              Quiz Information
            </h1>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">
                  Quiz Title:
                </label>
                <input
                  type="text"
                  id="quizTitle"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.quizTitle || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">
                  Description:
                </label>
                <textarea
                  id="description"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.description || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label
                  className="col-span-1 whitespace-nowrap"
                  htmlFor="category"
                >
                  Category:
                </label>
                <select
                  id="category"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.category || ""}
                >
                  <option value="">Select Type</option>
                  <option value="Language Skills">Language Skills</option>
                  <option value="Cultural Knowledge">Cultural Knowledge</option>
                  <option value="Proficiency Levels">Proficiency Levels</option>
                  <option value="Fun and Interactive">Fun and Interactive</option>
                  <option value="History and Literature">History and Literature</option>
                  <option value="Practical Use">Practical Use</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label
                  className="col-span-1 whitespace-nowrap"
                  htmlFor="difficulty"
                >
                  Difficulty Level:
                </label>
                <select
                  id="difficulty"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.difficulty || ""}
                >
                  <option value="">Select Type</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </form>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleNext}
              className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pl-4"
            >
              <p>Next</p>
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizFirstEditPage;
