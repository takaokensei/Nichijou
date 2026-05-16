import { weekendSchedule } from '@/data/schedule';
import { TimelineBlock } from './TimelineBlock';

interface WeekendPanelProps {
  isVisible: boolean;
}

export function WeekendPanel({ isVisible }: WeekendPanelProps) {
  const style: React.CSSProperties = {
    display: isVisible ? 'block' : 'none',
    animation: isVisible ? 'fadeIn 0.2s ease' : 'none',
  };

  return (
    <div style={style}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            fontWeight: 500,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {weekendSchedule.name}
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            letterSpacing: '0.04em',
          }}
        >
          {weekendSchedule.sub}
        </p>
      </div>

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '12px',
          padding: '12px 16px',
          marginBottom: '1.5rem',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{weekendSchedule.info}</strong>
      </div>

      {weekendSchedule.days.map((day, dayIdx) => (
        <div key={dayIdx}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: '2rem 0 0.75rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {day.title === 'Sábado' ? '── Sábado ──' : '── Domingo ──'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {day.blocks.map((block, idx) => (
              <TimelineBlock
                key={`${dayIdx}-${idx}`}
                block={block}
                index={idx + dayIdx * 100}
                isActive={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
