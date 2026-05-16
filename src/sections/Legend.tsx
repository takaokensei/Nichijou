const categories = [
  { key: 'aula', label: 'Aula' },
  { key: 'treino', label: 'Treino' },
  { key: 'pele', label: 'Pele' },
  { key: 'cabelo', label: 'Cabelo' },
  { key: 'refeicao', label: 'Refeição' },
  { key: 'sono', label: 'Sono' },
  { key: 'estudo', label: 'Estudo' },
  { key: 'livre', label: 'Livre' },
] as const;

export function Legend() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px 16px',
        marginBottom: '2rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {categories.map(cat => (
        <div
          key={cat.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              background: `var(--c-${cat.key})`,
              flexShrink: 0,
            }}
          />
          {cat.label}
        </div>
      ))}
    </div>
  );
}
