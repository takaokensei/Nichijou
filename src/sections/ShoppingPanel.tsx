import { ArrowUpRight } from 'lucide-react';
import { skinProducts, hairProducts } from '@/data/shopping';

interface ShoppingPanelProps {
  isVisible: boolean;
}

function ShoppingCard({ item }: { item: typeof skinProducts[0] }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: item.pending ? '1px solid var(--c-cabelo)' : '1px solid var(--border)',
        borderRadius: '8px',
        padding: '14px 16px',
        marginBottom: '8px',
        opacity: item.pending ? 0.75 : 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '6px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
            {item.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
            {item.brand}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap' }}>
            {item.price}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textAlign: 'right', marginTop: '2px' }}>
            {item.priceSub}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {item.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              fontFamily: '"JetBrains Mono", monospace',
              padding: '4px 10px',
              borderRadius: '6px',
              textDecoration: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              background: 'var(--bg)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <ArrowUpRight size={10} />
            {link.label}
          </a>
        ))}
        {item.note && (
          <span style={{ fontSize: '11px', color: item.pending ? 'var(--c-cabelo)' : 'var(--text-secondary)', fontFamily: '"JetBrains Mono", monospace' }}>
            {item.note}
          </span>
        )}
      </div>
    </div>
  );
}

export function ShoppingPanel({ isVisible }: ShoppingPanelProps) {
  const style: React.CSSProperties = {
    display: isVisible ? 'block' : 'none',
    animation: isVisible ? 'fadeIn 0.2s ease' : 'none',
  };

  const skinTotal = 'R$ 175–230';
  const hairTotal = 'R$ 110–160';
  const grandTotal = 'R$ 325–450';

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
          Compras
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            letterSpacing: '0.04em',
          }}
        >
          Produtos com links diretos · preços verificados mai/2026
        </p>
      </div>

      <div style={infoBoxStyle}>
        Links priorizando o menor preço encontrado — Mercado Livre quando mais barato, Amazon como alternativa. Confira antes de comprar, preços mudam.
      </div>

      {/* Pele */}
      <p style={sectionTitleStyle}>Pele</p>
      {skinProducts.map((item, i) => <ShoppingCard key={i} item={item} />)}

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '14px 16px',
          marginTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total pele (compra inicial)</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text)' }}>{skinTotal}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>sem ácido azelaico ainda</div>
        </div>
      </div>

      {/* Cabelo */}
      <p style={sectionTitleStyle}>Cabelo — ondas 2A-2B</p>
      {hairProducts.map((item, i) => <ShoppingCard key={i} item={item} />)}

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '14px 16px',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total cabelo (compra inicial)</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text)' }}>{hairTotal}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>Widi Care + Low Poo</div>
        </div>
      </div>

      {/* Total geral */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--accent)',
          borderRadius: '8px',
          padding: '14px 16px',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total geral — mês 1</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--accent)' }}>{grandTotal}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>pele + cabelo + corpo · sem azelaico</div>
        </div>
      </div>

      <div style={infoBoxStyle}>
        Com R$700 de bolsa e ~R$114 de ônibus, o mês 1 vai consumir quase toda a bolsa. Mas é o único mês assim — do mês 2 em diante são só reposições (~R$117/mês). Os R$2.390 poupados cobrem o investimento inicial sem problema.
      </div>
    </div>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  margin: '1.75rem 0 0.75rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid var(--border)',
};

const infoBoxStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderLeft: '3px solid var(--accent)',
  borderRadius: '8px',
  padding: '12px 16px',
  marginTop: '1rem',
  fontSize: '12px',
  color: 'var(--text-secondary)',
  lineHeight: 1.6,
};
