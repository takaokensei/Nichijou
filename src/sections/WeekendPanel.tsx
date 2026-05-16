import { weekendSchedule } from '@/data/schedule';
import { TimelineBlock } from './TimelineBlock';
import { useCheckin } from '@/hooks/useCheckin';

interface WeekendPanelProps {
  isVisible: boolean;
}

export function WeekendPanel({ isVisible }: WeekendPanelProps) {
  // Weekend days use offset indices so their keys don't clash: Sáb = 0–99, Dom = 100–199
  const satCheckin = useCheckin();
  const sunCheckin = useCheckin();

  const style: React.CSSProperties = {
    display: isVisible ? 'block' : 'none',
    animation: isVisible ? 'fadeIn 0.2s ease' : 'none',
  };

  const dayHooks = [satCheckin, sunCheckin];

  return (
    <div style={style}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 className="font-display text-4xl font-semibold text-foreground tracking-tight leading-none m-0">
          {weekendSchedule.name}
        </h2>
        <p className="font-sans text-[13px] text-muted-foreground mt-1.5 tracking-wide">
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

      {weekendSchedule.days.map((day, dayIdx) => {
        const { getStatus, toggle } = dayHooks[dayIdx];
        return (
          <div key={dayIdx}>
            <p
              className="font-mono text-[11px] font-medium text-muted-foreground tracking-[0.15em] uppercase mt-8 mb-3 pb-2 border-b border-border"
            >
              {day.title === 'Sábado' ? '── Sábado ──' : '── Domingo ──'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {day.blocks.map((block, idx) => (
                <TimelineBlock
                  key={`${dayIdx}-${idx}`}
                  block={block}
                  index={idx}
                  isActive={false}
                  checkinStatus={getStatus(idx)}
                  onCheckin={toggle}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
