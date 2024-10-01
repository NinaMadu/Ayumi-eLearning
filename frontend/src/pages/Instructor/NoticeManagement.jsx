import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Link } from 'react-router-dom';

export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null); // To hold the selected notice for the modal

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notices`);
        const data = await res.json();

        if (res.ok) {
          setNotices(data.notices);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch notices');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching notices');
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const deleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notices/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setNotices(notices.filter(notice => notice._id !== id));
          setSelectedNotice(null); // Close the modal if the deleted notice is currently open
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to delete notice');
        }
      } catch (err) {
        console.error(err);
        alert('Error deleting notice');
      }
    }
  };

  const openModal = (notice) => {
    setSelectedNotice(notice);
  };

  const closeModal = () => {
    setSelectedNotice(null);
  };

  if (loading) {
    return <p>Loading notices...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AdminLayout>
      <div className='p-6'>
        <div className='fixed right-4'>
          <Link to={'/instructor/create-notice'}>
            <button
              className='py-2 px-4 rounded-lg text-white font-semibold'
              style={{
                background: 'linear-gradient(to right, #D16262, #C53B3B)',
              }}
            >
              + Add New Notice
            </button>
          </Link>
        </div>

        <div className='mt-16'>
          {notices.map((notice) => (
            <div
              key={notice._id}
              className='bg-white p-4 mb-4 rounded-lg shadow-lg flex justify-between items-start'
              onClick={() => openModal(notice)} // Open the modal with the notice details
            >
              <div className="flex items-start">
                {notice.image ? (
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className='w-20 h-20 object-cover rounded-lg mr-4'
                  />
                ) : (
                  <div className='w-20 h-20 bg-gray-200 rounded-lg mr-4 flex items-center justify-center'>
                    <span className='text-gray-400'>No Image</span>
                  </div>
                )}
                <div className='flex-grow'>
                  <h3 className='text-xl font-semibold'>{notice.title}</h3>
                  <p className='text-gray-600 mt-2'>{notice.description}</p>
                </div>
              </div>
              <div className='flex'>
                <Link to={`/instructor/edit-notice/${notice._id}`}>
                  <button
                    className='mr-2 py-1 px-3 bg-blue-600 text-white rounded-lg'
                    onClick={(e) => e.stopPropagation()} // Prevent opening the modal
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className='py-1 px-3 bg-red-600 text-white rounded-lg'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the modal from opening
                    deleteNotice(notice._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for displaying notice details */}
        {selectedNotice && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg max-w-lg w-full relative'>
              <button
                className='absolute top-2 right-2 bg-red-500 text-white text-2xl p-2 rounded-full hover:bg-red-600 transition-all duration-200'
                onClick={closeModal}
              >
                &times;
              </button>
              {selectedNotice.image && (
                <img
                  src={selectedNotice.image}
                  alt={selectedNotice.title}
                  className='w-full h-48 object-cover rounded-lg mb-4'
                />
              )}
              <h3 className='text-2xl font-semibold'>{selectedNotice.title}</h3>
              <p className='text-gray-600 mt-2'>{selectedNotice.description}</p>
              <div className='flex mt-4'>
                <Link to={`/instructor/edit-notice/${selectedNotice._id}`}>
                  <button
                    className='mr-2 py-2 px-4 bg-blue-600 text-white rounded-lg'
                    onClick={() => closeModal()} // Close the modal when navigating to edit
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className='py-2 px-4 bg-red-600 text-white rounded-lg'
                  onClick={() => {
                    deleteNotice(selectedNotice._id);
                    closeModal(); // Close modal after delete
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
