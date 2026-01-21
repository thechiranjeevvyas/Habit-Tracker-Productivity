"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { useTheme } from 'next-themes';
import { Button } from './button';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Icons.dashboard },
    { name: 'Habits', href: '/habits', icon: Icons.flame },
    { name: 'Calendar', href: '/calendar', icon: Icons.calendar },
    { name: 'Analytics', href: '/analytics', icon: Icons.analytics },
    { name: 'Settings', href: '/settings', icon: Icons.settings },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex h-screen w-64 flex-col fixed border-r bg-card">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        FocusFlow
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                pathname.startsWith(item.href)
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {mounted && (theme === "dark" ? <Icons.sun className="h-4 w-4" /> : <Icons.moon className="h-4 w-4" />)}
                        Toggle Theme
                    </Button>
                </div>
            </aside>

            {/* Basic Mobile Topbar (could be bottom bar) */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md p-4 flex items-center justify-between">
                <span className="font-bold text-lg">FocusFlow</span>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {mounted && (theme === "dark" ? <Icons.sun className="h-4 w-4" /> : <Icons.moon className="h-4 w-4" />)}
                </Button>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background flex justify-around p-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-md text-xs",
                            pathname.startsWith(item.href)
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5 mb-1" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </>
    );
}
