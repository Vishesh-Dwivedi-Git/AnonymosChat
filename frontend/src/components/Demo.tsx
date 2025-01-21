import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function Demo() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hey there! Welcome to the anonymous chat. How's your day going?", sender: 'bot' },
    { text: "Hi! Thanks for asking. It's been pretty good. How about yours?", sender: 'user' },
    { text: "Not bad at all. I love how we can chat freely here without any pressure!", sender: 'bot' },
    { text: "It's refreshing to have a space where we can be ourselves.", sender: 'user' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section className="py-16 font-grotesk bg-opacity-10 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Take a Demo</h2>
        <div className="bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-700">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-[70%] ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 self-end text-white' 
                    : 'bg-gray-800 text-gray-300 self-start'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow bg-transparent border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
              onClick={handleSendMessage}
            >
              Send <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
