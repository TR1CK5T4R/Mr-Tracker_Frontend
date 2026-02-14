import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HabitTracker() {
    const navigate = useNavigate();
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({
        name: '',
        description: '',
        frequency: 'daily',
    });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const API_URL = `${import.meta.env.VITE_API_URL}/habits`;

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) {
                setHabits(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching habits:', error);
            setLoading(false);
        }
    };

    const addHabit = async (e) => {
        e.preventDefault();
        if (!newHabit.name.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newHabit),
            });
            const data = await response.json();
            if (data.success) {
                setHabits([...habits, data.data]);
                setNewHabit({ name: '', description: '', frequency: 'daily' });
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error adding habit:', error);
        }
    };

    const checkIn = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}/checkin`, {
                method: 'POST',
            });
            const data = await response.json();
            if (data.success) {
                setHabits(habits.map(habit => habit._id === id ? data.data : habit));
            } else {
                alert(data.error || 'Already checked in today!');
            }
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    const deleteHabit = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setHabits(habits.filter(habit => habit._id !== id));
            }
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    const getStreakColor = (streak) => {
        if (streak >= 30) return '#8b7355';
        if (streak >= 14) return '#d97757';
        if (streak >= 7) return '#6b9080';
        return '#9a9a9a';
    };

    const isCheckedInToday = (habit) => {
        if (!habit.lastCheckIn) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastCheckIn = new Date(habit.lastCheckIn);
        lastCheckIn.setHours(0, 0, 0, 0);
        return today.getTime() === lastCheckIn.getTime();
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                🎯 Habits
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                Build consistency, one day at a time
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={() => navigate('/todos')}
                                style={{
                                    padding: '0.65rem 1.25rem',
                                    background: 'white',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                Tasks
                            </button>
                            <button
                                onClick={() => navigate('/chatbot')}
                                style={{
                                    padding: '0.65rem 1.25rem',
                                    background: 'var(--accent-primary)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                AI Assistant
                            </button>
                        </div>
                    </div>
                </header>

                {/* Add Habit Button / Form */}
                {!showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            background: 'white',
                            border: '2px dashed var(--border-light)',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--text-secondary)',
                            fontSize: '1rem',
                            fontWeight: '500',
                            marginBottom: '2rem',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = 'var(--accent-primary)';
                            e.target.style.color = 'var(--accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = 'var(--border-light)';
                            e.target.style.color = 'var(--text-secondary)';
                        }}
                    >
                        + New Habit
                    </button>
                ) : (
                    <form onSubmit={addHabit} style={{
                        background: 'white',
                        padding: '1.75rem',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: '2rem',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Habit name (e.g., Morning run, Read for 30 min)"
                                value={newHabit.name}
                                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1rem',
                                    border: '2px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem',
                                    marginBottom: '0.75rem'
                                }}
                                required
                                autoFocus
                            />
                            <textarea
                                placeholder="Why is this important? (optional)"
                                value={newHabit.description}
                                onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                                rows="2"
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1rem',
                                    border: '2px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
                            <select
                                value={newHabit.frequency}
                                onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                                style={{
                                    padding: '0.65rem 1rem',
                                    border: '2px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    background: 'white'
                                }}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    style={{
                                        padding: '0.65rem 1.5rem',
                                        background: 'transparent',
                                        border: '2px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.65rem 2rem',
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    Start Habit
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Habits Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        Loading habits...
                    </div>
                ) : habits.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>No habits yet</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Start tracking a new habit to build consistency</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                        {habits.map((habit) => {
                            const checkedToday = isCheckedInToday(habit);
                            return (
                                <div
                                    key={habit._id}
                                    style={{
                                        background: 'white',
                                        padding: '1.75rem',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-md)',
                                        position: 'relative',
                                        border: checkedToday ? '2px solid var(--accent-success)' : '1px solid var(--border-light)'
                                    }}
                                >
                                    <button
                                        onClick={() => deleteHabit(habit._id)}
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            padding: '0.4rem',
                                            color: 'var(--text-muted)',
                                            fontSize: '1.4rem',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'transparent',
                                            lineHeight: '1'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'rgba(0,0,0,0.05)';
                                            e.target.style.color = '#dc2626';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'transparent';
                                            e.target.style.color = 'var(--text-muted)';
                                        }}
                                    >
                                        ×
                                    </button>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif', fontWeight: '600', paddingRight: '2rem' }}>
                                            {habit.name}
                                        </h3>
                                        {habit.description && (
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                                {habit.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Streak Display */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: '1.25rem'
                                    }}>
                                        <div style={{ fontSize: '2rem' }}>🔥</div>
                                        <div>
                                            <div style={{
                                                fontSize: '2rem',
                                                fontWeight: '700',
                                                color: getStreakColor(habit.streak),
                                                lineHeight: '1'
                                            }}>
                                                {habit.streak}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                                day streak
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                                                {habit.completions.length}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                total
                                            </div>
                                        </div>
                                    </div>

                                    {/* Check-in Button */}
                                    <button
                                        onClick={() => !checkedToday && checkIn(habit._id)}
                                        disabled={checkedToday}
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem',
                                            background: checkedToday ? 'var(--accent-success)' : 'var(--accent-primary)',
                                            color: 'white',
                                            borderRadius: 'var(--radius-md)',
                                            fontWeight: '600',
                                            fontSize: '0.95rem',
                                            cursor: checkedToday ? 'default' : 'pointer',
                                            opacity: checkedToday ? '0.8' : '1'
                                        }}
                                        onMouseEnter={(e) => !checkedToday && (e.target.style.background = 'var(--accent-secondary)')}
                                        onMouseLeave={(e) => !checkedToday && (e.target.style.background = 'var(--accent-primary)')}
                                    >
                                        {checkedToday ? '✓ Done Today' : 'Check In'}
                                    </button>

                                    {habit.lastCheckIn && (
                                        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            Last: {new Date(habit.lastCheckIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HabitTracker;
