"use client";

import React from 'react';
import { useHabits } from '@/context/HabitContext';
import { HabitHeatmap } from '@/components/habits/HabitHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
    const { habits } = useHabits();

    return (
        <div className="container py-8 px-4 md:px-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">Visualize your consistency over time.</p>
            </div>

            {habits.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No habits found. Start tracking to see analytics!
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {habits.map(habit => (
                        <HabitHeatmap key={habit.id} habit={habit} />
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            {habits.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-2">
                            <div className="text-4xl font-bold text-primary">
                                {Math.round(
                                    habits.reduce((acc, h) => acc + (h.completedDates.length > 0 ? h.streak : 0), 0) / habits.length
                                )}
                            </div>
                            <p className="text-muted-foreground">Average Streak (Days)</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
