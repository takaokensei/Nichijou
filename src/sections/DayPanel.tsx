import type { DaySchedule } from '@/data/schedule';
import { TimelineBlock } from './TimelineBlock';

interface DayPanelProps {
  day: DaySchedule;
  currentBlockIdx: number | null;
  isVisible: boolean;
}

export function DayPanel({ day, currentBlockIdx, isVisible }: DayPanelProps) {
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
          {day.name}
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            letterSpacing: '0.04em',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          {day.sub}
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
        <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{day.info}</strong>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {day.blocks.map((block, idx) => (
          <TimelineBlock
            key={idx}
            block={block}
            index={idx}
            isActive={currentBlockIdx === idx}
          />
        ))}
      </div>
    </div>
  );
}
