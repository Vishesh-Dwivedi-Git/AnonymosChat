"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  Upload,
  Send,
  MoreVertical,
  Gamepad,
  Eye,
  Voicemail,
  Flame,
  X,
} from "lucide-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { triggerState, value } from "./RecoilState";
import React from "react";
import EmojiPicker from "emoji-picker-react";

export default function ChatUI(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const [trigger] = useRecoilState(triggerState);
  const setTrigger = useSetRecoilState(triggerState);
  const [roomValue] = useRecoilState(value);
  const [isConnected, setIsConnected] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // WebSocket connection management
  useEffect(() => {
    ws.current = new WebSocket("https://anonymous-backend1-1.onrender.com");

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (isConnected && trigger) {
      joinRoom();
      setTrigger(false);
    }
  }, [trigger, isConnected]);

  const joinRoom = () => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify({ type: "join", room: roomValue }));
      showNotification(`Joined Room: ${roomValue}`);
    }
  };

  const sendMessage = () => {
    if (ws.current && inputMessage.trim() && isConnected) {
      ws.current.send(JSON.stringify({ type: "chat", message: inputMessage.trim() }));
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const showNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000); // Notification disappears after 3 seconds
  };

  const handleEmojiClick = (emojiObject: any) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex h-screen bg-black bg-opacity-90 text-gray-300 overflow-hidden font-grotesk">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        roomNumber={roomValue}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 bg-opacity-20 backdrop-blur-md">
        <Header
          title="Anonymous"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <ChatArea ref={chatRef} messages={messages} />
        <InputArea
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSend={sendMessage}
          onKeyDown={handleKeyDown}
          onEmojiToggle={() => setShowEmojiPicker(!showEmojiPicker)}
        />
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 shadow-md"
          >
            {notification}
          </div>
        ))}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-28 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

const Sidebar = ({
  isOpen,
  onClose,
  roomNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  roomNumber: string;
}) => {
  const menuItems = [
    { label: "Play Games", icon: <Gamepad />, badge: "Soon" },
    { label: "Show Online", icon: <Eye /> },
    { label: "Voice Send", icon: <Voicemail />, badge: "Soon" },
    { label: "Play the Dare", icon: <Flame />, badge: "Soon" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-70 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative md:w-80 lg:w-96 flex flex-col backdrop-blur-lg`}
    >
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-blue-400">
          <span className="text-white">Chit</span> Chat
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-blue-400 md:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-lg text-white">Room: {roomNumber}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">
          <span className="text-white">What's </span>Cooking
        </h3>
        <div className="space-y-4">
          {menuItems.map(({ label, icon, badge }, index) => (
            <button
              key={index}
              className="w-full flex items-center text-white hover:text-blue-400 hover:bg-gray-800 transition-all duration-300 rounded-lg text-lg py-4 px-4"
            >
              <div className="h-6 w-6 mr-4 text-gray-400">{icon}</div>
              {label}
              {badge && (
                <span className="ml-auto text-sm bg-blue-500 px-3 py-1 rounded-full">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = ({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) => (
  <div className="flex items-center justify-between p-6 bg-black bg-opacity-50 border-b border-gray-800">
    <h1 className="text-2xl font-bold text-blue-400">{title}!</h1>
    <button
      onClick={onMenuClick}
      className="text-gray-400 hover:text-blue-400 md:hidden"
    >
      <MoreVertical className="h-6 w-6" />
    </button>
  </div>
);

const ChatArea = React.forwardRef<HTMLDivElement, { messages: string[] }>(
  ({ messages }, ref) => (
    <div
      ref={ref}
      className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar"
    >
      {messages.map((msg, index) => (
        <div key={index} className="flex items-start space-x-4">
          <span className="text-blue-400 font-semibold">User</span>
          <div className="bg-blue-900 bg-opacity-30 text-white rounded-lg p-4 max-w-2xl">
            <p className="text-lg">{msg}</p>
          </div>
        </div>
      ))}
    </div>
  )
);

const InputArea = ({
  inputMessage,
  setInputMessage,
  onSend,
  onKeyDown,
  onEmojiToggle,
}: {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEmojiToggle: () => void;
}) => (
  <div className="p-6 bg-black bg-opacity-50 border-t border-gray-800">
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 bg-gray-800 bg-opacity-50 text-gray-300 placeholder-gray-500 focus:ring-blue-500 text-lg py-4 px-4 rounded-lg"
      />
      <button
        onClick={onEmojiToggle}
        className="text-gray-400 hover:text-blue-400"
      >
        😀
      </button>
      <button
        className="text-gray-400 hover:text-blue-400 relative"
        title="Speak - Coming Soon"
      >
        <Mic className="h-6 w-6" />
      </button>
      <button
        className="text-gray-400 hover:text-blue-400 relative"
        title="Upload - Coming Soon"
      >
        <Upload className="h-6 w-6" />
      </button>
      <button
        onClick={onSend}
        className="bg-blue-600 bg-opacity-50 hover:bg-opacity-75 px-6 py-3 rounded-lg"
      >
        <Send className="h-6 w-6 text-white" />
      </button>
    </div>
  </div>
);
