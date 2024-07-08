import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import useWindowSize from './hooks/useWindowSize';
import './App.css';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const windowSize = useWindowSize(); 

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=2');
        setChats(response.data.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setChats([]);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleBackToChatList = () => {
    setSelectedChat(null);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen relative">
        <Sidebar closeSidebar={closeSidebar} darkMode={darkMode} setDarkMode={setDarkMode} sidebarOpen={sidebarOpen} />
        <div className="flex flex-col w-full">
          <div className="flex flex-1 overflow-hidden">
            {(!selectedChat || windowSize.width >= 640) && (
              <ChatList
                chats={chats}
                selectedChat={selectedChat} 
                setSelectedChat={setSelectedChat}
                toggleSidebar={toggleSidebar}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
            <div className="vertical-line hidden sm:block"></div>
            {selectedChat ? (
              <ChatWindow
                chatId={selectedChat.id}
                userName={selectedChat.creator.name}
                handleBackToChatList={handleBackToChatList}
              />
            ) : (
              windowSize.width >= 640 && (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
