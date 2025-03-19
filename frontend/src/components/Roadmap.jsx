import React, { useState } from "react";
import {
  FaLanguage,
  FaGraduationCap,
  FaPassport,
  FaPlane,
  FaHome,
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

const steps = [
  {
    year: "Step 1",
    title: "Learn Japanese",
    description:
      "Start learning Japanese to achieve at least JLPT N4 or N3 level.",
    image:
      "https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/f1/7a/jp-e-1727379489-sakura-themed-japanese-language-display-poster_ver_1.jpg",
    icon: <FaLanguage className="text-3xl text-blue-600" />,
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
      "Decide whether you want to move to Japan for work, study, or other purposes.",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-japanese-poster-japan-tourism-japanese-zephyr-image_16665.jpg",
    icon: <FaGraduationCap className="text-3xl text-green-600" />,
    details: [
      "For work: Look for jobs in IT, engineering, or teaching English.",
      "For study: Apply to Japanese universities or language schools.",
      "Research scholarships like MEXT or JASSO for financial support.",
    ],
  },
  {
    year: "Step 3",
    title: "Prepare for Exams",
    description: "Take required exams like JLPT, EJU, or TOEFL/IELTS.",
    image:
      "https://learnacademy.cl/wp-content/uploads/2023/05/2023.04-Blog-JLPT.webp",
    icon: <FaPassport className="text-3xl text-purple-600" />,
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
      "Apply for a work or student visa after securing a job offer or university acceptance.",
    image:
      "https://img.freepik.com/premium-vector/japan-travel-concept-landmark-icon-with-airplane_1018359-254.jpg",
    icon: <FaPlane className="text-3xl text-red-600" />,
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
      "Book flights, arrange accommodation, and prepare for life in Japan.",
    image:
      "https://img.freepik.com/premium-vector/travel-advertising-with-travel-japan-concept-with-japanese-famous-landmark-paper-cut-style-vector-illustration_41327-651.jpg",
    icon: <FaHome className="text-3xl text-yellow-600" />,
    details: [
      "Book flights early to get the best deals.",
      "Look for accommodation through platforms like GaijinPot or Leopalace21.",
      "Enroll in Japan's National Health Insurance for healthcare coverage.",
    ],
  },
];

const Roadmap = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container px-12 py-24 mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">
          Your Journey to Japan
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative p-6 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105"
            >
              <div className="absolute flex items-center justify-center w-12 h-12 bg-white border-4 border-gray-200 rounded-full shadow-md -top-6 -left-6">
                {step.icon}
              </div>
              <img
                src={step.image}
                alt={step.title}
                className="object-cover w-full h-40 mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {step.year}: {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
              {hoveredStep === index && (
                <ul className="pl-5 mt-4 space-y-2 text-gray-600 list-disc">
                  {step.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Roadmap;