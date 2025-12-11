import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import telegramMessages from '../assets/messages.json';
import Fuse from 'fuse.js';

// Initialize Gemini API
// NOTE: for production, use a backend to hide the key. For this demo, we use an env var.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Shubhashish! I am Anil Sir's AI avatar. Ask me about your UPSC/BPSC preparation strategy or recent updates.", sender: 'bot' }
    ]);
    const messagesEndRef = useRef(null);

    // Setup Fuse for RAG (Retrieval Augmented Generation)
    // We Map strings to objects for better Fuse handling
    const formattedData = telegramMessages.map(m => ({ content: m }));
    const fuse = new Fuse(formattedData, {
        keys: ['content'],
        threshold: 0.6,
        distance: 200,
        limit: 3 // Retrieve top 3 relevant messages
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = async (userQuery) => {
        if (!API_KEY) {
            return "Error: Gemini API Key is missing in the environment variables (VITE_GEMINI_API_KEY). Please configure it to chat.";
        }

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

            // 1. Retrieve Context
            const searchResults = fuse.search(userQuery);
            const contextDocs = searchResults.map(r => r.item.content).join("\n\n");

            // 2. Construct System Prompt & User Prompt
            const prompt = `
            You are Anil Kumar Sir, the founder and director of "Anil's Prayas", a prestigious IAS/BPSC coaching institute in Patna since 1993.
            
            **Your Persona:**
            - **Tone**: Fatherly, authoritative, encouraging, and strict when needed.
            - **Language**: Mix of Hindi and English (Hinglish), typical of educated Bihar dialect. Use words like "Beta" (Son/Child), "Dhairya" (Patience), "Ran-neeti" (Strategy).
            - **Signature**: Often end messages with "Shubhashish" (Blessings) or "Aapka Anil Sir".
            - **Philosophy**: You believe Hindi medium students can top exams with the right guidance. You hate rote learning; you prefer analytical thinking.
            
            **Context form Institute Notices (Use this if relevant):**
            ${contextDocs}

            **User Question:**
            ${userQuery}

            **Task:**
            Answer the user's question in your unique persona. If the context has the answer (like batch dates or results), use it. If not, give general advice based on your experience as a mentor (Science College Alumnus, NET/SET qualified). Keep it concise (under 3 sentences usually).
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();

        } catch (error) {
            console.error("Gemini Error:", error);
            return `Technical glitch! (Error: ${error.message || error})`;
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Call Gemini
        const botReplyText = await generateResponse(input);

        setMessages(prev => [...prev, { text: botReplyText, sender: 'bot' }]);
        setIsLoading(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn-primary"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    borderRadius: '50%',
                    width: '3.5rem',
                    height: '3.5rem',
                    padding: 0,
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 100
                }}
            >
                {isOpen ? <X /> : <MessageCircle />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="glass" style={{
                    position: 'fixed',
                    bottom: '6rem',
                    right: '2rem',
                    width: '350px',
                    height: '500px',
                    borderRadius: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 100,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    border: '1px solid var(--primary-light)'
                }}>
                    {/* Header */}
                    <div style={{ padding: '1rem', background: 'var(--primary)', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Anil Sir (AI Mentor)</span>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.sender === 'user' ? 'var(--primary-light)' : 'rgba(255,255,255,0.1)',
                                color: 'white',
                                padding: '0.8rem',
                                borderRadius: '0.8rem',
                                maxWidth: '85%',
                                borderBottomRightRadius: msg.sender === 'user' ? '0' : '0.8rem',
                                borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '0.8rem',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '0.8rem' }}>
                                <Loader2 className="animate-spin" size={20} color="var(--accent)" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--glass-border)' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Beta, ask your question..."
                            disabled={isLoading}
                            style={{
                                flex: 1,
                                padding: '0.5rem 1rem',
                                borderRadius: '99px',
                                border: 'none',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button onClick={handleSend} disabled={isLoading} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}>
                            <Send />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
