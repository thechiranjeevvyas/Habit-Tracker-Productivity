"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';
import { Habit } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useHabits } from '@/context/HabitContext';
import { format } from 'date-fns';

interface HabitCardProps {
    habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
    const { toggleHabitCompletion, deleteHabit } = useHabits();
    const today = format(new Date(), 'yyyy-MM-dd');
    const isCompletedToday = habit.completedDates.includes(today);

    // Simple animation classes
    const completedClass = "bg-primary text-primary-foreground border-primary";
    const defaultClass = "hover:border-primary/50 transition-colors";

    return (
        <Card className={cn("relative overflow-hidden transition-all duration-300", isCompletedToday ? "border-primary shadow-md" : defaultClass)}>
            {/* Background progress bar effect could go here */}

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            {habit.title}
                            {isCompletedToday && <Icons.check className="h-5 w-5 text-green-500" />}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{habit.description || "No description"}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Icons.flame className={cn("h-3 w-3", habit.streak > 0 ? "text-orange-500" : "text-muted-foreground")} />
                            {habit.streak} day streak
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-4">
                {/* Could show weekly progress bubbles here later */}
                <div className="flex gap-1 text-xs text-muted-foreground">
                    Frequency: <span className="capitalize font-medium text-foreground">{habit.frequency}</span>
                </div>
            </CardContent>

            <CardFooter className="pt-0 flex justify-between gap-2">
                <Button
                    className={cn("w-full transition-all", isCompletedToday && "bg-green-600 hover:bg-green-700")}
                    onClick={() => toggleHabitCompletion(habit.id, today)}
                    size="lg"
                >
                    {isCompletedToday ? "Completed" : "Check In"}
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteHabit(habit.id)}>
                    <Icons.trash className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
