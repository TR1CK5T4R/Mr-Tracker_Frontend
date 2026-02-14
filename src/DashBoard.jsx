import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [todosRes, habitsRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/todos`),
                fetch(`${import.meta.env.VITE_API_URL}/habits`)
            ]);

            const todosData = await todosRes.json();
            const habitsData = await habitsRes.json();

            if (todosData.success) setTodos(todosData.data);
            if (habitsData.success) setHabits(habitsData.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const completedTodos = todos.filter(t => t.completed).length;
    const pendingTodos = todos.filter(t => !t.completed).length;
    const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
    const activeHabits = habits.filter(h => h.streak > 0).length;

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                {greeting()} 👋
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                                Here's what's happening today
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <button
                                onClick={() => navigate('/todos')}
                                style={{
                                    padding: '0.7rem 1.5rem',
                                    background: 'white',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    fontSize: '0.95rem',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                Tasks
                            </button>
                            <button
                                onClick={() => navigate('/habits')}
                                style={{
                                    padding: '0.7rem 1.5rem',
                                    background: 'white',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    fontSize: '0.95rem',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                Habits
                            </button>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        Loading your dashboard...
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>

                        {/* Stats Overview */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                            <div style={{
                                background: 'white',
                                padding: '1.75rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-md)',
                                borderTop: '4px solid var(--accent-primary)'
                            }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tasks</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{todos.length}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    {completedTodos} completed, {pendingTodos} pending
                                </div>
                            </div>

                            <div style={{
                                background: 'white',
                                padding: '1.75rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-md)',
                                borderTop: '4px solid var(--accent-secondary)'
                            }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Habits</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{habits.length}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    {activeHabits} with active streaks
                                </div>
                            </div>

                            <div style={{
                                background: 'white',
                                padding: '1.75rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-md)',
                                borderTop: '4px solid var(--accent-success)'
                            }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Streak</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{totalStreak}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    days combined 🔥
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>

                            {/* Pending Tasks */}
                            <div style={{
                                background: 'white',
                                padding: '1.75rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>Pending Tasks</h3>
                                    <button
                                        onClick={() => navigate('/todos')}
                                        style={{
                                            padding: '0.45rem 1rem',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: 'var(--radius-sm)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.85rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        View All
                                    </button>
                                </div>

                                {pendingTodos === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
                                        <p>All caught up!</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {todos.filter(t => !t.completed).slice(0, 4).map(todo => (
                                            <div key={todo._id} style={{
                                                padding: '1rem',
                                                background: 'var(--bg-secondary)',
                                                borderRadius: 'var(--radius-md)',
                                                borderLeft: `3px solid ${todo.priority === 'high' ? '#dc2626' :
                                                    todo.priority === 'medium' ? '#f59e0b' : '#10b981'
                                                    }`
                                            }}>
                                                <div style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                                    {todo.title}
                                                </div>
                                                {todo.dueDate && (
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                        Due: {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {pendingTodos > 4 && (
                                            <div style={{ textAlign: 'center', padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                +{pendingTodos - 4} more
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Active Habits */}
                            <div style={{
                                background: 'white',
                                padding: '1.75rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>Your Habits</h3>
                                    <button
                                        onClick={() => navigate('/habits')}
                                        style={{
                                            padding: '0.45rem 1rem',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: 'var(--radius-sm)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.85rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        View All
                                    </button>
                                </div>

                                {habits.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
                                        <p>Start a new habit</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {habits.slice(0, 4).map(habit => (
                                            <div key={habit._id} style={{
                                                padding: '1rem',
                                                background: 'var(--bg-secondary)',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                                                    {habit.name}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ fontSize: '1.1rem', fontWeight: '700', color: habit.streak > 0 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                                                        {habit.streak}
                                                    </span>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🔥</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* AI Assistant CTA */}
                        <div style={{
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            padding: '2.5rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: 'white' }}>
                                Need help organizing?
                            </h3>
                            <p style={{ fontSize: '1rem', marginBottom: '1.5rem', opacity: '0.95' }}>
                                Chat with our AI assistant for personalized productivity advice
                            </p>
                            <button
                                onClick={() => navigate('/chatbot')}
                                style={{
                                    padding: '0.9rem 2.5rem',
                                    background: 'white',
                                    color: 'var(--accent-primary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                Talk to AI Assistant
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;