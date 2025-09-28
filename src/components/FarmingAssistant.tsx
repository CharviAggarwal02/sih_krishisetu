import React, { useState } from 'react';
import Navbar from './Navbar';
import { Send, Globe } from 'lucide-react';

interface FarmingAssistantProps {
  user: any;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export default function FarmingAssistant({ user, onLogout, onNavigate }: FarmingAssistantProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your farming assistant. How can I help you today?"
    }
  ]);

  const quickQuestions = [
    "How often should I water my crops?",
    "How to control pests naturally?",
    "Best irrigation practices",
    "What fertilizer is best for rice?",
    "When to harvest wheat?",
    "Soil pH management"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { type: 'user', content: message }]);
      setMessage('');
      
      // Simulate assistant response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: "Thank you for your question. Based on your farming data and current conditions, here's my recommendation..."
        }]);
      }, 1000);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    
    // Simulate assistant response
    setTimeout(() => {
      let response = "";
      switch (question) {
        case "How often should I water my crops?":
          response = "For most crops, watering 2-3 times per week is optimal. However, this depends on soil type, weather conditions, and crop variety. Monitor soil moisture levels regularly.";
          break;
        case "How to control pests naturally?":
          response = "Natural pest control methods include: companion planting, neem oil spray, introducing beneficial insects, crop rotation, and maintaining healthy soil with organic matter.";
          break;
        case "Best irrigation practices":
          response = "Best practices include: drip irrigation for water efficiency, early morning watering, mulching to retain moisture, and monitoring soil moisture levels regularly.";
          break;
        case "What fertilizer is best for rice?":
          response = "For rice, use NPK fertilizer with ratio 4:2:1. Apply nitrogen in split doses - 50% at transplanting, 25% at tillering, and 25% at panicle initiation stage.";
          break;
        case "When to harvest wheat?":
          response = "Harvest wheat when moisture content is 12-14%, grains are hard and golden yellow, and the plant makes a rustling sound when shaken. Usually 4-6 months after sowing.";
          break;
        case "Soil pH management":
          response = "Maintain soil pH between 6.0-7.5 for most crops. Use lime to increase pH in acidic soils, and sulfur or organic matter to decrease pH in alkaline soils.";
          break;
        default:
          response = "Thank you for your question. I'll provide you with detailed information based on best farming practices.";
      }
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        onNavigate={onNavigate}
        activeTab="assistant"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Farming Assistant</h1>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Language:</span>
            <select className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>🇺🇸 English</option>
              <option>🇮🇳 Hindi</option>
              <option>🇮🇳 Marathi</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm h-96 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about farming..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Questions</h3>
            <p className="text-gray-600 text-sm mb-4">Click on these common questions to get instant answers</p>
            
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}