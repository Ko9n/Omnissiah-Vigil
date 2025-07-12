'use client';

import { NetworkDashboard } from '@/components/dashboard/network-dashboard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NetworkDashboard />
    </main>
  );
} 