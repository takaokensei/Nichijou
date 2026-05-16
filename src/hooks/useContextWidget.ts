import { useState, useEffect, useRef } from 'react';
import { getCurrentBlock, getNextBlocks, toMins, scheduleMap, ScheduleBlock } from '@/data/schedule';

export interface ContextData {
  currentBlock: ScheduleBlock | null;
  nextBlocks: ScheduleBlock[];
  progress: number; // 0 to 100
  countdownMins: number | null;
  isOutOfRoutine: boolean;
  timeToNextBlock: string | null;
}

export function useContextWidget(): ContextData {
  const [data, setData] = useState<ContextData>({
    currentBlock: null,
    nextBlocks: [],
    progress: 0,
    countdownMins: null,
    isOutOfRoutine: true,
    timeToNextBlock: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const dayNum = now.getDay();
      const nowMins = now.getHours() * 60 + now.getMinutes();
      const cur = getCurrentBlock(dayNum, nowMins);
      const entry = scheduleMap[dayNum];

      if (cur && entry) {
        const startMins = toMins(cur.block.time);
        const nextBlock = entry.blocks[cur.idx + 1];
        const endMins = nextBlock ? toMins(nextBlock.time) : 24 * 60;
        
        const duration = endMins - startMins;
        const elapsed = nowMins - startMins;
        const progress = Math.min(100, Math.max(0, (elapsed / duration) * 100));
        
        const countdownMins = endMins - nowMins;
        const h = Math.floor(countdownMins / 60);
        const m = countdownMins % 60;
        const timeToNextBlock = nextBlock ? `${h > 0 ? `${h}h ` : ''}${m}min` : null;

        setData({
          currentBlock: cur.block,
          nextBlocks: getNextBlocks(dayNum, cur.idx, 3),
          progress,
          countdownMins,
          isOutOfRoutine: false,
          timeToNextBlock,
        });
      } else {
        // Out of routine
        let timeToNext = null;
        if (entry && entry.blocks.length > 0) {
          const firstBlockTime = toMins(entry.blocks[0].time);
          if (nowMins < firstBlockTime) {
            const diff = firstBlockTime - nowMins;
            const h = Math.floor(diff / 60);
            const m = diff % 60;
            timeToNext = `${h > 0 ? `${h}h ` : ''}${m}min`;
          }
        }

        setData({
          currentBlock: null,
          nextBlocks: entry ? entry.blocks.slice(0, 3) : [],
          progress: 0,
          countdownMins: null,
          isOutOfRoutine: true,
          timeToNextBlock: timeToNext,
        });
      }
    };

    update();
    intervalRef.current = setInterval(update, 30000); // Update every 30s as per master plan
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return data;
}
