import { useDailyScore } from '@/hooks/useDailyScore';
import { cn } from '@/lib/utils';

function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 55) return 'text-yellow-400';
  if (score >= 30) return 'text-orange-400';
  return 'text-red-400';
}

function scoreRing(score: number): string {
  if (score >= 80) return 'border-emerald-400/50 shadow-emerald-500/10';
  if (score >= 55) return 'border-yellow-400/50 shadow-yellow-500/10';
  if (score >= 30) return 'border-orange-400/50 shadow-orange-500/10';
  return 'border-red-400/30 shadow-red-500/10';
}

interface ScoreBadgeProps {
  className?: string;
}

export function ScoreBadge({ className }: ScoreBadgeProps) {
  const { score, blocksDone, blocksTotal } = useDailyScore();
  const circumference = 2 * Math.PI * 8;

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg transition-all duration-500',
        'bg-[var(--surface)]/60 backdrop-blur-sm',
        scoreRing(score),
        className
      )}
      title={`${blocksDone}/${blocksTotal} blocos concluídos hoje`}
    >
      {/* Circular Progress */}
      <div className="relative w-5 h-5 shrink-0">
        <svg viewBox="0 0 20 20" className="w-full h-full -rotate-90">
          <circle
            cx="10" cy="10" r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-[var(--border)]"
          />
          <circle
            cx="10" cy="10" r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            strokeLinecap="round"
            className={cn('transition-all duration-700', scoreColor(score))}
          />
        </svg>
      </div>

      <span className={cn('font-mono text-[11px] font-bold tracking-widest tabular-nums', scoreColor(score))}>
        {score}
        <span className="text-[var(--text-secondary)] font-normal text-[9px]">/100</span>
      </span>
    </div>
  );
}
