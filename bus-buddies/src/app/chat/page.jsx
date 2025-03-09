import React from "react";
// import "../src/app/globals.css";

const Chat = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col text-white">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-gray-800 h-15 p-4">
        <div className="flex items-center">
        <img className="m-4 p-4 w-40 h-40" src="/logo.svg" alt="Logo" />
        </div>
        <div className="flex space-x-6">
          <span>Matches</span>
          <span className="font-bold">Chats</span>
          <span>My Profile</span>
          <span>Sign Out</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 bg-blue-300 p-4">
          <h2 className="text-lg font-bold mb-4">Your Chats</h2>
          {['Harry', 'Josh', 'Sarah', 'John'].map((name, index) => (
            <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg mb-2">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <div>
                <p className="font-bold text-black">{name}</p>
                <p className="text-gray-500 text-sm">{name === 'Josh' ? "Josh: let's meet up!" : "You: hi how are you?"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Section */}
        <div className="flex flex-col flex-grow bg-gray-100">
          <div className="flex items-center p-4 bg-gray-300">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <h2 className="text-black ml-4 font-bold text-lg">John</h2>
            <div className="ml-auto text-black space-y-2 flex flex-col">
              <span>Report</span>
              <span>Block</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-4 flex flex-col space-y-2 overflow-auto">
            <div className="bg-gray-300 p-2 rounded-3xl self-start text-black">hey, are you taking the 99 B-line tomorrow?</div>
            <div className="bg-blue-300 p-2 rounded-3xl self-end text-black">hi, yes i am</div>
            <div className="bg-blue-300 p-2 rounded-3xl self-end text-black">let’s meet up!</div>
            <div className="bg-blue-300 p-2 rounded-3xl self-end text-black">i kind of want a blue chip cookie first, wanna come with?</div>
            <div className="bg-gray-300 p-2 rounded-3xl self-start text-black">yes totally!</div>
            <div className="bg-gray-300 p-2 rounded-3xl self-start text-black">when?</div>
          </div>

          {/* Chat Input */}
          <div className="p-2 bg-gray-300 flex items-center">
            <input className="flex-grow p-2 rounded-3xl bg-neutral-50 text-black h-18" placeholder="Type a message..." />
            <div className="flex flex-col items-center">
              <img className="m-2 w-8 h-8" src="/send.svg" alt="Send" />
              <img className="m-2 w-8 h-8" src="/emojis.svg" alt="Emojis" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
