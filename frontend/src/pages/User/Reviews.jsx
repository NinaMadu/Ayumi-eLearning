import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import UserLayout from "../../components/UserLayout";
import { useSelector } from "react-redux";
import useSuccessMessage from '../../hooks/useSuccessMessage'; // Import the hook

const Reviews = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Use the success message hook
  const { triggerSuccess, successBox } = useSuccessMessage();

  // Function to submit the review
  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide a rating and review!");
      return;
    }

    const reviewData = {
      course: courseId, // Change `courseId` to `course`
      rating,
      comment,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        // Trigger the success message
        triggerSuccess("Success", "Review submitted successfully!");

        // Navigate after a short delay (optional)
        setTimeout(() => {
          navigate(`/user/course-cards`);
        }, 2000); // 2 seconds delay
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Rate This Course</h2>

        {/* Star Rating */}
        <div className="flex mt-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`cursor-pointer text-3xl ${
                num <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(num)}
            />
          ))}
        </div>

        {/* Review Input */}
        <textarea
          className="w-full mt-4 p-3 border rounded-lg"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>

        {/* Render the success box */}
        {successBox}
      </div>
    </UserLayout>
  );
};

export default Reviews;