"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useTodos } from '@/context/TodoContext';
import { AddTaskModal } from '@/components/calendar/AddTaskModal';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { addMonths, subMonths, format } from 'date-fns';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const today = () => setCurrentDate(new Date());

    return (
        <div className="container py-8 px-4 md:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">Manage your schedule and tasks.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md mr-2">
                        <Button variant="ghost" size="icon" onClick={prevMonth}><Icons.left className="h-4 w-4" /></Button>
                        <span className="w-32 text-center font-medium">{format(currentDate, 'MMMM yyyy')}</span>
                        <Button variant="ghost" size="icon" onClick={nextMonth}><Icons.right className="h-4 w-4" /></Button>
                    </div>
                    <Button variant="outline" onClick={today}>Today</Button>
                    <Button onClick={() => setIsModalOpen(true)} className="gap-2"><Icons.add className="h-4 w-4" /> Add Task</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <CalendarGrid currentDate={currentDate} />
                </CardContent>
            </Card>

            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultDate={currentDate} />
        </div>
    );
}
