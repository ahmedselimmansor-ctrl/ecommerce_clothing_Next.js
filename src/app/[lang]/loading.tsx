import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-[60vh] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulse */}
        <div className="absolute w-20 h-20 rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 animate-ping" />
        
        {/* Inner spinning loader */}
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center relative z-10">
          <Loader2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400 animate-spin" />
        </div>
      </div>
      <p className="mt-4 font-bold text-sm tracking-wide text-zinc-600 dark:text-zinc-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
