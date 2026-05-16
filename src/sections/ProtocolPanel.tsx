import { protocols } from '@/data/protocols';
import { TimelineBlock } from './TimelineBlock';
import { useCheckin } from '@/hooks/useCheckin';

interface ProtocolPanelProps {
  isVisible: boolean;
}

export function ProtocolPanel({ isVisible }: ProtocolPanelProps) {
  const { getStatus, toggle } = useCheckin();

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
          Protocolos
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            letterSpacing: '0.04em',
          }}
        >
          Pele · Corpo · Estrias · Queratose Pilar · Hobbies · Cabelo · Treino · Nutrição · Café
        </p>
      </div>

      {protocols.map((section) => (
        <div key={section.id}>
          <p
            id={section.id}
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
            {section.title}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
