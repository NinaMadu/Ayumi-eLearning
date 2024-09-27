import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateNotice = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleDelete = () => {
    if (selectedImageIndex !== null) {
      setFormData((prevFormData) => {
        const newImages = [...prevFormData.images];
        newImages.splice(selectedImageIndex, 1);
        return {
          ...prevFormData,
          images: newImages,
        };
      });
      setSelectedImageIndex(null); // Clear the selection after deletion
    }
  };

  const handleCancel = () => {
    navigate('/instructor/notice-management');
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1
              className="text-xl md:text-xl lg:text-xl p-2 font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(to left, #D16262, #C53B3B)' }}
            >
              Create Notices
            </h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={handleCancel}
            >
              Cancel Process
            </button>
          </div>

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Title:</label>
              <input
                type="text"
                id="title"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 self-center">Images:</label>
              <input
                type="file"
                id="images"
                accept=".jpg,.jpeg,.png"
                multiple
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex space-x-4 justify-center">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center border-2 ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`uploaded ${index}`}
                    className="h-24 w-24 object-cover"
                  />
                </div>
              ))}
            </div>
            {formData.images.length > 0 && (
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  type="button"
                  className="bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={handleDelete}
                  disabled={selectedImageIndex === null}
                >
                  Delete
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4 mt-6">
              <label className="col-span-1 whitespace-nowrap">Description:</label>
              <textarea
                id="description"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <button
              type="submit"
              className="flex justify-center p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold mx-auto mt-6"
            >
              <span className="mx-2">Create Notice</span>
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateNotice;
