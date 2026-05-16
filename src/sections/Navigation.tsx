const tabs = [
  { id: 'seg', label: 'Segunda' },
  { id: 'ter', label: 'Terça' },
  { id: 'qua', label: 'Quarta' },
  { id: 'qui', label: 'Quinta' },
  { id: 'sex', label: 'Sexta' },
  { id: 'fds', label: 'Fim de semana' },
  { id: 'proto', label: 'Protocolos' },
  { id: 'fin', label: 'Finanças' },
  { id: 'comp', label: 'Compras' },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2px',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        background: 'var(--surface)',
        borderRadius: '16px',
        padding: '4px',
        border: '1px solid var(--border)',
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            fontFamily: '"DM Sans", sans-serif',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
            color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
            fontWeight: activeTab === tab.id ? 500 : 400,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.background = 'rgba(128,128,128,0.06)';
              e.currentTarget.style.color = 'var(--text)';
            }
          }}
          onMouseLeave={e => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
