import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatWindow({ chatId, userName, handleBackToChatList }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
        if (response.data.data) {
          setMessages(response.data.data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const newMessageObject = {
      id: messages.length + 1,
      senderName: userName,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessageObject]);

    const allMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || [];
    localStorage.setItem(`chat_${chatId}`, JSON.stringify([...allMessages, newMessageObject]));

    setNewMessage('');
  };

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b dark:border-gray-700 flex items-center">
        <button onClick={handleBackToChatList} className="block sm:hidden mr-4 text-3xl font-" style={{ fontFamily: "fantasy" }}>
          ←
        </button>
        <h2 className="text-2xl cursor-pointer" onClick={toggleUserDetails}>
          {userName || 'No user name available'}
        </h2>
        {showUserDetails && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Display more user details here
          </div>
        )}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-gray-500">No messages available.</div>
        ) : (
          messages.map(message => (
            <div key={message.id} className="mb-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">{userName && "Unknown Sender" || 'Unknown Sender'}</h3>
              <p className="text-lg">{message.message}</p>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t dark:border-gray-700 flex items-center">
      <input type="text" placeholder="Type your message..." value={newMessage} onChange={handleNewMessageChange} className="p-2 border rounded-md w-5/6 dark:bg-gray-700 dark:text-white" />
        <button onClick={handleSendMessage} className=" p-2 bg-blue-500 text-white rounded-md mx-2">Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
