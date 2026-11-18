import React, { useMemo, useRef, useState } from 'react';
import { WireColor } from '../../types/game';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { GameShell, shuffledOrder } from './GameShell';

const W = 600;
const H = 340;
const LEFT_X = 90;
const RIGHT_X = 510;
const HIT_RADIUS = 34;

type Pt = { x: number; y: number };

const rowY = (i: number, n: number) => 100 + (i * (H - 160)) / Math.max(n - 1, 1);

/** Соединить провода одного цвета слева и справа (как мини-игра с проводами). */
export const WiresGame: React.FC<{
  title: string;
  instruction: string;
  wires: WireColor[];
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, wires, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const svgRef = useRef<SVGSVGElement>(null);
  const [connected, setConnected] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [pointer, setPointer] = useState<Pt | null>(null);
  const [dragging, setDragging] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [flashWrong, setFlashWrong] = useState<string | null>(null);
  const done = connected.length === wires.length;

  // Справа провода стоят в другом порядке.
  const rightOrder = useMemo(() => {
    const order = shuffledOrder(wires, 11);
    // Гарантируем, что ни один провод не стоит напротив своего.
    return order.every((w, i) => w.id !== wires[i].id) ? order : [...wires.slice(1), wires[0]];
  }, [wires]);

  const leftPos = (id: string): Pt => ({ x: LEFT_X, y: rowY(wires.findIndex((w) => w.id === id), wires.length) });
  const rightPos = (id: string): Pt => ({ x: RIGHT_X, y: rowY(rightOrder.findIndex((w) => w.id === id), wires.length) });

  const toSvg = (e: React.PointerEvent): Pt => {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: p.x, y: p.y };
  };

  const hit = (p: Pt, side: 'left' | 'right') => {
    const list = side === 'left' ? wires : rightOrder;
    return list.find((w) => {
      const c = side === 'left' ? leftPos(w.id) : rightPos(w.id);
      return Math.hypot(c.x - p.x, c.y - p.y) < HIT_RADIUS && !connected.includes(w.id);
    });
  };

  const tryConnect = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      const next = [...connected, leftId];
      setConnected(next);
      setFeedback(null);
      if (next.length === wires.length) sound.playSuccess(soundEnabled);
      else sound.playDrop(soundEnabled);
    } else {
      sound.playError(soundEnabled);
      setFlashWrong(rightId);
      window.setTimeout(() => setFlashWrong(null), 450);
      setFeedback('Цвета не совпадают. Соединяй провода одинакового цвета.');
    }
    setActive(null);
    setPointer(null);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (done) return;
    const p = toSvg(e);
    const left = hit(p, 'left');
    if (left) {
      setActive(left.id);
      setPointer(p);
      setDragging(true);
      svgRef.current?.setPointerCapture(e.pointerId);
      sound.playClick(soundEnabled);
      return;
    }
    const right = hit(p, 'right');
    if (right && active) tryConnect(active, right.id);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) setPointer(toSvg(e));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const p = toSvg(e);
    const right = hit(p, 'right');
    if (right && active) {
      tryConnect(active, right.id);
      return;
    }
    // Отпустили на том же проводе слева — режим «нажми слева, потом справа».
    if (!(active && Math.hypot(leftPos(active).x - p.x, leftPos(active).y - p.y) < HIT_RADIUS)) {
      setActive(null);
    }
    setPointer(null);
  };

  const curve = (a: Pt, b: Pt) => {
    const mx = (a.x + b.x) / 2;
    return `M${a.x} ${a.y}C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
  };

  return (
    <GameShell
      title={title}
      instruction={instruction}
      feedback={feedback}
      success={done}
      successMessage={successMessage}
      nextLabel={nextLabel}
      onComplete={onComplete}
    >
      <div className="max-w-3xl mx-auto rounded-[24px] overflow-hidden border-4 border-indigo-50 aspect-[600/340] bg-[#1E293B]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full select-none"
          style={{ touchAction: 'none' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            setDragging(false);
            setActive(null);
            setPointer(null);
          }}
          role="img"
          aria-label="Щиток с проводами"
        >
          <rect x="24" y="24" width={W - 48} height={H - 48} rx="18" fill="#334155" stroke="#475569" strokeWidth="4" />
          {/* Лампа: загорается, когда всё соединено */}
          <circle cx={W / 2} cy="50" r="16" fill={done ? '#FDE047' : '#475569'} stroke="#1E293B" strokeWidth="3" />
          {done && <circle cx={W / 2} cy="50" r="28" fill="#FDE047" opacity="0.25" />}

          {/* Соединённые провода */}
          {connected.map((id) => {
            const w = wires.find((x) => x.id === id)!;
            return (
              <path key={id} d={curve(leftPos(id), rightPos(id))} stroke={w.color} strokeWidth="12" strokeLinecap="round" fill="none" />
            );
          })}
          {/* Провод, который тянут сейчас */}
          {active && pointer && (
            <path
              d={curve(leftPos(active), pointer)}
              stroke={wires.find((w) => w.id === active)!.color}
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          )}

          {/* Левые концы */}
          {wires.map((w, i) => {
            const y = rowY(i, wires.length);
            const isActive = active === w.id;
            return (
              <g key={`l-${w.id}`}>
                <rect x="24" y={y - 9} width={LEFT_X - 24} height="18" fill={w.color} />
                <rect
                  x={LEFT_X - 16}
                  y={y - 18}
                  width="32"
                  height="36"
                  rx="8"
                  fill={w.color}
                  stroke={isActive ? '#FFFFFF' : '#0F172A'}
                  strokeWidth={isActive ? 5 : 3}
                  className={isActive && !dragging ? 'animate-pulse' : undefined}
                />
              </g>
            );
          })}
          {/* Правые концы */}
          {rightOrder.map((w, i) => {
            const y = rowY(i, wires.length);
            return (
              <g key={`r-${w.id}`} className={flashWrong === w.id ? 'hidden-shake' : undefined} style={{ transformBox: 'fill-box' }}>
                <rect x={RIGHT_X} y={y - 9} width={W - 24 - RIGHT_X} height="18" fill={w.color} />
                <rect
                  x={RIGHT_X - 16}
                  y={y - 18}
                  width="32"
                  height="36"
                  rx="8"
                  fill={w.color}
                  stroke={flashWrong === w.id ? '#F43F5E' : '#0F172A'}
                  strokeWidth="3"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-3 text-center text-sm font-bold text-indigo-900/70">
        Соединено: {connected.length} из {wires.length}
      </p>
    </GameShell>
  );
};
