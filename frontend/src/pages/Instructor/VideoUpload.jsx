import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useSelector } from 'react-redux';

export default function VideoUpload() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailUrl: '',
        videoUrl: ''
    });

    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e) => {
        const { id, value, files } = e.target;
        if (id === 'thumbnail') {
            setThumbnailFile(files[0]);
        } else if (id === 'video') {
            setVideoFile(files[0]);
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    };

    const handleUpload = async (file) => {
        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}-${file.name}`; 
        const storageRef = ref(storage, `uploads/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                reject,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(resolve);
                }
            );
        });
    };

    const handleImageSubmit = async () => {
        if (thumbnailFile && videoFile) {
            setUploading(true);
            try {
                const thumbnailUrl = await handleUpload(thumbnailFile);
                const videoUrl = await handleUpload(videoFile);
                setFormData({ ...formData, thumbnailUrl, videoUrl });
                setUploading(false);
                navigate('/success-page'); 
            } catch (error) {
                console.error('Upload error:', error);
                setError('Failed to upload files');
                setUploading(false);
            }
        } else {
            setError('Both thumbnail and video files are required');
        }
    };
    return (
        //<AdminLayout>
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-xl mb-4 font-semibold">Upload Videos from Here</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
                                Title:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
                                Description:
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="thumbnail">
                                Thumbnail:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="thumbnail" type="file" />
                            <div className="flex items-center justify-start space-x-2 mt-2">
                               
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="video">
                                Upload video:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="video" type="file" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="button" className="flex mt-8 justify-center w-full  p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold">
                                Publish Video
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        //</AdminLayout>
    );
}
