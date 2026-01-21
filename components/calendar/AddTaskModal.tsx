"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodos } from '@/context/TodoContext';
import { format } from 'date-fns';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultDate?: Date;
}

export function AddTaskModal({ isOpen, onClose, defaultDate = new Date() }: AddTaskModalProps) {
    const { addTodo } = useTodos();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

    useEffect(() => {
        if (isOpen) {
            setDueDate(format(defaultDate, 'yyyy-MM-dd'));
        }
    }, [isOpen, defaultDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTodo({
            title,
            dueDate,
            priority,
            tags: [],
        });

        setTitle('');
        setPriority('medium');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Task Title</label>
                    <Input
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Due Date</label>
                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Priority</label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as any)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add Task</Button>
                </div>
            </form>
        </Modal>
    );
}
