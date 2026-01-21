"use client";

import React, { useState } from 'react';
import { useHabits } from '@/context/HabitContext';
import { HabitCard } from './HabitCard';
import { AddHabitModal } from './AddHabitModal';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export function HabitList() {
    const { habits } = useHabits();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sort: Incomplete first, then by streak desc
    // Just a simple sort for now
    const sortedHabits = [...habits].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Habits</h1>
                    <p className="text-muted-foreground">Track your daily consistency and build streaks.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                    <Icons.add className="h-4 w-4" /> New Habit
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedHabits.map((habit) => (
                    <HabitCard key={habit.id} habit={habit} />
                ))}

                {habits.length === 0 && (
                    <div className="col-span-full py-12 text-center border rounded-lg border-dashed text-muted-foreground">
                        <p>No habits yet. Start by creating one!</p>
                    </div>
                )}
            </div>

            <AddHabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
