import React from "react";
import UserLayout from "./UserLayout";
import { FaLanguage, FaGraduationCap, FaPassport, FaPlane, FaHome } from "react-icons/fa";

const JapanRoadmap = () => {
  const steps = [
    {
      year: "Step 1",
      title: "Learn Japanese",
      description:
        "Start learning Japanese to achieve at least JLPT N4 or N3 level. Use resources like Duolingo, Genki textbooks, or enroll in a language school.",
      image: "https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/f1/7a/jp-e-1727379489-sakura-themed-japanese-language-display-poster_ver_1.jpg",
      icon: <FaLanguage className="text-4xl text-blue-600" />,
      details: [
        "JLPT N4/N3 is the minimum requirement for most jobs and universities.",
        "Consider joining language exchange programs or online communities.",
        "Practice speaking with native speakers through platforms like iTalki.",
      ],
    },
    {
      year: "Step 2",
      title: "Choose Your Path",
      description:
        "Decide whether you want to move to Japan for work, study, or other purposes. Research job opportunities or universities.",
      image: "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-japanese-poster-japan-tourism-japanese-zephyr-image_16665.jpg",
      icon: <FaGraduationCap className="text-4xl text-green-600" />,
      details: [
        "For work: Look for jobs in IT, engineering, or teaching English.",
        "For study: Apply to Japanese universities or language schools.",
        "Research scholarships like MEXT or JASSO for financial support.",
      ],
    },
    {
      year: "Step 3",
      title: "Prepare for Exams",
      description:
        "Take required exams like JLPT (Japanese Language Proficiency Test), EJU (for university admission), or TOEFL/IELTS (for English-taught programs).",
      image: "https://learnacademy.cl/wp-content/uploads/2023/05/2023.04-Blog-JLPT.webp",
      icon: <FaPassport className="text-4xl text-purple-600" />,
      details: [
        "JLPT is held twice a year (July and December).",
        "EJU is required for undergraduate programs in Japan.",
        "TOEFL/IELTS is necessary for English-taught programs.",
      ],
    },
    {
      year: "Step 4",
      title: "Apply for a Visa",
      description:
        "Apply for a work or student visa after securing a job offer or university acceptance. Submit necessary documents like passport, proof of qualifications, and financial proof.",
      image: "https://img.freepik.com/premium-vector/japan-travel-concept-landmark-icon-with-airplane_1018359-254.jpg",
      icon: <FaPlane className="text-4xl text-red-600" />,
      details: [
        "Work Visa: Requires a job offer and sponsorship from a Japanese company.",
        "Student Visa: Requires an acceptance letter from a Japanese school.",
        "Processing time: 1-3 months.",
      ],
    },
    {
      year: "Step 5",
      title: "Plan Your Move",
      description:
        "Book flights, arrange accommodation, and prepare for life in Japan. Open a bank account and enroll in Japan's National Health Insurance after arrival.",
      image: "https://img.freepik.com/premium-vector/travel-advertising-with-travel-japan-concept-with-japanese-famous-landmark-paper-cut-style-vector-illustration_41327-651.jpg",
      icon: <FaHome className="text-4xl text-yellow-600" />,
      details: [
        "Book flights early to get the best deals.",
        "Look for accommodation through platforms like GaijinPot or Leopalace21.",
        "Enroll in Japan's National Health Insurance for healthcare coverage.",
      ],
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
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      {step.icon}
                    </div>

                    {/* Image */}
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">{step.description}</p>

                    {/* Additional Details */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        More Information:
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {step.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
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