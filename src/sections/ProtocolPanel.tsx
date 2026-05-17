import { protocols } from '@/data/protocols';
import { TimelineBlock } from './TimelineBlock';
import { useCheckin } from '@/hooks/useCheckin';
import { BodyMap } from './BodyMap';
import { useCallback } from 'react';

interface ProtocolPanelProps {
  isVisible: boolean;
}

export function ProtocolPanel({ isVisible }: ProtocolPanelProps) {
  const { getStatus, toggle } = useCheckin();

  const handleRegionClick = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const style: React.CSSProperties = {
    display: isVisible ? 'block' : 'none',
    animation: isVisible ? 'fadeIn 0.2s ease' : 'none',
  };

  return (
    <div style={style}>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-semibold text-foreground tracking-tight leading-none m-0">
          Protocolos & Body
        </h2>
        <p className="font-sans text-[13px] text-muted-foreground mt-1.5 tracking-wide">
          O corpo como interface de sistema. Clique numa região para acessar o protocolo.
        </p>
      </div>

      <div className="mb-12">
        <BodyMap onRegionClick={handleRegionClick} />
      </div>

      {protocols.map((section) => (
        <div key={section.id}>
          <p
            id={section.id}
            className="font-mono text-[11px] font-medium text-muted-foreground tracking-[0.15em] uppercase mt-12 mb-3 pb-2 border-b border-border scroll-mt-24"
          >
            {section.title}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.blocks.map((block, idx) => (
              <TimelineBlock
                key={idx}
                block={block}
                index={idx}
                isActive={false}
                checkinStatus={getStatus(idx)}
                onCheckin={toggle}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
