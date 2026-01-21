"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Habit } from '@/lib/types';
import { subDays, format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface HabitHeatmapProps {
    habit: Habit;
}

export function HabitHeatmap({ habit }: HabitHeatmapProps) {
    // Generate last 100 days
    const days = Array.from({ length: 98 }, (_, i) => {
        const date = subDays(new Date(), 97 - i); // End at today
        return date;
    });

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{habit.title} History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-1">
                    {days.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const isCompleted = habit.completedDates.includes(dateStr);

                        return (
                            <div
                                key={dateStr}
                                title={`${dateStr}: ${isCompleted ? 'Completed' : 'Missed'}`}
                                className={cn(
                                    "h-3 w-3 rounded-sm transition-colors",
                                    isCompleted ? "bg-primary" : "bg-muted"
                                )}
                            />
                        );
                    })}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-right">Last ~3 months</p>
            </CardContent>
        </Card>
    );
}
