import React, { useState } from 'react';
import { Send, Bot, User, Lightbulb, Heart, Apple, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const AICoachInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { coachMessages, addCoachMessage } = useStore();

  const quickSuggestions = [
    { text: "What should I eat for breakfast?", category: "nutrition" },
    { text: "Create a workout plan for today", category: "fitness" },
    { text: "How can I improve my sleep?", category: "health" },
    { text: "I'm feeling stressed, help me", category: "wellness" },
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    addCoachMessage({
      id: Date.now().toString(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date(),
    });

    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current health metrics and goals, I recommend focusing on protein-rich foods for breakfast. Your heart rate has been slightly elevated, so let's also discuss stress management techniques.",
        "I've analyzed your recent activity patterns. Here's a personalized workout plan that aligns with your muscle gain goals while considering your current fitness level.",
        "Your sleep data shows some irregularities. Let me suggest a few evidence-based strategies to improve your sleep quality and duration.",
        "I understand you're feeling stressed. Let's work on some breathing exercises and lifestyle adjustments that can help manage your stress levels effectively.",
      ];

      addCoachMessage({
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "Create a detailed plan",
          "Set reminders for this",
        ],
      });

      setIsTyping(false);
    }, 2000);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AI Health Coach</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">AI Assistant Online</span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {coachMessages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Welcome to your AI Health Coach!
              </h3>
              <p className="text-gray-600">
                I'm here to help you with nutrition, fitness, and wellness guidance based on your personal health data.
              </p>
            </div>
          )}

          <AnimatePresence>
            {coachMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    msg.type === 'user' ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    {msg.type === 'user' ? (
                      <User className="h-4 w-4 text-primary-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    {msg.suggestions && (
                      <div className="mt-2 space-y-1">
                        {msg.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickSuggestion(suggestion)}
                            className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-2 py-1 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your health, nutrition, or fitness..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>Quick Suggestions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickSuggestions.map((suggestion, index) => {
            const icons = {
              nutrition: Apple,
              fitness: Dumbbell,
              health: Heart,
              wellness: Bot,
            };
            const Icon = icons[suggestion.category as keyof typeof icons] || Bot;

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickSuggestion(suggestion.text)}
                className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
              >
                <Icon className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-700">{suggestion.text}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};