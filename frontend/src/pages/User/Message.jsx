import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaImage, FaFile, FaTimes } from "react-icons/fa";
import { storage } from "../../firebase.js"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Messaging = ({ instructor }) => {
    const [searchText, setSearchText] = useState('');
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fullViewImage, setFullViewImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
const [selectedFileUrl, setSelectedFileUrl] = useState(null);

    const currentUser = useSelector((state) => state.user.currentUser);
    console.log(instructor);
    const recipientId = instructor?._id;

    useEffect(() => {
        console.log("Instructor Data:", instructor);  // Check course data here
        if (!instructor?._id) {
            console.warn("Instructor information is missing in the course object.");
        }
    }, [instructor]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentUser || !recipientId) {
                console.log("Current user:", currentUser._id);
                console.log("Recipient ID:", recipientId);
                console.warn("Missing user or recipient ID.");
                return;
            }
            console.log("Fetching messages for:", currentUser._id, "→", recipientId);
            
            try {
                const response = await axios.get(`${API_BASE_URL}/api/message/conversation/${currentUser._id}/${recipientId}`);
                console.log("API Response:", response.data);
                
                if (response.data.success) {
                    setMessages(response.data.messages);
                } else {
                    console.warn("API returned an unsuccessful response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error.response?.data || error.message);
            }
        };
    
        fetchMessages();
    }, [recipientId, currentUser]);

    useEffect(() => {
        console.log("Updating filteredMessages", messages);
        setFilteredMessages(messages);
    }, [messages]);


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);

        const storageRef = ref(storage, `chat/images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Image URL:", downloadURL);

        setSelectedImageUrl(downloadURL);
    };
    
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file.name);

        const storageRef = ref(storage, `chat/files/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File URL:", downloadURL);

        setSelectedFileUrl(downloadURL);
    };

    const handleClearAttachment = () => {
        setSelectedImage(null);
        setSelectedFile(null);
    };


    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
    
        console.log("Sending message:", newMessage);
    
        try {
            // Assuming the sender and receiver types are 'user' and 'instructor', you can adjust as needed.
            const senderType = 'User'; // Set sender type accordingly
            const receiverType = 'Instructor'; // Set receiver type accordingly
            const fileUrl = null; // Set to file URL if a file is attached, else null
            const imageUrls = []; // Set to an array of image URLs if any images are attached
    
            const response = await axios.post(`${API_BASE_URL}/api/message/`, {
                sender: currentUser._id,
                senderType,
                receiver: recipientId,
                receiverType,
                message: newMessage,
                fileUrl: selectedFileUrl || null,
                imageUrls: selectedImageUrl ? [selectedImageUrl] : [],
            });
    
            console.log("Message sent successfully:", response.data);
    
            if (response.data.success) {
                setMessages((prev) => [...prev, response.data.data]); // Assuming the new message data is in response.data.data
                setNewMessage(''); // Clear the message input field
                setSelectedImage(null);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="container mx-auto shadow-lg rounded-lg">
            <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                <div className="font-semibold text-2xl">Contact Instructor</div>
                <div className="w-1/2">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                    />
                </div>
                <div className="flex items-center gap-3">
            <img 
                src={instructor.avatar} 
                alt="Instructor Avatar" 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
            <span>{instructor.name}</span>
        </div>
            </div>

            <div className="flex flex-row justify-between bg-white">
                <div className="w-full px-5 flex flex-col justify-between">
                    <div className="flex flex-col mt-5">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((message) => {
                                const isCurrentUser = message.sender === currentUser._id;
                                return (
                                    <div key={message._id} className="flex flex-col mb-4">
                                        <div className={`flex items-center ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                            
                                            <div className={`ml-2 max-w-xs break-words ${isCurrentUser ? 'bg-green-400 text-white rounded-tl-xl rounded-tr-3xl rounded-bl-xl p-3' : 'bg-blue-400 text-white rounded-tl-3xl rounded-tr-xl p-3'}`}>
                                                
                                                <div>{message.message}</div>
                                                {/* Image Display */}
            {message.imageUrls && message.imageUrls.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {message.imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt="Sent Image"
                            className="w-32 h-32 object-cover rounded-lg cursor-pointer lg:w-64 lg:h-64"
                            onClick={() => setFullViewImage(url)}
                        />
                    ))}
                </div>
            )}

            {/* Full-Screen Image Modal */}
            {fullViewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative">
                        <img src={fullViewImage} alt="Full View" className="max-w-full max-h-screen rounded-lg" />
                        <button 
                            className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
                            onClick={() => setFullViewImage(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
                            {/* File Display */}
                            {message.fileUrl && (
    <div className="mt-2 flex items-center gap-2">
        <FaFile className="text-gray-600 text-xl hover:text-gray-800" />
        <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="text-white underline">
            {message.fileUrl.split('/').pop()} {/* Extract the file name */}
        </a>
    </div>
)}
                                            </div>
                                           
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-500 mt-5">No messages yet.</p>
                        )}
                    </div>

                     {/* Preview Section */}
                     {(selectedImage || selectedFile) && (
                        <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-3 relative">
                            {selectedImage && (
                                <img src={selectedImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg mr-3" />
                            )}
                            {selectedFile && (
                                <div className="text-gray-700 font-semibold">{selectedFile}</div>
                            )}
                            <button onClick={handleClearAttachment} className="absolute right-3 text-red-500 text-xl">
                                <FaTimes />
                            </button>
                        </div>
                    )}

        <div className="py-5 flex items-center">
        <div className="relative w-full">
        <input
            className="w-full bg-gray-300 py-5 px-12 rounded-xl pr-20"
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}                            
        />

        {/* Image Upload Icon (inside input) */}
        <label className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
            />
            <FaImage className="text-gray-600 text-xl hover:text-gray-800" />
        </label>
        
        {/* File Upload Icon (inside input) */}
        <label className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <input 
                type="file" 
                accept=".pdf,.doc,.docx,.ppt,.pptx" 
                className="hidden" 
                onChange={handleFileUpload} 
            />
            <FaFile className="text-gray-600 text-xl hover:text-gray-800" />
        </label>
    </div>
                        <button onClick={handleSendMessage} className="ml-2 py-3 px-4 bg-green-500 rounded-xl text-white font-semibold">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messaging;
