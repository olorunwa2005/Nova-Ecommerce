import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import api from '../../utils/api';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm Nova, your AI shopping assistant. How can I help you discover the perfect products today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            const data = await api.post('/ai/chat', { message: currentInput });
            const aiMessage = { role: 'assistant', text: data.reply };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat AI failed:', error);
            // Fallback for demo
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "I'm having a bit of trouble connecting to my neural link right now, but I'm still here to help! What else would you like to know?"
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-100">
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-linear-to-tr from-diamond to-diamond-dark text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative"
            >
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-[400px] h-[600px] glass bg-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-navy text-white flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-diamond rounded-full flex items-center justify-center">
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Nova Assistant</h3>
                                    <div className="flex items-center space-x-1.5 opacity-60 text-xs">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span>Always active</span>
                                    </div>
                                </div>
                            </div>
                            <Sparkles className="text-diamond" size={20} />
                        </div>

                        {/* Messages Area */}
                        <div className="grow overflow-y-auto p-6 space-y-6">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === 'user'
                                        ? 'bg-diamond text-white rounded-tr-none shadow-lg shadow-diamond/20'
                                        : 'bg-white text-navy rounded-tl-none border border-navy/5 shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-6 bg-white border-t border-navy/5">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask Nova anything..."
                                    className="w-full bg-navy/5 border-none rounded-full px-6 py-4 pr-14 focus:ring-4 focus:ring-diamond/10 outline-none font-medium placeholder-navy/30"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 p-3 bg-diamond text-white rounded-full hover:bg-diamond-dark transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-navy/20 mt-4 uppercase font-bold tracking-widest">Powered by Nova AI Engine</p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatbot;
