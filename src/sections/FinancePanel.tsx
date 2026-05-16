import { useState } from 'react';
import {
  finInitialProducts,
  finPhase5Products,
  finHairProducts,
  finInitialMetrics,
  finMonthlyProducts,
  finMonthlyMetrics,
  finBudgetMetrics,
  finBudgetBars,
  finBudgetCards,
  finStrategyPhases,
} from '@/data/finances';

interface FinancePanelProps {
  isVisible: boolean;
}

const subTabs = [
  { id: 'inicial', label: 'Compra inicial' },
  { id: 'mensal', label: 'Mensal' },
  { id: 'orcamento', label: 'Orçamento' },
  { id: 'estrategia', label: 'Estratégia' },
];

const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
  unico: { bg: 'var(--c-aula-bg)', color: 'var(--c-aula)', border: 'var(--c-aula)' },
  mensal: { bg: 'var(--c-treino-bg)', color: 'var(--c-treino)', border: 'var(--c-treino)' },
  futuro: { bg: 'var(--c-cabelo-bg)', color: 'var(--c-cabelo)', border: 'var(--c-cabelo)' },
  fixo: { bg: 'var(--c-sono-bg)', color: 'var(--c-sono)', border: 'var(--c-sono)' },
};

function FinCard({ product }: { product: typeof finInitialProducts[0] }) {
  const badge = badgeStyles[product.badgeType];
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '3px' }}>
          {product.title}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {product.brand}
        </div>
        {product.badge && badge && (
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '100px',
              marginTop: '6px',
              letterSpacing: '0.04em',
              background: badge.bg,
              color: badge.color,
              border: `1px solid ${badge.border}`,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)' }}>
          {product.price}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
          {product.priceSub}
        </div>
      </div>
    </div>
  );
}

function FinMetric({ metric }: { metric: typeof finInitialMetrics[0] }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '14px 16px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '6px' }}>
        {metric.label}
      </div>
      <div
        style={{
          fontSize: '22px',
          fontWeight: 500,
          color: metric.valueColor || 'var(--text)',
        }}
      >
        {metric.value}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
        {metric.sub}
      </div>
    </div>
  );
}

export function FinancePanel({ isVisible }: FinancePanelProps) {
  const [activeSubTab, setActiveSubTab] = useState('inicial');

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
          Finanças
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            letterSpacing: '0.04em',
          }}
        >
          Bolsa PIBIC R$700 · Análise de custos e poupança
        </p>
      </div>

      {/* Sub-tabs */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          background: 'var(--surface)',
          borderRadius: '8px',
          padding: '4px',
          border: '1px solid var(--border)',
        }}
      >
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '5px',
              fontSize: '10px',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              border: 'none',
              background: activeSubTab === tab.id ? 'var(--accent)' : 'transparent',
              color: activeSubTab === tab.id ? '#fff' : 'var(--text-secondary)',
              fontWeight: activeSubTab === tab.id ? 500 : 400,
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Compra Inicial */}
      {activeSubTab === 'inicial' && (
        <div style={{ animation: 'fadeIn 0.2s ease' }}>
          <p style={sectionTitleStyle}>Pele — compra única (dura 2–3 meses cada)</p>
          {finInitialProducts.map((p, i) => <FinCard key={i} product={p} />)}

          <p style={sectionTitleStyle}>Pele — semana 5+ (introduzir depois)</p>
          {finPhase5Products.map((p, i) => <FinCard key={i} product={p} />)}

          <p style={sectionTitleStyle}>Cabelo — compra inicial</p>
          {finHairProducts.map((p, i) => <FinCard key={i} product={p} />)}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '1.5rem' }}>
            {finInitialMetrics.map((m, i) => <FinMetric key={i} metric={m} />)}
          </div>
          <FinMetric metric={{ label: 'Investimento total mês 1', value: 'R$ 325–450', sub: 'pele + cabelo + corpo, sem azelaico ainda' }} />

          <div style={infoBoxStyle}>
            <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Por que Principia?</strong>{' '}
            Melhor custo-benefício brasileiro para niacinamida — fórmula com zinco PCA, trata acne e oleosidade simultaneamente. Evita importar The Ordinary (frete alto para Natal) sem perder eficácia.
          </div>
        </div>
      )}

      {/* Mensal */}
      {activeSubTab === 'mensal' && (
        <div style={{ animation: 'fadeIn 0.2s ease' }}>
          <p style={sectionTitleStyle}>Transporte — gasto fixo mensal</p>
          {finMonthlyProducts.filter(p => p.badgeType === 'fixo').map((p, i) => <FinCard key={i} product={p} />)}

          <p style={sectionTitleStyle}>Cuidado pessoal — reposição mensal prorrateada</p>
          {finMonthlyProducts.filter(p => p.badgeType !== 'fixo').map((p, i) => <FinCard key={i} product={p} />)}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '1.5rem' }}>
            {finMonthlyMetrics.map((m, i) => <FinMetric key={i} metric={m} />)}
          </div>
          <FinMetric metric={{ label: 'Total fixo mensal (transporte + produtos)', value: 'R$ 217–231', sub: 'mês 2+ com todos os produtos' }} />

          <div style={infoBoxStyle}>
            O gasto mensal é uma média prorrateada. Na prática alguns meses você não gasta nada em produtos e outros repõe 2–3 de uma vez. O transporte é o único gasto <strong style={{ color: 'var(--text)' }}>verdadeiramente fixo</strong> todo mês.
          </div>
        </div>
      )}

      {/* Orçamento */}
      {activeSubTab === 'orcamento' && (
        <div style={{ animation: 'fadeIn 0.2s ease' }}>
          <p style={sectionTitleStyle}>Visão geral — R$700 mensais</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {finBudgetMetrics.map((m, i) => <FinMetric key={i} metric={m} />)}
          </div>

          <p style={sectionTitleStyle}>Distribuição do orçamento — mês típico (mês 2+)</p>
          {finBudgetBars.map((bar, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>{bar.label}</span>
                <span>{bar.value}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${bar.width}%`,
                    borderRadius: '4px',
                    background: bar.color,
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
            </div>
          ))}

          <p style={sectionTitleStyle}>Projeção de poupança — 12 meses</p>
          {finBudgetCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '3px' }}>{card.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{card.brand}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--c-treino)' }}>{card.price}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>{card.priceSub}</div>
              </div>
            </div>
          ))}

          <FinMetric metric={{ label: 'Poupança atual', value: 'R$ 2.450', valueColor: 'var(--c-treino)', sub: 'não precisa tocar — a bolsa cobre tudo' }} />

          <div style={infoBoxStyle}>
            Sua mãe cobre moradia, alimentação e contas — isso é uma vantagem enorme. Com R$700, você cobre transporte + cuidado pessoal e ainda sobra mais da metade para guardar. Sem dívidas = você está em posição muito melhor do que a maioria dos universitários.
          </div>
        </div>
      )}

      {/* Estratégia */}
      {activeSubTab === 'estrategia' && (
        <div style={{ animation: 'fadeIn 0.2s ease' }}>
          <p style={sectionTitleStyle}>Como comprar — passo a passo</p>
          {finStrategyPhases.map((phase, i) => (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${phase.ok ? 'var(--c-treino)' : 'var(--accent)'}`,
                padding: '10px 14px',
                marginBottom: '8px',
                background: 'var(--surface)',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 500, color: phase.ok ? 'var(--c-treino)' : 'var(--text)', marginBottom: '4px' }}>
                {phase.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {phase.body}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  margin: '2rem 0 0.75rem',
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
