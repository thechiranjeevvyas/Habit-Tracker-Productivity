export type Frequency = 'daily' | 'weekly' | 'custom';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export interface Habit {
    id: string;
    title: string;
    description?: string;
    frequency: Frequency;
    customDays?: DayOfWeek[];
    createdAt: string; // ISO String
    completedDates: string[]; // ISO Date YYYY-MM-DD
    streak: number;
    bestStreak: number;
    color: string;
    archived: boolean;
}

export interface Todo {
    id: string;
    title: string;
    description?: string;
    dueDate: string; // ISO Date YYYY-MM-DD
    dueTime?: string; // HH:mm
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    createdAt: string; // ISO String
}

export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    userName: string;
    notificationsEnabled: boolean;
}
