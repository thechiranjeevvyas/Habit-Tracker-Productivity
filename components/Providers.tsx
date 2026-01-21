"use client";

import React from 'react';
import { HabitProvider } from '@/context/HabitContext';
import { TodoProvider } from '@/context/TodoContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <HabitProvider>
                <TodoProvider>
                    {children}
                </TodoProvider>
            </HabitProvider>
        </ThemeProvider>
    );
}
