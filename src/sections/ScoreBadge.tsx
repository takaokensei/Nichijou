import { useDailyScore } from '@/hooks/useDailyScore';
import { cn } from '@/lib/utils';

function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 55) return 'text-yellow-400';
  if (score >= 30) return 'text-orange-400';
  return 'text-red-400';
}

function scoreRing(score: number): string {
  if (score >= 80) return 'border-emerald-400/60';
  if (score >= 55) return 'border-yellow-400/60';
  if (score >= 30) return 'border-orange-400/60';
  return 'border-red-400/40';
}

interface ScoreBadgeProps {
  className?: string;
}

export function ScoreBadge({ className }: ScoreBadgeProps) {
  const { score, blocksDone, blocksTotal } = useDailyScore();

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background/40',
        scoreRing(score),
        className
      )}
      title={`${blocksDone}/${blocksTotal} blocos concluídos`}
    >
      {/* Mini arc progress */}
      <div className="relative w-5 h-5 shrink-0">
        <svg viewBox="0 0 20 20" className="w-full h-full -rotate-90">
          <circle
            cx="10" cy="10" r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-muted/30"
          />
          <circle
            cx="10" cy="10" r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={`${2 * Math.PI * 8}`}
            strokeDashoffset={`${2 * Math.PI * 8 * (1 - score / 100)}`}
            strokeLinecap="round"
            className={cn('transition-all duration-700', scoreColor(score))}
          />
        </svg>
      </div>

      <span className={cn('font-mono text-[11px] font-bold tracking-wider tabular-nums', scoreColor(score))}>
        {score}
        <span className="text-muted-foreground font-normal">/100</span>
      </span>
    </div>
  );
}
