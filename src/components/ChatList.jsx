import React from 'react';

function ChatList({ chats, selectedChat, setSelectedChat, toggleSidebar, searchQuery, setSearchQuery }) {
  const filteredChats = chats && chats.data && Array.isArray(chats.data)
    ? chats.data.filter(chat =>
      chat.creator && chat.creator.name &&
      chat.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  if (!chats || !Array.isArray(chats.data)) {
    return <div className="w-full bg-gray-100 dark:bg-gray-800 overflow-y-auto p-4">Loading chats...</div>;
  }

  return (
    <div className="w-full sm:w-1/3 lg:w-1/3 overflow-y-auto">
      <div className="flex items-center">
        <button onClick={(e) => { e.stopPropagation(); toggleSidebar() }} className="p-2 ml-3 text-2xl">
          ☰
        </button>
        <div className="p-4 w-full">
        <input type="text" placeholder="Search ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-1 border rounded-md w-full dark:bg-gray-700 dark:text-white " />
        </div>
      </div>
      {filteredChats.length === 0 ? (
        <div className="p-4">No chats available.</div>
      ) : (
        filteredChats.map(chat => (
          <div key={chat.id} className={`p-4 border-b dark:border-gray-700 cursor-pointer ${selectedChat && selectedChat.id === chat.id ? 'bg-blue-200' : ''}`} onClick={() => setSelectedChat(chat)} >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg">{chat.creator.name || "Unknown User"}</h2>
                <p className="text-sm">{chat.creator.email}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatList;
