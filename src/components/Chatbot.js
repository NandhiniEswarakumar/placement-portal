import React, { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Career Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    'Help with resume',
    'Interview tips',
    'Job search',
    'Skill development'
  ];

  const botResponses = {
    'help with resume': 'I can help you create an ATS-friendly resume! Visit the Student Dashboard to upload and optimize your resume.',
    'interview tips': 'Great! Check out our Interview Preparation section for common questions, tips, and mock interview practice.',
    'job search': 'Looking for jobs? Browse our Jobs page to find the latest opportunities matching your skills!',
    'skill development': 'Enhance your skills with our Skills Training section. We offer courses in various technologies and soft skills.',
    'default': 'I understand you need help. You can explore our dashboard for resume building, interview prep, skills training, and job opportunities. What specific area interests you?'
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);

      setTimeout(() => {
        const botResponse = getBotResponse(inputValue.toLowerCase());
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 500);

      setInputValue('');
    }
  };

  const getBotResponse = (message) => {
    for (let key in botResponses) {
      if (message.includes(key)) {
        return botResponses[key];
      }
    }
    return botResponses['default'];
  };

  const handleQuickReply = (reply) => {
    const userMessage = { text: reply, sender: 'user' };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = getBotResponse(reply.toLowerCase());
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-title">
                <FaComments />
                <span>AI Career Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button 
                  key={index} 
                  onClick={() => handleQuickReply(reply)}
                  className="quick-reply-btn"
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
              />
              <button onClick={handleSend} className="send-btn">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
      </div>

      <button 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <FaComments />
      </button>
    </>
  );
};

export default Chatbot;
