import { useState, useEffect, useRef } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
const DAY_NUMS = [1, 2, 3, 4, 5, 6, 0];
const DAY_NAMES = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [fadeOut, setFadeOut] = useState(false);
  const [timeStr, setTimeStr] = useState('00:00');
  const startedRef = useRef(false);

  useEffect(() => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    setTimeStr(`${hh}:${mm}`);

    const STORAGE_KEY = 'rotina_boot_day';
    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    if (localStorage.getItem(STORAGE_KEY) === todayKey) {
      setFadeOut(true);
      setTimeout(onComplete, 100);
      return;
    }

    const timer = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;
      const targetDay = now.getDay();
      startScan(targetDay);
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const startScan = (targetDay: number) => {
    let scanOrder: number[];
    if (targetDay === 0) {
      scanOrder = [1, 2, 3, 4, 5, 0];
    } else if (targetDay === 6) {
      scanOrder = [1, 2, 3, 4, 5, 6];
    } else {
      scanOrder = [];
      for (let d = 1; d <= targetDay; d++) scanOrder.push(d);
    }

    let step = 0;
    const stepDuration = Math.min(300, 1500 / scanOrder.length);

    const advance = () => {
      if (step >= scanOrder.length) {
        finishScan();
        return;
      }
      if (step > 0) {
        setVisited(prev => new Set([...prev, scanOrder[step - 1]]));
      }
      setCurrentStep(scanOrder[step]);
      step++;
      setTimeout(advance, stepDuration);
    };

    advance();
  };

  const finishScan = () => {
    const STORAGE_KEY = 'rotina_boot_day';
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    localStorage.setItem(STORAGE_KEY, todayKey);

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, 400);
  };

  const getProgress = () => {
    if (currentStep === -1) return 0;
    const targetDay = new Date().getDay();
    let scanOrder: number[];
    if (targetDay === 0) scanOrder = [1, 2, 3, 4, 5, 0];
    else if (targetDay === 6) scanOrder = [1, 2, 3, 4, 5, 6];
    else { scanOrder = []; for (let d = 1; d <= targetDay; d++) scanOrder.push(d); }
    const idx = scanOrder.indexOf(currentStep);
    return ((idx + 1) / scanOrder.length) * 100;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        transition: 'opacity 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '4rem',
          fontWeight: 300,
          color: 'var(--text)',
          letterSpacing: '0.02em',
          opacity: 0,
          animation: 'bootTimeIn 0.5s ease 0.3s forwards',
        }}
      >
        {timeStr}
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          opacity: 0,
          animation: 'bootTimeIn 0.5s ease 0.5s forwards',
        }}
      >
        {currentStep >= 0 ? DAY_NAMES[DAY_NUMS.indexOf(currentStep)] : 'carregando...'}
      </div>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        {DAYS.map((day, i) => {
          const dayNum = DAY_NUMS[i];
          const isCurrent = currentStep === dayNum;
          const isVisited = visited.has(dayNum);
          return (
            <div
              key={day}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                borderRadius: '6px',
                border: isCurrent ? '1px solid var(--accent)' : isVisited ? '1px solid var(--border)' : '1px solid transparent',
                color: isCurrent ? 'var(--text)' : isVisited ? 'var(--text-secondary)' : 'var(--border)',
                background: isCurrent ? 'var(--surface)' : 'transparent',
                boxShadow: isCurrent ? '0 0 12px color-mix(in srgb, var(--accent) 25%, transparent)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          minHeight: '20px',
          letterSpacing: '0.05em',
          transition: 'all 0.2s ease',
        }}
      >
        {currentStep >= 0 ? '─' : ''}
      </div>

      <div style={{ width: '240px', height: '2px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${getProgress()}%`,
            background: 'var(--accent)',
            borderRadius: '2px',
            transition: 'width 0.25s ease',
          }}
        />
      </div>
    </div>
  );
}
