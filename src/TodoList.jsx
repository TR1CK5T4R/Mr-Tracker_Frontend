import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
    });
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) {
                setTodos(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.title.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo),
            });
            const data = await response.json();
            if (data.success) {
                setTodos([...todos, data.data]);
                setNewTodo({ title: '', description: '', priority: 'medium', dueDate: '' });
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}/toggle`, {
                method: 'PATCH',
            });
            const data = await response.json();
            if (data.success) {
                setTodos(todos.map(todo => todo._id === id ? data.data : todo));
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setTodos(todos.filter(todo => todo._id !== id));
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true;
    });

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-50 border-l-4 border-red-400 hover:bg-red-100';
            case 'medium': return 'bg-amber-50 border-l-4 border-amber-400 hover:bg-amber-100';
            case 'low': return 'bg-green-50 border-l-4 border-green-400 hover:bg-green-100';
            default: return 'bg-white border-l-4 border-gray-300 hover:bg-gray-50';
        }
    };

    const completedCount = todos.filter(t => t.completed).length;
    const totalCount = todos.length;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                ✓ My Tasks
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                {completedCount} of {totalCount} completed
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={() => navigate('/habits')}
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
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                Habits
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
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                AI Assistant
                            </button>
                        </div>
                    </div>
                </header>

                {/* Add Todo Form */}
                <form onSubmit={addTodo} style={{
                    background: 'white',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '2rem',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTodo.title}
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.9rem 1rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                marginBottom: '0.75rem'
                            }}
                            required
                        />
                        <textarea
                            placeholder="Add details (optional)"
                            value={newTodo.description}
                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
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
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <select
                            value={newTodo.priority}
                            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                            style={{
                                padding: '0.65rem 1rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9rem',
                                background: 'white',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium</option>
                            <option value="high">High Priority</option>
                        </select>
                        <input
                            type="date"
                            value={newTodo.dueDate}
                            onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                            style={{
                                padding: '0.65rem 1rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9rem'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                marginLeft: 'auto',
                                padding: '0.65rem 2rem',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                fontSize: '0.95rem'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'var(--accent-secondary)'}
                            onMouseLeave={(e) => e.target.style.background = 'var(--accent-primary)'}
                        >
                            Add Task
                        </button>
                    </div>
                </form>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                    {['all', 'pending', 'completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: filter === f ? 'var(--accent-primary)' : 'transparent',
                                color: filter === f ? 'white' : 'var(--text-secondary)',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: filter === f ? '600' : '500',
                                fontSize: '0.9rem',
                                textTransform: 'capitalize'
                            }}
                        >
                            {f} {f === 'all' && `(${todos.length})`}
                            {f === 'pending' && `(${todos.filter(t => !t.completed).length})`}
                            {f === 'completed' && `(${completedCount})`}
                        </button>
                    ))}
                </div>

                {/* Todos List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            Loading your tasks...
                        </div>
                    ) : filteredTodos.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                {filter === 'all' ? '🎉 No tasks yet. Add one above!' : `No ${filter} tasks`}
                            </p>
                        </div>
                    ) : (
                        filteredTodos.map((todo) => (
                            <div
                                key={todo._id}
                                className={getPriorityStyles(todo.priority)}
                                style={{
                                    padding: '1.25rem',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: '1rem',
                                    cursor: 'pointer'
                                }}
                                onClick={() => toggleTodo(todo._id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => { }}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginTop: '2px',
                                        cursor: 'pointer',
                                        accentColor: 'var(--accent-success)'
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: '1.05rem',
                                        fontWeight: '600',
                                        marginBottom: '0.25rem',
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                        {todo.title}
                                    </h3>
                                    {todo.description && (
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                            {todo.description}
                                        </p>
                                    )}
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {todo.dueDate && (
                                            <span>📅 {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteTodo(todo._id);
                                    }}
                                    style={{
                                        padding: '0.5rem',
                                        color: 'var(--text-muted)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '1.2rem'
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
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
