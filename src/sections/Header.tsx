import { Sun, Moon, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLiveClock } from '@/hooks/useLiveClock';
import { ScoreBadge } from './ScoreBadge';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const time = useLiveClock();

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between gap-4">

        {/* Left — Brand + System Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center glow-accent">
              <Cpu size={13} className="text-white" />
            </div>
            <h1 className="font-display text-lg font-medium text-[var(--text)] m-0 leading-none whitespace-nowrap">
              NEXUS
            </h1>
          </div>

          <div className="h-4 w-px bg-[var(--border)] shrink-0" />

          <span
            className="font-mono text-sm font-bold tracking-widest text-[var(--text)] tabular-nums shrink-0"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {time}
          </span>

          <div className="h-4 w-px bg-[var(--border)] shrink-0 hidden sm:block" />

          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] hidden sm:block shrink-0">
            Sistema Ativo
          </span>
        </div>

        {/* Right — Score + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <ScoreBadge />

          <div className="flex gap-px p-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)]">
            <button
              onClick={() => theme !== 'light' && onToggleTheme()}
              title="Modo Claro"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer border-none",
                theme === 'light'
                  ? "bg-[var(--accent)] text-white shadow-md"
                  : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text)]"
              )}
            >
              <Sun size={11} />
              <span className="hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => theme !== 'dark' && onToggleTheme()}
              title="Modo Escuro"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer border-none",
                theme === 'dark'
                  ? "bg-[var(--accent)] text-white shadow-md"
                  : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text)]"
              )}
            >
              <Moon size={11} />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
