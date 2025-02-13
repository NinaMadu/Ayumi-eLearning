import React, { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuizData,
  resetQuizData,
  setTotalMarks,
  setPassingScore,
  updateMarkPoint,
  setDuration,
  setQuestions,
} from "../../../redux/quizSlice";
import axios from "axios";
import useCancelConfirmation from "../../../hooks/useCancelConfirmation";
import useSuccessMessage from "../../../hooks/useSuccessMessage";

const QuizThirdEditPage = () => {
  const { triggerSuccess, successBox } = useSuccessMessage();
  const { triggerCancel, confirmationBox } = useCancelConfirmation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizId } = useParams(); // Get quizId from the URL

  const { questions, totalMarks, passingScore, duration } = useSelector(
    (state) => state.quiz
  );
  const { quizTitle, description, category, difficulty } = useSelector(
    (state) => state.quiz.quizData
  );

  // Fetch quiz data when the component mounts
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}`);
        const quiz = response.data.quiz;

        // Populate Redux state with fetched quiz data
        dispatch(updateQuizData(quiz.quizData));
        dispatch(setQuestions(quiz.questions || []));
        dispatch(setTotalMarks(quiz.totalMarks || 0));
        dispatch(setPassingScore(quiz.passingScore || 0));
        dispatch(setDuration(quiz.duration || 0));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId, dispatch]);

  // Automatically calculate total marks if not set
  useEffect(() => {
    if (totalMarks === 0) {
      const calculatedTotalMarks = questions.reduce(
        (sum, question) => sum + (parseInt(question.marks) || 0),
        0
      );
      dispatch(setTotalMarks(calculatedTotalMarks));
    }
  }, [questions, totalMarks, dispatch]);

  const handleChange = (e, index) => {
    const { id, value } = e.target;

    if (id === "passingScore") {
      dispatch(setPassingScore(value));
    } else if (id === "totalMarks") {
      dispatch(setTotalMarks(value));
    } else if (id === "duration") {
      dispatch(setDuration(value));
    } else {
      dispatch(updateMarkPoint({ index, marks: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      quizTitle,
      description,
      category,
      difficulty,
      questions,
      totalMarks,
      passingScore,
      duration,
    };

    try {
      console.log("Submitting quiz data:", quizData);
      const response = await axios.put(
        `http://localhost:5000/api/quiz/${quizId}`,
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Quiz Updated Successfully:", response.data);
      triggerSuccess("Updated!", "Quiz updated successfully");
      dispatch(resetQuizData());
      setTimeout(() => {
        navigate("/instructor/create-quiz");
      }, 3000);
    } catch (error) {
      if (error.response) {
        console.error("Error updating quiz:", error.response.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleCancel = () => {
    dispatch(resetQuizData());
    navigate("/instructor/create-quiz");
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        {successBox}
        {confirmationBox}
        <div className="flex flex-row justify-between w-full mb-4">
          <h1 className="text-3xl font-semibold">Step 03</h1>
          <button
            className="border p-2 bg-red-600 text-white font-medium rounded-lg"
            onClick={handleCancel}
          >
            Cancel Process
          </button>
        </div>

        {/* Form Section */}
        <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
          <h1
            className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
            style={{
              background: "linear-gradient(to right, #D16262, #C53B3B)",
            }}
          >
            Scoring and Publish
          </h1>
          <form className="space-y-4 ml-8" onSubmit={handleSubmit}>
            {/* Total Marks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Total Marks:</label>
              <input
                type="number"
                id="totalMarks"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                value={totalMarks}
                onChange={handleChange}
              />
            </div>

            {/* Passing Score */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Passing Score:</label>
              <input
                type="number"
                id="passingScore"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                value={passingScore}
                onChange={handleChange}
              />
            </div>

            {/* Duration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Duration (minutes): </label>
              <input
                type="number"
                id="duration"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                value={duration}
                onChange={handleChange}
              />
            </div>

            {/* Question Mark Points */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Assign Marks to Questions
              </h2>
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4"
                >
                  <label className="col-span-1">{`Question ${
                    index + 1
                  } Points:`}</label>
                  <input
                    type="number"
                    id="markPoint"
                    className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                    value={question.marks}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-900 text-white font-bold py-2 px-4 rounded-lg w-1/3"
              >
                Update Quiz
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-between mt-6">
          <Link to={`/instructor/edit-quiz-second/${quizId}`}>
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pr-4">
              <ChevronLeftIcon className="h-6 w-6" />
              <p>Back</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizThirdEditPage;