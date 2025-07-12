'use client';

import { NetworkTopology } from '@/components/ui/network-topology';
import { ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopologyFullscreenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-slate-700/50 bg-slate-800/90 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">
              Сетевая топология - Полный экран
            </h1>
          </div>

          <button
            onClick={() => window.close()}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Fullscreen Topology */}
      <div className="h-screen p-4 pt-20">
        <div className="h-full">
          <NetworkTopology isFullscreen={true} />
        </div>
      </div>
    </div>
  );
}
