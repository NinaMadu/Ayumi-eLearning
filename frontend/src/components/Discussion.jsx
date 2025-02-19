import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Discussion = ({ courseId, currentUserId }) => {
    const [searchText, setSearchText] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/discussion/${courseId}`);

                if (response.data.success && Array.isArray(response.data.messages)) {
                    setMessages(response.data.messages);
                } else {
                    setMessages([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                setMessages([]);
            }
        };

        fetchMessages();
    }, [courseId]);

    useEffect(() => {
        if (!searchText.trim()) {
            setFilteredMessages(messages);
        } else {
            const lowerSearchText = searchText.toLowerCase();
            const filtered = messages.filter((msg) =>
                msg.message.toLowerCase().includes(lowerSearchText) ||
                msg.replies?.some(reply => reply.message.toLowerCase().includes(lowerSearchText))
            );
            setFilteredMessages(filtered);
        }
    }, [searchText, messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                let response;
                if (replyingTo) {
                    // Replying to a message
                    response = await axios.post(
                        `${API_BASE_URL}/api/discussion/${replyingTo._id}/reply`,
                        {
                            userId: currentUser._id,
                            message: newMessage,
                        }
                    );
                } else {
                    // Sending a new message
                    response = await axios.post(`${API_BASE_URL}/api/discussion/`, {
                        userId: currentUser._id,
                        courseId: courseId,
                        message: newMessage,
                    });
                }

                if (response.data && response.data.success) {
                    setMessages((prevMessages) =>
                        replyingTo
                            ? prevMessages.map((msg) =>
                                msg._id === replyingTo._id ? { ...msg, replies: [...msg.replies, response.data.updatedMessage] } : msg
                            )
                            : [...prevMessages, response.data.newMessage]
                    );
                }

                setNewMessage('');
                setReplyingTo(null); // Reset replying state after sending a reply
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };


    const handleReply = (message) => {
        setReplyingTo(message);
        console.log('Replying to:', message);
    };

    const cancelReply = () => {
        setReplyingTo(null);
    };


    const handleReaction = async (messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/discussion/${messageId}/like`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: currentUser._id }), // Send current user ID
            });
    
            if (!response.ok) {
                throw new Error("Failed to toggle like");
            }
    
            const data = await response.json();
    
            // Update messages state after liking/unliking
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === messageId ? { ...msg, likes: data.updatedMessage.likes } : msg
                )
            );
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };
    

    return (
        <div>
            <div className="container mx-auto shadow-lg rounded-lg">
                <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                    <div className="font-semibold text-2xl">Discussion</div>
                    <div className="w-1/2">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                        />
                    </div>                    
                </div>

                <div className="flex flex-row justify-between bg-white">
                    <div className="w-full px-5 flex flex-col justify-between">
                        <div className="flex flex-col mt-5">
                        {filteredMessages.length > 0 ? (
    filteredMessages.map((message) => {
        const isCurrentUser = message.user._id === currentUser._id;
        return (
            <div key={message._id} className="flex flex-col mb-4">
                {/* Main Message */}
                <div className={`flex items-center ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    {!isCurrentUser && (
                        <img src={message.user.avatar} className="object-cover h-8 w-8 rounded-full" alt="Sender" />
                    )}
                    <div
                        className={`ml-2 max-w-xs break-words ${isCurrentUser
                            ? 'bg-green-400 text-white rounded-tl-xl rounded-tr-3xl rounded-bl-xl p-3'
                            : 'bg-blue-400 text-white rounded-tl-3xl rounded-tr-xl p-3'
                        }`}
                    >
                        <div className="text-sm font-semibold">{message.user.firstName}</div>
                        <div>{message.message}</div>
                    </div>
                    {isCurrentUser && (
                        <img src={message.user.avatar} className="object-cover h-8 w-8 rounded-full" alt="Sender" />
                    )}
                    <div className="flex space-x-2 items-center">
                    <button onClick={() => handleReaction(message._id)} className="text-blue-500">
    👍 {message.likes.length} {/* Display like count */}
</button>
                       
                        <button
                            onClick={() => handleReply(message)}
                            className="text-gray-600 ml-2"
                        >
                            💬 Reply
                        </button>
                    </div>
                </div>

                {/* Replies (Now positioned BELOW the main message) */}
                {message.replies?.length > 0 && (
    <div className={`mt-2 flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Border wrapper */}
        <div className={`border-gray-300 flex flex-col space-y-2 
            ${isCurrentUser ? 'border-r-2 pr-6 items-end' : 'border-l-2 pl-6 items-start'}`}>
            
            {message.replies.map((reply) => (
                <div key={reply._id} className={`mb-2 flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-center`}>
                    
                    <div className="bg-gray-200 p-2 rounded-xl max-w-sm">
                        <div className="text-xs font-semibold">{reply.user.firstName}</div>
                        <div className="text-sm">{reply.message}</div>
                    </div>
                    
                    <img src={reply.user.avatar} className="object-cover h-6 w-6 rounded-full" alt="Reply Sender" />
                </div>
            ))}
        </div>
    </div>
)}
            </div>
        );
    })
) : (
    <p className="text-center text-gray-500 mt-5">No messages yet.</p>
)}
                        </div>

                        {/* Replying Section */}
                        {replyingTo && (
                            <div className="bg-gray-200 p-3 rounded-lg flex items-center justify-between mb-2">
                                <div>
                                    <span className="text-gray-600 text-sm">Replying to {replyingTo.user.firstName}:</span>
                                    <p className="text-gray-800">{replyingTo.message}</p>
                                </div>
                                <button onClick={cancelReply} className="text-red-500 font-bold text-xl ml-3">
                                    ❌
                                </button>
                            </div>
                        )}

                        <div className="py-5 flex items-center">
                            <input
                                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                type="text"
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={handleSendMessage} className="ml-2 py-3 px-4 bg-green-500 rounded-xl text-white font-semibold">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discussion;
