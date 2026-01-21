"use client";

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHabits } from '@/context/HabitContext';
import { Frequency } from '@/lib/types';

interface AddHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddHabitModal({ isOpen, onClose }: AddHabitModalProps) {
    const { addHabit } = useHabits();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState<Frequency>('daily');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        addHabit({
            title,
            description,
            frequency,
            color: 'blue', // Default for now
            archived: false
        });

        // Reset and close
        setTitle('');
        setDescription('');
        setFrequency('daily');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Habit">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Habit Title</label>
                    <Input
                        placeholder="e.g. Drink Water"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description (Optional)</label>
                    <Input
                        placeholder="Why do you want to build this habit?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Frequency</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as Frequency)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Create Habit</Button>
                </div>
            </form>
        </Modal>
    );
}
