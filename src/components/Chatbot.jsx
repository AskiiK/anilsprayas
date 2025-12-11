import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
// Import messages. If strict mode complains about json import, Vite handles it by default.
import telegramMessages from '../assets/messages.json';
import Fuse from 'fuse.js';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Namaste! I am Anil Sir's digital assistant. Ask me about exam preparation, strategy, or recent updates.", sender: 'bot' }
    ]);
    const messagesEndRef = useRef(null);

    const fuse = new Fuse(telegramMessages, {
        keys: [], // array of strings, so keys is empty or just check the item itself
        threshold: 0.4,
        distance: 100
    });
    // Since telegramMessages is an array of strings, Fuse setup might need adjustment.
    // Fuse with array of strings: just pass the array.

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);

        // Simulate thinking
        setTimeout(() => {
            // Simple search
            // fuse.js for array of strings needs specific config or just map to objects. 
            // Mapping to objects is safer:
            const formattedData = telegramMessages.map(m => ({ content: m }));
            const fuseInstance = new Fuse(formattedData, {
                keys: ['content'],
                threshold: 0.5,
            });

            const results = fuseInstance.search(input);
            let botResponse = "I couldn't find a specific quote from Anil Sir on that. Please check the YouTube channel or Telegram for the latest updates.";

            if (results.length > 0) {
                // Pick the best match
                const bestMatch = results[0].item.content;

                // Templates to make it sound like an agent referencing Anil Sir
                const templates = [
                    `Anil Sir has mentioned: "${bestMatch}"`,
                    `Regarding this, Sir often advises: "${bestMatch}"`,
                    `In a recent update, Anil Sir said: "${bestMatch}"`,
                    `Here is what Sir has to say: "${bestMatch}"`
                ];

                // Randomly select a template
                botResponse = templates[Math.floor(Math.random() * templates.length)];
            } else {
                // Fallback simple keyword match if fuse fails or is too strict
                const keywords = input.toLowerCase().split(' ');
                const match = telegramMessages.find(m => keywords.some(k => k.length > 3 && m.toLowerCase().includes(k)));
                if (match) {
                    botResponse = `I found a relevant update from Sir: "${match}"`;
                }
            }

            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 600);

        setInput('');
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
                    <div style={{ padding: '1rem', background: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
                        Chat with Anil Sir (AI)
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
                                maxWidth: '80%',
                                borderBottomRightRadius: msg.sender === 'user' ? '0' : '0.8rem',
                                borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '0.8rem'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--glass-border)' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your question..."
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
                        <button onClick={handleSend} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                            <Send />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
