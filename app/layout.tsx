import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Habit & Task Tracker',
  description: 'A personal habit tracker and todo application',
  manifest: '/manifest.json',
};

import { Navigation } from '@/components/ui/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased min-h-screen bg-background text-foreground")}>
        <Providers>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
