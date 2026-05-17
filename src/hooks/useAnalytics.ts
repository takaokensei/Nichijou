import { useState, useEffect } from 'react';
import { getCheckinsByDateStr } from '@/lib/storage';
import { computeScore } from './useDailyScore';
import { scheduleMap, weekendSchedule } from '@/data/schedule';
import type { Category } from '@/data/schedule';

export interface AdherenceData {
  dateStr: string;
  shortDate: string;
  score: number;
}

export interface CategoryDistribution {
  category: string;
  value: number;
  fill: string;
}

export interface AnalyticsData {
  adherence: AdherenceData[];
  distribution: CategoryDistribution[];
  stats: {
    avgScore: number;
    bestDay: string;
    correlationTreino: number; // difference in avg score on days with vs without training
  };
}

function getCategoryBlocksForDay(dayNum: number): { idx: number; cat: Category }[] {
  const entry = scheduleMap[dayNum];
  if (!entry) return [];
  if (dayNum === 6) return weekendSchedule.days[0].blocks.map((b, i) => ({ idx: i, cat: b.category }));
  if (dayNum === 0) return weekendSchedule.days[1].blocks.map((b, i) => ({ idx: i + 100, cat: b.category }));
  return entry.blocks.map((b, i) => ({ idx: i, cat: b.category }));
}

export function useAnalytics(): AnalyticsData {
  const [data, setData] = useState<AnalyticsData>({ adherence: [], distribution: [], stats: { avgScore: 0, bestDay: '-', correlationTreino: 0 } });

  useEffect(() => {
    const compute = () => {
      const today = new Date();
      const adherence: AdherenceData[] = [];
      const catCount: Record<Category, number> = {
        aula: 0, treino: 0, pele: 0, cabelo: 0, refeicao: 0, sono: 0, estudo: 0, livre: 0
      };

      let sumScore = 0;
      let maxScore = -1;
      let bestDayLabel = '-';
      
      let sumScoreWithTreino = 0;
      let daysWithTreino = 0;
      let sumScoreWithoutTreino = 0;
      let daysWithoutTreino = 0;

      // 30 days lookback
      for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const shortDate = `${d.getDate()}/${d.getMonth() + 1}`;
        const dayNum = d.getDay();
        
        const checkins = getCheckinsByDateStr(dateStr);
        const { score } = computeScore(dayNum, checkins);
        
        adherence.push({ dateStr, shortDate, score });
        sumScore += score;
        
        if (score > maxScore) {
          maxScore = score;
          bestDayLabel = shortDate;
        }

        const dayBlocks = getCategoryBlocksForDay(dayNum);
        let hadTreino = false;
        
        for (const { idx, cat } of dayBlocks) {
          if (checkins[idx] === 'done') {
            catCount[cat] = (catCount[cat] || 0) + 1;
            if (cat === 'treino') hadTreino = true;
          }
        }
        
        if (dayBlocks.some(b => b.cat === 'treino')) {
          if (hadTreino) {
            sumScoreWithTreino += score;
            daysWithTreino++;
          } else {
            sumScoreWithoutTreino += score;
            daysWithoutTreino++;
          }
        }
      }

      const distribution = Object.entries(catCount)
        .filter(([, val]) => val > 0)
        .map(([cat, val]) => ({
          category: cat.charAt(0).toUpperCase() + cat.slice(1),
          value: val,
          fill: `var(--c-${cat})`
        }));
        
      const avgWith = daysWithTreino > 0 ? sumScoreWithTreino / daysWithTreino : 0;
      const avgWithout = daysWithoutTreino > 0 ? sumScoreWithoutTreino / daysWithoutTreino : 0;

      setData({
        adherence,
        distribution,
        stats: {
          avgScore: Math.round(sumScore / 30),
          bestDay: maxScore > 0 ? bestDayLabel : '-',
          correlationTreino: Math.round(avgWith - avgWithout),
        }
      });
    };

    compute();
    window.addEventListener('storage', compute);
    window.addEventListener('nexus:checkin-update', compute);
    return () => {
      window.removeEventListener('storage', compute);
      window.removeEventListener('nexus:checkin-update', compute);
    };
  }, []);

  return data;
}
