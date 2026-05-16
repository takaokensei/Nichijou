import type { DaySchedule } from '@/data/schedule';
import { TimelineBlock } from './TimelineBlock';
import { useCheckin } from '@/hooks/useCheckin';

interface DayPanelProps {
  day: DaySchedule;
  currentBlockIdx: number | null;
  isVisible: boolean;
}

export function DayPanel({ day, currentBlockIdx, isVisible }: DayPanelProps) {
  const { getStatus, toggle } = useCheckin();

  const style: React.CSSProperties = {
    display: isVisible ? 'block' : 'none',
    animation: isVisible ? 'fadeIn 0.2s ease' : 'none',
  };

  return (
    <div style={style}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 className="font-display text-4xl font-semibold text-foreground tracking-tight leading-none m-0">
          {day.name}
        </h2>
        <p className="font-sans text-[13px] text-muted-foreground mt-1.5 tracking-wide">
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
            checkinStatus={getStatus(idx)}
            onCheckin={toggle}
          />
        ))}
      </div>
    </div>
  );
}
