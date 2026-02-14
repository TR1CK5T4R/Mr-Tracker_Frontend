import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    const footerLinks = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Todos', path: '/todos' },
        { label: 'Habits', path: '/habits' },
        { label: 'AI Chat', path: '/chatbot' }
    ];

    return (
        <footer style={{
            background: 'linear-gradient(to bottom, white, var(--bg-secondary))',
            borderTop: '1px solid var(--border-light)',
            padding: '4rem 1.5rem 2rem',
            marginTop: '4rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Logo and Description */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease'
                    }}
                        onClick={() => navigate('/')}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{
                            width: '42px',
                            height: '42px',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.3rem',
                            boxShadow: '0 4px 12px rgba(255, 123, 84, 0.3)'
                        }}>
                            ✓
                        </div>
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontFamily: 'Playfair Display, serif'
                        }}>
                            MrTracker
                        </span>
                    </div>

                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.05rem',
                        marginBottom: '2rem',
                        maxWidth: '500px',
                        margin: '0 auto 2rem'
                    }}>
                        Simple task management and habit tracking to help you stay organized and productive
                    </p>

                    {/* Quick Links */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        {footerLinks.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(link.path)}
                                style={{
                                    padding: '0.65rem 1.5rem',
                                    background: 'white',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'var(--accent-primary)';
                                    e.target.style.color = 'white';
                                    e.target.style.borderColor = 'var(--accent-primary)';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(255, 123, 84, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'white';
                                    e.target.style.color = 'var(--text-secondary)';
                                    e.target.style.borderColor = 'var(--border-light)';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    height: '1px',
                    background: 'var(--border-light)',
                    marginBottom: '2rem'
                }} />

                {/* Bottom Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        margin: 0
                    }}>
                        © 2024 MrTracker. Made with ❤️ for better productivity.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem'
                    }}>
                        {['Privacy', 'Terms', 'Contact'].map((item, index) => (
                            <span
                                key={index}
                                style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'var(--accent-primary)';
                                    e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = 'var(--text-muted)';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;