"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHabits } from '@/context/HabitContext';
import { useTodos } from '@/context/TodoContext';
import { format } from 'date-fns';
import { Icons } from '@/components/ui/icons';
import { HabitCard } from '@/components/habits/HabitCard';
import { TaskItem } from '@/components/calendar/TaskItem';

export default function DashboardPage() {
    const { habits } = useHabits();
    const { todos } = useTodos();
    const today = format(new Date(), 'yyyy-MM-dd');

    // Today's Habits
    const todaysHabits = habits.filter(h => h.frequency === 'daily' || h.frequency === 'custom'); // Simplified for now
    const completedHabitsCount = habits.filter(h => h.completedDates.includes(today)).length;

    // Today's Todos
    const todaysTodos = todos.filter(t => t.dueDate === today);
    const pendingTodos = todaysTodos.filter(t => !t.completed);

    return (
        <div className="container py-8 px-4 md:px-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back!</h1>
                <p className="text-muted-foreground">Here is your daily overview for {format(new Date(), 'EEEE, MMMM do')}.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Habits Completed</CardTitle>
                        <Icons.flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedHabitsCount} / {habits.length}</div>
                        <p className="text-xs text-muted-foreground">Keep the streak alive!</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks for Today</CardTitle>
                        <Icons.check className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingTodos.length}</div>
                        <p className="text-xs text-muted-foreground">Pending tasks</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
                        <Icons.analytics className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Daily average</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Feed: Today's Habits */}
                <div className="col-span-full lg:col-span-4 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Today's Habits</h2>
                    </div>
                    {habits.length === 0 ? (
                        <p className="text-muted-foreground">No habits tracked yet.</p>
                    ) : (
                        <div className="grid gap-4">
                            {habits.map(habit => (
                                <HabitCard key={habit.id} habit={habit} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Feed: Today's Schedule */}
                <div className="col-span-full lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Schedule</h2>
                    </div>
                    <Card className="h-fit">
                        <CardContent className="p-4 space-y-4">
                            {todaysTodos.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">No tasks for today. Relax!</div>
                            ) : (
                                todaysTodos.map(todo => (
                                    <TaskItem key={todo.id} todo={todo} />
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
