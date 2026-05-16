import { useContextWidget } from '@/hooks/useContextWidget';
import { Clock, ArrowRight, Zap, Coffee, Book, Dumbbell, Sparkles, Moon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/data/schedule';

const categoryIcons: Record<Category, any> = {
  aula: Book,
  treino: Dumbbell,
  pele: Sparkles,
  cabelo: Sparkles,
  refeicao: Coffee,
  sono: Moon,
  estudo: Book,
  livre: Zap,
};

export function ContextWidget() {
  const { currentBlock, nextBlocks, progress, timeToNextBlock, isOutOfRoutine } = useContextWidget();

  const Icon = currentBlock ? categoryIcons[currentBlock.category] : HelpCircle;

  return (
    <div className="fixed bottom-6 right-6 w-80 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden glassmorphism">
        {/* Header / Current Block */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-1.5 rounded-lg",
                currentBlock ? `bg-[var(--c-${currentBlock.category})] text-white` : "bg-muted text-muted-foreground"
              )}>
                <Icon size={16} />
              </div>
              <span className="font-caption text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                {isOutOfRoutine ? "Fora de Rotina" : "Agora"}
              </span>
            </div>
            {timeToNextBlock && (
              <span className="font-mono text-[11px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                próximo em {timeToNextBlock}
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-semibold leading-tight mb-1 text-foreground">
            {currentBlock ? currentBlock.label : "Horário não mapeado"}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 font-sans">
            {currentBlock ? currentBlock.sub : "Aproveite o tempo livre ou planeje o próximo bloco."}
          </p>

          {!isOutOfRoutine && (
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                <span>Progresso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Next Blocks */}
        <div className="p-3 bg-muted/30">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <ArrowRight size={12} className="text-muted-foreground" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Próximos</span>
          </div>
          <div className="space-y-1">
            {nextBlocks.length > 0 ? nextBlocks.map((block, i) => {
              const NextIcon = categoryIcons[block.category];
              return (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex items-center justify-center p-1 rounded-md",
                      `bg-[var(--c-${block.category})] text-white`
                    )}>
                      {NextIcon ? <NextIcon size={10} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <span className="text-[11px] font-medium text-foreground group-hover:translate-x-0.5 transition-transform">
                      {block.label}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {block.time}
                  </span>
                </div>
              );
            }) : (
              <div className="text-[10px] text-center py-2 text-muted-foreground italic">
                Sem mais blocos para hoje
              </div>
            )}
          </div>
        </div>

        {/* Live Clock Footer */}
        <div className="px-4 py-2 bg-accent/5 flex items-center justify-center gap-2 border-t border-border/30">
          <Clock size={12} className="text-accent" />
          <span className="font-mono text-[10px] text-accent tracking-widest font-bold">
            SYSTEM STATUS: ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
