'use client';

import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { WebSocketProvider } from '@/components/dashboard/websocket-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="network-monitor-theme"
      >
        <WebSocketProvider>{children}</WebSocketProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
