'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onFinish: () => setIsLoading(false),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      sendMessage({
        parts: [{ type: 'text', text: input }],
      });
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 智能助手
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">由 Qwen3-Coder 驱动</p>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                👋 欢迎使用 AI 智能助手
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                我是您的专属 AI 助手，随时为您解答问题
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-2xl mb-2">💡</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">智能问答</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-2xl mb-2">🔧</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">编程助手</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-2xl mb-2">📝</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">文档生成</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                      : 'bg-gradient-to-r from-purple-400 to-pink-500'
                  }`}>
                    {message.role === 'user' ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500/20'
                        : 'bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    {message.parts.map((part, partIndex) => {
                      if (part.type === 'text') {
                        return (
                          <div key={`${message.id}-text-${partIndex}`} className="whitespace-pre-wrap leading-relaxed">
                            {part.text}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 px-4 py-3 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">AI 正在思考...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="输入消息按回车发送..."
                disabled={isLoading}
                className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-all duration-300 shadow-lg backdrop-blur-sm"
              />
              {input && (
                <button
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
