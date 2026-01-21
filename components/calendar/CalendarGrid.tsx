"use client";

import React from 'react';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isSameDay,
    isToday
} from 'date-fns';
import { cn } from '@/lib/utils';
import { useTodos } from '@/context/TodoContext';
import { TaskItem } from './TaskItem';

interface CalendarGridProps {
    currentDate: Date;
}

export function CalendarGrid({ currentDate }: CalendarGridProps) {
    const { todos } = useTodos();

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full border-collapse">
            {/* Header Row */}
            <div className="grid grid-cols-7 border-b">
                {weekDays.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 auto-rows-fr">
                {days.map((day, dayIdx) => {
                    const formattedDate = format(day, 'yyyy-MM-dd');
                    const dayTodos = todos.filter((todo) => todo.dueDate === formattedDate);

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "min-h-[100px] p-2 border-b border-r last:border-r-0 relative transition-colors hover:bg-accent/5",
                                !isSameMonth(day, monthStart) && "bg-muted/30 text-muted-foreground",
                                isToday(day) && "bg-accent/20"
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={cn(
                                    "text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full",
                                    isToday(day) && "bg-primary text-primary-foreground"
                                )}>
                                    {format(day, 'd')}
                                </span>
                            </div>

                            <div className="space-y-1">
                                {dayTodos.map(todo => (
                                    <TaskItem key={todo.id} todo={todo} />
                                ))}
                                {dayTodos.length > 3 && (
                                    <div className="text-xs text-muted-foreground text-center">
                                        + {dayTodos.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
