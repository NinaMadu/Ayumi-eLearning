import React from "react";
import UserLayout from "./UserLayout";

const JapanRoadmap = () => {
  const steps = [
    {
      year: "Step 1",
      title: "Learn Japanese",
      description:
        "Start learning Japanese to achieve at least JLPT N4 or N3 level. Use resources like Duolingo, Genki textbooks, or enroll in a language school.",
      image: "https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/f1/7a/jp-e-1727379489-sakura-themed-japanese-language-display-poster_ver_1.jpg", // Replace with your image URL
    },
    {
      year: "Step 2",
      title: "Choose Your Path",
      description:
        "Decide whether you want to move to Japan for work, study, or other purposes. Research job opportunities or universities.",
      image: "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-japanese-poster-japan-tourism-japanese-zephyr-image_16665.jpg", // Replace with your image URL
    },
    {
      year: "Step 3",
      title: "Prepare for Exams",
      description:
        "Take required exams like JLPT (Japanese Language Proficiency Test), EJU (for university admission), or TOEFL/IELTS (for English-taught programs).",
      image: "https://learnacademy.cl/wp-content/uploads/2023/05/2023.04-Blog-JLPT.webp", // Replace with your image URL
    },
    {
      year: "Step 4",
      title: "Apply for a Visa",
      description:
        "Apply for a work or student visa after securing a job offer or university acceptance. Submit necessary documents like passport, proof of qualifications, and financial proof.",
      image: "https://img.freepik.com/premium-vector/japan-travel-concept-landmark-icon-with-airplane_1018359-254.jpg", // Replace with your image URL
    },
    {
      year: "Step 5",
      title: "Plan Your Move",
      description:
        "Book flights, arrange accommodation, and prepare for life in Japan. Open a bank account and enroll in Japan's National Health Insurance after arrival.",
      image: "https://img.freepik.com/premium-vector/travel-advertising-with-travel-japan-concept-with-japanese-famous-landmark-paper-cut-style-vector-illustration_41327-651.jpg", // Replace with your image URL
    },
  ];

  return (
    <UserLayout>
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Roadmap to Japan from Sri Lanka
        </h1>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } items-center mb-8`}
            >
              {/* Year */}
              <div className="w-1/2 px-4">
                <div className="text-2xl font-bold text-gray-800">
                  {step.year}
                </div>
              </div>

              {/* Card */}
              <div className="w-1/2 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-32 object-cover rounded-t-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default JapanRoadmap;