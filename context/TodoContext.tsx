"use client";

import React, { createContext, useContext } from 'react';
import { Todo } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
    updateTodo: (id: string, updates: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos_v1', []);

    const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
        const newTodo: Todo = {
            ...todoData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completed: false,
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const updateTodo = (id: string, updates: Partial<Todo>) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}
