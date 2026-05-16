import { useRef, useEffect } from 'react';
import type { ScheduleBlock } from '@/data/schedule';
import { cn } from '@/lib/utils';

interface TimelineBlockProps {
  block: ScheduleBlock;
  isActive?: boolean;
  index: number;
}

const categoryLabels: Record<string, string> = {
  aula: 'aula', treino: 'treino', pele: 'pele', cabelo: 'cabelo',
  refeicao: 'refeicao', sono: 'sono', estudo: 'estudo', livre: 'livre',
};

export function TimelineBlock({ block, isActive, index: _idx }: TimelineBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const catKey = categoryLabels[block.category] || 'livre';

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="timeline-block"
      data-active={isActive}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: '12px',
        minHeight: '48px',
      }}
    >
      <div
        className={cn(
          "w-[72px] min-w-[72px] flex items-center justify-end text-[11px] font-mono tracking-tight transition-colors duration-200 pr-1 shrink-0",
          isActive ? "text-accent font-bold" : "text-muted-foreground"
        )}
      >
        {block.time}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          borderRadius: '0px 12px 12px 0px',
          padding: '14px 16px',
          borderLeft: `3px solid var(--c-${catKey})`,
          background: `var(--c-${catKey}-bg)`,
          transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          boxShadow: isActive ? '0 0 0 1px inset var(--accent)' : 'none',
          cursor: 'default',
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
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.3,
              color: `var(--c-${catKey})`,
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
    </div>
  );
}
