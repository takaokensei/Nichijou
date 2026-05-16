import { useRef, useEffect } from 'react';
import type { ScheduleBlock } from '@/data/schedule';
import type { CheckinStatus } from '@/hooks/useCheckin';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface TimelineBlockProps {
  block: ScheduleBlock;
  isActive?: boolean;
  index: number;
  checkinStatus: CheckinStatus;
  onCheckin: (index: number, status: CheckinStatus) => void;
}

const categoryLabels: Record<string, string> = {
  aula: 'aula', treino: 'treino', pele: 'pele', cabelo: 'cabelo',
  refeicao: 'refeicao', sono: 'sono', estudo: 'estudo', livre: 'livre',
};

export function TimelineBlock({ block, isActive, index, checkinStatus, onCheckin }: TimelineBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const catKey = categoryLabels[block.category] || 'livre';

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  const isDone = checkinStatus === 'done';
  const isSkipped = checkinStatus === 'skipped';

  return (
    <div
      ref={ref}
      className="timeline-block group"
      data-active={isActive}
      style={{ display: 'flex', alignItems: 'stretch', gap: '12px', minHeight: '48px' }}
    >
      {/* Timestamp */}
      <div
        className={cn(
          "w-[72px] min-w-[72px] flex items-center justify-end text-[11px] font-mono tracking-tight transition-colors duration-200 pr-1 shrink-0",
          isActive ? "text-accent font-bold" : "text-muted-foreground"
        )}
      >
        {block.time}
      </div>

      {/* Block card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          borderRadius: '0px 12px 12px 0px',
          padding: '14px 16px',
          borderLeft: `3px solid var(--c-${catKey})`,
          background: isDone
            ? `color-mix(in srgb, var(--c-${catKey}-bg) 60%, transparent)`
            : isSkipped
            ? 'color-mix(in srgb, var(--surface) 50%, transparent)'
            : `var(--c-${catKey}-bg)`,
          transition: 'transform 0.1s ease, box-shadow 0.1s ease, opacity 0.2s ease',
          boxShadow: isActive ? '0 0 0 1px inset var(--accent)' : 'none',
          opacity: isSkipped ? 0.5 : 1,
          cursor: 'default',
          gap: '12px',
        }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.transform = 'translateX(2px)';
            e.currentTarget.style.boxShadow = '0 2px 14px rgba(0,0,0,0.08)';
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = isActive ? '0 0 0 1px inset var(--accent)' : 'none';
          }
        }}
      >
        {/* Text content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.3,
                color: isSkipped ? 'var(--muted-foreground)' : `var(--c-${catKey})`,
                textDecoration: isSkipped ? 'line-through' : 'none',
              }}
            >
              {block.label}
            </span>
            {isActive && (
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.15em] text-accent uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                agora
              </span>
            )}
            {isDone && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-wider text-emerald-400 uppercase font-bold">
                <Check size={10} /> feito
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: '12px',
              marginTop: '3px',
              lineHeight: 1.4,
              color: `var(--c-${catKey})`,
              opacity: 0.75,
            }}
          >
            {block.sub}
          </div>
        </div>

        {/* Checkin buttons — visible on hover or when checked */}
        <div
          className={cn(
            "flex items-center gap-1 transition-opacity duration-200 shrink-0",
            (isDone || isSkipped) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <button
            title="Marcar como feito"
            onClick={() => onCheckin(index, 'done')}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 border",
              isDone
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                : "bg-transparent border-border text-muted-foreground hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10"
            )}
          >
            <Check size={13} />
          </button>
          <button
            title="Marcar como pulado"
            onClick={() => onCheckin(index, 'skipped')}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 border",
              isSkipped
                ? "bg-red-500/20 border-red-500/50 text-red-400"
                : "bg-transparent border-border text-muted-foreground hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10"
            )}
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
