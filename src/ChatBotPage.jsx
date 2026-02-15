import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatbotPage() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: 'Hi! I\'m here to help you stay organized and productive. Ask me anything about managing your tasks or building better habits.',
            avatar: true
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputMessage
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();

            const aiMessage = {
                id: messages.length + 2,
                type: 'ai',
                text: data.reply || data.error || 'Sorry, I couldn\'t process that request.',
                avatar: true
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error connecting to backend:", error);
            const errorMessage = {
                id: messages.length + 2,
                type: 'ai',
                text: 'I\'m having trouble connecting right now. Please make sure the backend is running.',
                avatar: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => {
        sendMessage();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
                background: 'white',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                            🤖 AI Assistant
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Your personal productivity coach
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={() => navigate('/todos')}
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: 'white',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}
                        >
                            Tasks
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: 'var(--accent-primary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
            </header>

            {/* Chat Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 1rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'start',
                                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            {message.type === 'ai' && (
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    flexShrink: 0
                                }}>
                                    🤖
                                </div>
                            )}
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '1rem 1.25rem',
                                    background: message.type === 'user' ? 'var(--accent-primary)' : 'white',
                                    color: message.type === 'user' ? 'white' : 'var(--text-primary)',
                                    borderRadius: message.type === 'user'
                                        ? '18px 18px 4px 18px'
                                        : '18px 18px 18px 4px',
                                    boxShadow: 'var(--shadow-sm)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6'
                                }}
                            >
                                {message.text}
                            </div>
                            {message.type === 'user' && (
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    flexShrink: 0,
                                    color: 'white'
                                }}>
                                    👤
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                flexShrink: 0
                            }}>
                                🤖
                            </div>
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: 'white',
                                borderRadius: '18px 18px 18px 4px',
                                boxShadow: 'var(--shadow-sm)',
                                color: 'var(--text-muted)'
                            }}>
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div style={{
                background: 'white',
                borderTop: '1px solid var(--border-light)',
                padding: '1.5rem',
                boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'end' }}>
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        rows="1"
                        style={{
                            flex: 1,
                            padding: '0.9rem 1.2rem',
                            border: '2px solid var(--border-light)',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '0.95rem',
                            resize: 'none',
                            fontFamily: 'inherit',
                            lineHeight: '1.5',
                            minHeight: '48px',
                            maxHeight: '120px'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputMessage.trim() || loading}
                        style={{
                            padding: '0.9rem 2rem',
                            background: inputMessage.trim() && !loading ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                            color: inputMessage.trim() && !loading ? 'white' : 'var(--text-muted)',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            cursor: inputMessage.trim() && !loading ? 'pointer' : 'not-allowed',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatbotPage;