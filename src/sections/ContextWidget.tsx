import { useContextWidget } from '@/hooks/useContextWidget';
import { Clock, ArrowRight, Zap, Coffee, BookOpen, Dumbbell, Sparkles, Moon, HelpCircle, Book, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/data/schedule';

const categoryIcons: Record<Category, React.ElementType> = {
  aula: BookOpen,
  treino: Dumbbell,
  pele: Sparkles,
  cabelo: Scissors,
  refeicao: Coffee,
  sono: Moon,
  estudo: Book,
  livre: Zap,
};

export function ContextWidget() {
  const { currentBlock, nextBlocks, progress, timeToNextBlock, isOutOfRoutine } = useContextWidget();

  const Icon = currentBlock ? categoryIcons[currentBlock.category] : HelpCircle;
  const catKey = currentBlock?.category ?? null;

  return (
    <div className="fixed bottom-5 right-5 w-72 z-50" style={{ animation: 'slideUp 0.5s ease both' }}>
      <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden glow-accent">

        {/* ── Accent top bar */}
        <div
          className="h-0.5 w-full"
          style={{
            background: catKey
              ? `var(--c-${catKey})`
              : 'var(--accent)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* ── Current Block ───────────────────────────────── */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between gap-2 mb-3">
            {/* Icon + status */}
            <div className="flex items-center gap-2">
              <div
                className="p-2 rounded-xl shrink-0"
                style={{
                  background: catKey ? `color-mix(in srgb, var(--c-${catKey}) 15%, transparent)` : 'var(--surface-2)',
                  color: catKey ? `var(--c-${catKey})` : 'var(--text-secondary)',
                }}
              >
                <Icon size={15} />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[var(--text-secondary)] block leading-none mb-1">
                  {isOutOfRoutine ? '⚠ Fora de Rotina' : '● Agora'}
                </span>
                <h3 className="font-sans text-sm font-semibold text-[var(--text)] leading-tight">
                  {currentBlock?.label ?? 'Sem bloco mapeado'}
                </h3>
              </div>
            </div>

            {/* Countdown pill */}
            {timeToNextBlock && (
              <div
                className="shrink-0 px-2 py-1 rounded-full font-mono text-[9px] font-bold tracking-wider border"
                style={{
                  color: catKey ? `var(--c-${catKey})` : 'var(--accent)',
                  borderColor: catKey ? `color-mix(in srgb, var(--c-${catKey}) 30%, transparent)` : 'var(--accent)',
                  background: catKey ? `color-mix(in srgb, var(--c-${catKey}) 10%, transparent)` : 'transparent',
                }}
              >
                {timeToNextBlock}
              </div>
            )}
          </div>

          {currentBlock?.sub && (
            <p className="text-[10px] text-[var(--text-secondary)] line-clamp-1 mb-3 font-sans leading-relaxed">
              {currentBlock.sub}
            </p>
          )}

          {/* Progress bar */}
          {!isOutOfRoutine && (
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[8px] text-[var(--text-secondary)] uppercase tracking-wider">
                <span>Progresso</span>
                <span className="font-bold" style={{ color: catKey ? `var(--c-${catKey})` : 'var(--accent)' }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 w-full bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${progress}%`,
                    background: catKey ? `var(--c-${catKey})` : 'var(--accent)',
                    boxShadow: catKey ? `0 0 8px color-mix(in srgb, var(--c-${catKey}) 50%, transparent)` : undefined,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Próximos ────────────────────────────────────── */}
        <div className="border-t border-[var(--border)] px-3 pb-3 pt-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <ArrowRight size={10} className="text-[var(--text-secondary)]" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Próximos</span>
          </div>

          <div className="space-y-1">
            {nextBlocks.length > 0 ? nextBlocks.map((block, i) => {
              const NextIcon = categoryIcons[block.category];
              return (
                <div key={i} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors group">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 flex items-center justify-center rounded-md shrink-0"
                      style={{ background: `color-mix(in srgb, var(--c-${block.category}) 15%, transparent)` }}
                    >
                      <NextIcon size={11} style={{ color: `var(--c-${block.category})` }} />
                    </div>
                    <span className="text-[10px] font-medium text-[var(--text)] group-hover:translate-x-0.5 transition-transform">
                      {block.label}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[var(--text-secondary)] tabular-nums">
                    {block.time}
                  </span>
                </div>
              );
            }) : (
              <p className="text-[9px] text-center py-2 text-[var(--text-secondary)] italic font-mono">
                Fim do dia — boa noite.
              </p>
            )}
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────── */}
        <div className="px-4 py-2 flex items-center justify-center gap-2 border-t border-[var(--border)] bg-[var(--accent)]/5">
          <Clock size={9} style={{ color: 'var(--accent)' }} />
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold" style={{ color: 'var(--accent)' }}>
            NEXUS · Sistema Ativo
          </span>
        </div>

      </div>
    </div>
  );
}
