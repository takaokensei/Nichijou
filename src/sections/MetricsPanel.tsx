import { useEffect, useState } from 'react';
import { useStreaks } from '@/hooks/useStreaks';
import { computeScore } from '@/hooks/useDailyScore';
import { getCheckinsByDateStr } from '@/lib/storage';
import { Flame, CalendarDays, Dumbbell, Moon, Sparkles, Book, Coffee, BookOpen, Scissors, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/data/schedule';

const CATEGORY_META: { key: Category; label: string; icon: React.ElementType; priority: boolean }[] = [
  { key: 'sono', label: 'Sono', icon: Moon, priority: true },
  { key: 'treino', label: 'Treino', icon: Dumbbell, priority: true },
  { key: 'pele', label: 'Pele', icon: Sparkles, priority: true },
  { key: 'estudo', label: 'Estudo', icon: Book, priority: true },
  { key: 'aula', label: 'Aula', icon: BookOpen, priority: false },
  { key: 'refeicao', label: 'Refeição', icon: Coffee, priority: false },
  { key: 'cabelo', label: 'Cabelo', icon: Scissors, priority: false },
  { key: 'livre', label: 'Livre', icon: Zap, priority: false },
];

function scoreColorBg(score: number): string {
  if (score >= 80) return 'bg-emerald-500 shadow-emerald-500/30';
  if (score >= 55) return 'bg-yellow-500 shadow-yellow-500/30';
  if (score >= 30) return 'bg-orange-500 shadow-orange-500/30';
  if (score > 0)   return 'bg-red-500 shadow-red-500/30';
  return 'bg-[var(--border)]';
}

interface PastDay { label: string; score: number; isToday: boolean }

function useWeeklyScores(): PastDay[] {
  const [days, setDays] = useState<PastDay[]>([]);
  useEffect(() => {
    const refresh = () => {
      const today = new Date();
      setDays(Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().slice(0, 10);
        const dayNum = d.getDay();
        const { score } = computeScore(dayNum, getCheckinsByDateStr(dateStr));
        return { label: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][dayNum], score, isToday: i === 6 };
      }));
    };
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('nexus:checkin-update', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('nexus:checkin-update', refresh);
    };
  }, []);
  return days;
}

export function MetricsPanel() {
  const streaks = useStreaks();
  const weeklyScores = useWeeklyScores();

  const priorityCats = CATEGORY_META.filter(c => c.priority);
  const allCats = CATEGORY_META;

  return (
    <div className="mb-8 space-y-3" style={{ animation: 'fadeIn 0.4s ease 0.1s both' }}>

      {/* ── Row 1: Streaks + Weekly Grid ──────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Streak System Card */}
        <div className="glass rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Flame size={13} className="text-orange-400 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-semibold">
              Streak System
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {priorityCats.map(({ key, label, icon: Icon }) => {
              const streak = streaks[key];
              const isHot = streak >= 3;
              return (
                <div
                  key={key}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-xl p-2.5 border transition-all duration-300",
                    streak > 0
                      ? "bg-[var(--surface-2)] border-[var(--border)]"
                      : "bg-[var(--surface)] border-[var(--border)] opacity-50"
                  )}
                  style={{ borderColor: streak > 0 ? `color-mix(in srgb, var(--c-${key}) 40%, var(--border))` : undefined }}
                >
                  <Icon
                    size={14}
                    style={{ color: streak > 0 ? `var(--c-${key})` : undefined }}
                    className={streak === 0 ? "text-[var(--text-secondary)]" : ""}
                  />
                  <span className={cn(
                    "font-display font-bold leading-none mt-1.5 tabular-nums",
                    streak >= 10 ? "text-xl" : "text-2xl",
                    streak > 0 ? "" : "text-[var(--text-secondary)]"
                  )}
                    style={{ color: streak > 0 ? `var(--c-${key})` : undefined }}
                  >
                    {streak}
                  </span>
                  <span className="font-mono text-[8px] tracking-widest uppercase text-[var(--text-secondary)] mt-0.5">
                    {isHot ? '🔥' : ''}{label.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly View Card */}
        <div className="glass rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={13} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-semibold">
                Weekly View
              </span>
            </div>
            <span className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">
              últ. 7 dias
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 flex-1 min-h-[72px]">
            {weeklyScores.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                {/* Bar chart */}
                <div className="w-full flex flex-col justify-end rounded-t-sm overflow-hidden" style={{ height: '52px', background: 'var(--border)' }}>
                  <div
                    className={cn(
                      "w-full rounded-t-sm transition-all duration-700 shadow-sm",
                      scoreColorBg(day.score)
                    )}
                    style={{ height: `${Math.max(day.score, 2)}%` }}
                  />
                </div>
                <span className={cn(
                  "font-mono text-[9px] uppercase tracking-wider",
                  day.isToday ? "text-[var(--accent)] font-bold" : "text-[var(--text-secondary)]"
                )}>
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Row 2: Category Legend ─────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
        {allCats.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-sm shrink-0"
              style={{ background: `var(--c-${key})` }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
              {label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
