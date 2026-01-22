"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useHabits } from '@/context/HabitContext';
import { useTodos } from '@/context/TodoContext';

export default function SettingsPage() {
    const { habits } = useHabits();
    const { todos } = useTodos();

    const handleClearData = () => {
        if (confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const handleExport = () => {
        const data = {
            habits: JSON.parse(localStorage.getItem('habits_v1') || '[]'),
            todos: JSON.parse(localStorage.getItem('todos_v1') || '[]')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `focusflow-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    return (
        <div className="container max-w-2xl py-8 px-4 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your data and preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium">Export Data</h3>
                            <p className="text-sm text-muted-foreground">Download a JSON backup of your habits and tasks.</p>
                        </div>
                        <Button variant="outline" onClick={handleExport}>Export JSON</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                        <div>
                            <h3 className="font-medium text-destructive">Danger Zone</h3>
                            <p className="text-sm text-muted-foreground">Permanently delete all local data.</p>
                        </div>
                        <Button variant="destructive" onClick={handleClearData}>Reset All Data</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground">
                FocusFlow v1.0 • Local Storage Only • No Cloud Sync
            </div>
        </div>
    );
}
