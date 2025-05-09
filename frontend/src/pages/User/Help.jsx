import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPaperPlane } from "react-icons/fa";
import help from '../../assets/help2.jfif';

const GetInTouch = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_k4lg14p", // Replace with your EmailJS Service ID
        "template_k3705ze", // Replace with your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "mYhbctOkCrHNms1wn" // Replace with your EmailJS Public Key
      )
      .then(() => {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
        setTimeout(() => setIsSent(false), 5000);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div 
        className="w-1/2 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${help})`,}} 
      >
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark Overlay */}
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="max-w-lg w-full">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-6">Get in Touch</h2>
          <p className="text-center text-gray-600 mb-6">
            Have questions or feedback? Fill out the form below, and we'll get back to you soon!
          </p>

          {isSent && (
            <p className="text-red-600 text-center bg-red-100 p-3 rounded-lg mb-4">
              ✅ Message sent successfully! We'll get back to you soon.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Type your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <FaPaperPlane />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
