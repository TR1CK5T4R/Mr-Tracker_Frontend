import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Body() {
    const navigate = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const features = [
        {
            icon: '✓',
            title: 'Smart Todo Lists',
            description: 'Organize tasks by priority and track your progress effortlessly',
            color: '#ff7b54'
        },
        {
            icon: '🎯',
            title: 'Habit Tracking',
            description: 'Build better habits with daily check-ins and streak tracking',
            color: '#4a90e2'
        },
        {
            icon: '🤖',
            title: 'AI Assistant',
            description: 'Get personalized suggestions to boost your productivity',
            color: '#8b7355'
        }
    ];

    return (
        <main style={{ background: 'var(--bg-primary)' }}>
            {/* Hero Section */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '5rem 1.5rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.1',
                    animation: 'fadeInUp 0.6s ease-out'
                }}>
                    Stay organized,<br />one task at a time
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2.5rem',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    animation: 'fadeInUp 0.6s ease-out 0.2s both'
                }}>
                    Simple task management and habit tracking, powered by AI to help you stay productive
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    animation: 'fadeInUp 0.6s ease-out 0.4s both'
                }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '1rem 2.5rem',
                            background: 'linear-gradient(135deg, var(--accent-primary), #ff6b3d)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            boxShadow: '0 8px 20px rgba(255, 123, 84, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px) scale(1.02)';
                            e.target.style.boxShadow = '0 12px 28px rgba(255, 123, 84, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 8px 20px rgba(255, 123, 84, 0.3)';
                        }}
                    >
                        Start Tracking →
                    </button>

                    <button
                        onClick={() => navigate('/todos')}
                        style={{
                            padding: '1rem 2.5rem',
                            background: 'white',
                            color: 'var(--accent-primary)',
                            border: '2px solid var(--accent-primary)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--accent-primary)';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px) scale(1.02)';
                            e.target.style.boxShadow = '0 8px 20px rgba(255, 123, 84, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = 'var(--accent-primary)';
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        View Todos
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 1.5rem'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    color: 'var(--text-primary)'
                }}>
                    Everything you need
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: hoveredFeature === index
                                    ? '0 20px 40px rgba(0,0,0,0.12)'
                                    : 'var(--shadow-sm)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: hoveredFeature === index
                                    ? 'translateY(-8px) scale(1.02)'
                                    : 'translateY(0) scale(1)',
                                cursor: 'pointer',
                                borderLeft: `4px solid ${hoveredFeature === index ? feature.color : 'transparent'}`,
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}30)`,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.75rem',
                                marginBottom: '1.5rem',
                                transition: 'all 0.3s ease',
                                transform: hoveredFeature === index ? 'rotate(10deg) scale(1.1)' : 'rotate(0) scale(1)'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                marginBottom: '0.75rem',
                                transition: 'color 0.3s ease',
                                color: hoveredFeature === index ? feature.color : 'var(--text-primary)'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                fontSize: '1.05rem'
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--accent-primary), #ff6b3d)',
                padding: '4rem 1.5rem',
                marginTop: '4rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: 'white',
                        marginBottom: '1.5rem'
                    }}>
                        Ready to boost your productivity?
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '2rem'
                    }}>
                        Join thousands of users who organize their lives better every day
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '1.25rem 3rem',
                            background: 'white',
                            color: 'var(--accent-primary)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px) scale(1.05)';
                            e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                        }}
                    >
                        Get Started Free
                    </button>
                </div>
            </section>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    );
}

export default Body;