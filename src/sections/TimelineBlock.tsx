import { useRef, useEffect } from 'react';
import type { ScheduleBlock } from '@/data/schedule';

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
        style={{
          width: '72px',
          minWidth: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontSize: '11px',
          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
          paddingRight: '4px',
          flexShrink: 0,
          letterSpacing: '0.02em',
          fontFamily: '"JetBrains Mono", monospace',
          transition: 'color 0.2s ease',
        }}
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
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '9px',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  animation: 'pulseAgora 2s infinite',
                  display: 'inline-block',
                }}
              />
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
