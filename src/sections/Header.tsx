import { Sun, Moon } from 'lucide-react';

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
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text)', margin: 0 }}>
          Rotina <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>semanal</span>
        </h1>
        <div style={{ display: 'flex', gap: '2px', background: 'var(--bg)', borderRadius: '9999px', padding: '3px', border: '1px solid var(--border)' }}>
          <button
            onClick={() => theme !== 'light' && onToggleTheme()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 13px',
              borderRadius: '9999px',
              fontSize: '10px',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: 'none',
              background: theme === 'light' ? 'var(--text)' : 'transparent',
              color: theme === 'light' ? 'var(--bg)' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            <Sun size={12} />
            Light
          </button>
          <button
            onClick={() => theme !== 'dark' && onToggleTheme()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 13px',
              borderRadius: '9999px',
              fontSize: '10px',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: 'none',
              background: theme === 'dark' ? 'var(--text)' : 'transparent',
              color: theme === 'dark' ? 'var(--bg)' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            <Moon size={12} />
            Dark
          </button>
        </div>
      </div>
    </header>
  );
}
