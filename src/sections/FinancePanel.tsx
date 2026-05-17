import { useState } from 'react';
import { cn } from '@/lib/utils';
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

const badgeStyles: Record<string, string> = {
  unico: 'bg-[var(--c-aula-bg)] text-[var(--c-aula)] border-[var(--c-aula)]',
  mensal: 'bg-[var(--c-treino-bg)] text-[var(--c-treino)] border-[var(--c-treino)]',
  futuro: 'bg-[var(--c-cabelo-bg)] text-[var(--c-cabelo)] border-[var(--c-cabelo)]',
  fixo: 'bg-[var(--c-sono-bg)] text-[var(--c-sono)] border-[var(--c-sono)]',
};

function FinCard({ product }: { product: typeof finInitialProducts[0] }) {
  const badgeClass = badgeStyles[product.badgeType] || '';
  return (
    <div className="glass rounded-xl p-3 mb-2 flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-foreground mb-1">{product.title}</div>
        <div className="text-[11px] text-muted-foreground leading-snug">{product.brand}</div>
        {product.badge && badgeClass && (
          <span className={cn("inline-block text-[10px] px-2 py-0.5 rounded-full mt-1.5 border tracking-wide", badgeClass)}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="text-[15px] font-medium text-foreground">{product.price}</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">{product.priceSub}</div>
      </div>
    </div>
  );
}

function FinMetric({ metric }: { metric: typeof finInitialMetrics[0] }) {
  return (
    <div className="glass rounded-xl p-4 text-center flex flex-col justify-center">
      <div className="text-[10px] text-muted-foreground tracking-wider mb-1.5 font-mono uppercase">{metric.label}</div>
      <div
        className="text-[22px] font-medium font-display"
        style={{ color: metric.valueColor || 'var(--text)' }}
      >
        {metric.value}
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">{metric.sub}</div>
    </div>
  );
}

export function FinancePanel({ isVisible }: FinancePanelProps) {
  const [activeSubTab, setActiveSubTab] = useState('inicial');

  if (!isVisible) return null;

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="mb-6">
        <h2 className="font-display text-4xl font-semibold text-foreground tracking-tight leading-none m-0">
          Finanças
        </h2>
        <p className="font-sans text-[13px] text-muted-foreground mt-1.5 tracking-wide">
          Bolsa PIBIC R$700 · Análise de custos e poupança
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-1 mb-6 bg-[var(--surface)] rounded-xl p-1 border border-border">
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider cursor-pointer border-none transition-all duration-200 uppercase",
              activeSubTab === tab.id
                ? "bg-[var(--accent)] text-white font-medium shadow-sm"
                : "bg-transparent text-muted-foreground hover:bg-[var(--surface-2)] hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Compra Inicial */}
      {activeSubTab === 'inicial' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="section-title">Pele — compra única (dura 2–3 meses cada)</p>
          {finInitialProducts.map((p, i) => <FinCard key={i} product={p} />)}

          <p className="section-title">Pele — semana 5+ (introduzir depois)</p>
          {finPhase5Products.map((p, i) => <FinCard key={i} product={p} />)}

          <p className="section-title">Cabelo — compra inicial</p>
          {finHairProducts.map((p, i) => <FinCard key={i} product={p} />)}

          <div className="grid grid-cols-2 gap-2 mt-6">
            {finInitialMetrics.map((m, i) => <FinMetric key={i} metric={m} />)}
          </div>
          <div className="mt-2">
            <FinMetric metric={{ label: 'Investimento total mês 1', value: 'R$ 325–450', sub: 'pele + cabelo + corpo, sem azelaico ainda' }} />
          </div>

          <div className="info-box">
            <strong className="text-foreground font-medium">Por que Principia?</strong>{' '}
            Melhor custo-benefício brasileiro para niacinamida — fórmula com zinco PCA, trata acne e oleosidade simultaneamente. Evita importar The Ordinary (frete alto para Natal) sem perder eficácia.
          </div>
        </div>
      )}

      {/* Mensal */}
      {activeSubTab === 'mensal' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="section-title">Transporte — gasto fixo mensal</p>
          {finMonthlyProducts.filter(p => p.badgeType === 'fixo').map((p, i) => <FinCard key={i} product={p} />)}

          <p className="section-title">Cuidado pessoal — reposição mensal prorrateada</p>
          {finMonthlyProducts.filter(p => p.badgeType !== 'fixo').map((p, i) => <FinCard key={i} product={p} />)}

          <div className="grid grid-cols-2 gap-2 mt-6">
            {finMonthlyMetrics.map((m, i) => <FinMetric key={i} metric={m} />)}
          </div>
          <div className="mt-2">
            <FinMetric metric={{ label: 'Total fixo mensal (transporte + produtos)', value: 'R$ 217–231', sub: 'mês 2+ com todos os produtos' }} />
          </div>

          <div className="info-box">
            O gasto mensal é uma média prorrateada. Na prática alguns meses você não gasta nada em produtos e outros repõe 2–3 de uma vez. O transporte é o único gasto <strong className="text-foreground">verdadeiramente fixo</strong> todo mês.
          </div>
        </div>
      )}

      {/* Orçamento */}
      {activeSubTab === 'orcamento' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="section-title">Visão geral — R$700 mensais</p>
          <div className="grid grid-cols-2 gap-2">
            {finBudgetMetrics.map((m, i) => <FinMetric key={i} metric={m} />)}
          </div>

          <p className="section-title">Distribuição do orçamento — mês típico (mês 2+)</p>
          <div className="glass rounded-2xl p-4 mb-6">
            {finBudgetBars.map((bar, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5 font-mono uppercase tracking-wider">
                  <span>{bar.label}</span>
                  <span>{bar.value}</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${bar.width}%`, background: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="section-title">Projeção de poupança — 12 meses</p>
          {finBudgetCards.map((card, i) => (
            <div key={i} className="glass rounded-xl p-3 mb-2 flex justify-between items-start gap-4">
              <div>
                <div className="text-[13px] font-medium text-foreground mb-1">{card.title}</div>
                <div className="text-[11px] text-muted-foreground">{card.brand}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[16px] font-medium text-[var(--c-treino)]">{card.price}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{card.priceSub}</div>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <FinMetric metric={{ label: 'Poupança atual', value: 'R$ 2.450', valueColor: 'var(--c-treino)', sub: 'não precisa tocar — a bolsa cobre tudo' }} />
          </div>

          <div className="info-box">
            Sua mãe cobre moradia, alimentação e contas — isso é uma vantagem enorme. Com R$700, você cobre transporte + cuidado pessoal e ainda sobra mais da metade para guardar. Sem dívidas = você está em posição muito melhor do que a maioria dos universitários.
          </div>
        </div>
      )}

      {/* Estratégia */}
      {activeSubTab === 'estrategia' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="section-title">Como comprar — passo a passo</p>
          <div className="glass-strong rounded-2xl p-2">
            {finStrategyPhases.map((phase, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 mb-2 last:mb-0 rounded-xl border-l-4",
                  phase.ok ? "bg-[var(--surface-2)] border-l-[var(--c-treino)]" : "bg-background border-l-[var(--accent)]"
                )}
              >
                <div className={cn("text-[13px] font-medium mb-1.5", phase.ok ? "text-[var(--c-treino)]" : "text-foreground")}>
                  {phase.title}
                </div>
                <div className="text-[12px] text-muted-foreground leading-relaxed">
                  {phase.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
