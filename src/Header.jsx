import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Todos', path: '/todos' },
        { label: 'Habits', path: '/habits' },
        { label: 'AI Chat', path: '/chatbot' }
    ];

    return (
        <header style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--border-light)',
            background: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        boxShadow: '0 4px 12px rgba(255, 123, 84, 0.3)',
                        transition: 'all 0.3s ease'
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

                {/* Navigation */}
                <nav style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                }}>
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            style={{
                                padding: '0.65rem 1.2rem',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'var(--bg-secondary)';
                                e.target.style.color = 'var(--accent-primary)';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = 'var(--text-secondary)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* CTA Button */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '0.75rem 1.75rem',
                            background: 'linear-gradient(135deg, var(--accent-primary), #ff6b3d)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            marginLeft: '0.5rem',
                            boxShadow: '0 4px 12px rgba(255, 123, 84, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px) scale(1.05)';
                            e.target.style.boxShadow = '0 8px 20px rgba(255, 123, 84, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 4px 12px rgba(255, 123, 84, 0.3)';
                        }}
                    >
                        Get Started →
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;