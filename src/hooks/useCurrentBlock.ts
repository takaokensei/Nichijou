import { useState, useEffect, useRef } from 'react';
import { getCurrentBlock } from '@/data/schedule';

export function useCurrentBlock() {
  const [currentBlock, setCurrentBlock] = useState<{ dayNum: number; idx: number; time: string; label: string } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const dayNum = now.getDay();
      const nowMins = now.getHours() * 60 + now.getMinutes();
      const cur = getCurrentBlock(dayNum, nowMins);
      if (cur) {
        setCurrentBlock({ dayNum, idx: cur.idx, time: cur.block.time, label: cur.block.label });
      } else {
        setCurrentBlock(null);
      }
    };

    update();
    intervalRef.current = setInterval(update, 60000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return currentBlock;
}
