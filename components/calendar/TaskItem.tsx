"use client";

import React from 'react';
import { Todo } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTodos } from '@/context/TodoContext';
import { Icons } from '@/components/ui/icons';

interface TaskItemProps {
    todo: Todo;
}

export function TaskItem({ todo }: TaskItemProps) {
    const { toggleTodo, deleteTodo } = useTodos();

    return (
        <div
            className={cn(
                "group flex items-center gap-1 text-xs p-1 rounded mb-1 truncate cursor-pointer transition-colors relative",
                todo.completed ? "bg-muted text-muted-foreground line-through" : "bg-primary/10 text-primary-foreground hover:bg-primary/20",
                todo.priority === 'high' && !todo.completed && "border-l-2 border-red-500",
                todo.priority === 'medium' && !todo.completed && "border-l-2 border-yellow-500",
                // Text color fix for light/dark mode
                !todo.completed && "text-foreground"
            )}
            onClick={(e) => {
                e.stopPropagation();
                toggleTodo(todo.id);
            }}
            title={todo.title}
        >
            <div className={cn("h-2 w-2 rounded-full border", todo.completed ? "bg-muted-foreground border-transparent" : "border-foreground/50")} />
            <span className="truncate flex-1">{todo.title}</span>
            <button
                className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity absolute right-1 bg-background rounded-full p-0.5 shadow-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                }}
            >
                <Icons.trash className="h-3 w-3" />
            </button>
        </div>
    );
}
