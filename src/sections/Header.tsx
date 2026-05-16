import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        padding: '16px 24px',
        background: 'color-mix(in srgb, var(--surface) 80%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 className="font-display text-2xl font-normal text-foreground m-0">
          Rotina <span className="text-muted-foreground italic">semanal</span>
        </h1>
        <div style={{ display: 'flex', gap: '2px', background: 'var(--bg)', borderRadius: '9999px', padding: '3px', border: '1px solid var(--border)' }}>
          <button
            onClick={() => theme !== 'light' && onToggleTheme()}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300",
                theme === 'light' ? "bg-foreground text-background shadow-md" : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
          >
            <Sun size={12} />
            Light
          </button>
          <button
            onClick={() => theme !== 'dark' && onToggleTheme()}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300",
                theme === 'dark' ? "bg-foreground text-background shadow-md" : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
          >
            <Moon size={12} />
            Dark
          </button>
        </div>
      </div>
    </header>
  );
}
