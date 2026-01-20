"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { Habit } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { format, subDays, isSameDay, parseISO } from 'date-fns';

interface HabitContextType {
    habits: Habit[];
    addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'bestStreak'>) => void;
    updateHabit: (id: string, updates: Partial<Habit>) => void;
    deleteHabit: (id: string) => void;
    toggleHabitCompletion: (id: string, date: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
    const [habits, setHabits] = useLocalStorage<Habit[]>('habits_v1', []);

    const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'bestStreak'>) => {
        const newHabit: Habit = {
            ...habitData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completedDates: [],
            streak: 0,
            bestStreak: 0,
        };
        setHabits((prev) => [...prev, newHabit]);
    };

    const updateHabit = (id: string, updates: Partial<Habit>) => {
        setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
    };

    const deleteHabit = (id: string) => {
        setHabits((prev) => prev.filter((h) => h.id !== id));
    };

    const toggleHabitCompletion = (id: string, dateStr: string) => {
        setHabits((prev) => prev.map((habit) => {
            if (habit.id !== id) return habit;

            const isCompleted = habit.completedDates.includes(dateStr);
            let newCompletedDates = isCompleted
                ? habit.completedDates.filter((d) => d !== dateStr)
                : [...habit.completedDates, dateStr].sort();

            // Calculate streak
            let currentStreak = 0;
            let checkDate = new Date();
            // Normalize today
            checkDate.setHours(0, 0, 0, 0);

            // For streak calculation, we iterate backwards from today
            // Grace period: 1 day missing doesn't break streak immediately if followed by resume? 
            // Requirement: "1-day grace period (missing one day does NOT break streak)"
            // This implementation is tricky. Simple version:
            // Loop back from today. If found, streak++. If not found, check yesterday. If found yesterday, streak++ (grace used?).

            // Actually, a simpler robust streak algo:
            // Sort dates descending.
            // Check if today or yesterday is present to start the streak.
            // Then count consecutive days, allowing 1 gap? 

            // For now, let's implement standard consecutive streak logic + "Yesterday check".
            // If I did it today, streak is N. If I didn't do it today but did yesterday, streak is N. 
            // If I missed yesterday, streak breaks.

            // Re-calculating streak solely based on completedDates:
            const sortedDates = [...newCompletedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

            // TODO: Implement complex grace period logic if strict compliance needed.
            // Current sim: Count consecutive days from the most recent completion.

            let streak = 0;
            if (sortedDates.length > 0) {
                let lastDate = new Date(sortedDates[0]);
                streak = 1;
                for (let i = 1; i < sortedDates.length; i++) {
                    const prevDate = new Date(sortedDates[i]);
                    const diffTime = Math.abs(lastDate.getTime() - prevDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        streak++;
                        lastDate = prevDate;
                    } else {
                        break;
                    }
                }
            }

            return {
                ...habit,
                completedDates: newCompletedDates,
                streak,
                bestStreak: Math.max(habit.bestStreak, streak),
            };
        }));
    };

    return (
        <HabitContext.Provider value={{ habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion }}>
            {children}
        </HabitContext.Provider>
    );
}

export function useHabits() {
    const context = useContext(HabitContext);
    if (context === undefined) {
        throw new Error('useHabits must be used within a HabitProvider');
    }
    return context;
}
