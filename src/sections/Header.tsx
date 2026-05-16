import { Sun, Moon } from 'lucide-react';
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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        padding: '12px 24px',
        background: 'color-mix(in srgb, var(--surface) 80%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Title + Live Clock */}
        <div className="flex items-center gap-4">
          <h1 className="font-display text-xl font-normal text-foreground m-0 leading-none">
            Rotina <span className="text-muted-foreground italic">semanal</span>
          </h1>
          <div className="h-4 w-px bg-border" />
          <span
            className="font-mono text-sm font-bold tracking-widest text-foreground tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {time}
          </span>
        </div>

        {/* Right: Score + Theme Toggle */}
        <div className="flex items-center gap-4">
          <ScoreBadge />
          
          <div style={{ display: 'flex', gap: '2px', background: 'var(--bg)', borderRadius: '9999px', padding: '3px', border: '1px solid var(--border)' }}>
          <button
            onClick={() => theme !== 'light' && onToggleTheme()}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer border-none",
              theme === 'light' ? "bg-foreground text-background shadow-md" : "bg-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Sun size={12} />
            Light
          </button>
          <button
            onClick={() => theme !== 'dark' && onToggleTheme()}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer border-none",
              theme === 'dark' ? "bg-foreground text-background shadow-md" : "bg-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Moon size={12} />
            Dark
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}
