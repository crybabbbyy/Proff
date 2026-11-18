import React, { useEffect, useRef, useState } from 'react';
import { FaceGroup } from '../illustrations/Face';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { GameShell } from './GameShell';

const NECK = '#F6CDB8';
// Где лежит сумка и куда она летит (в руки девочке).
const BAG_START = { x: 70, y: 262 };
const BAG_END = { x: 336, y: 228 };

type Phase = 'lost' | 'flying' | 'returned';

/** Полицейский: нажать на потерянную сумку — она перелетает к девочке, девочка перестаёт плакать. */
export const ReturnBagGame: React.FC<{
  title: string;
  instruction: string;
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [phase, setPhase] = useState<Phase>('lost');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const returnBag = () => {
    if (phase !== 'lost') return;
    sound.playDrop(soundEnabled);
    setPhase('flying');
    timer.current = window.setTimeout(() => {
      setPhase('returned');
      sound.playSuccess(soundEnabled);
    }, reduceMotion ? 0 : 900);
  };

  const bagPos = phase === 'lost' ? BAG_START : BAG_END;
  const happy = phase === 'returned';

  return (
    <GameShell
      title={title}
      instruction={instruction}
      success={happy}
      successMessage={successMessage}
      nextLabel={nextLabel}
      onComplete={onComplete}
    >
      <div className="rounded-[24px] overflow-hidden border-4 border-indigo-50 aspect-[600/340]">
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full"
          fill="none"
          role="img"
          aria-label={happy ? 'Девочка получила сумку и улыбается' : 'Девочка плачет, рядом полицейский, на земле лежит сумка'}
        >
          {/* Улица */}
          <rect width="600" height="340" fill="#E0E7FF" />
          <rect x="20" y="60" width="90" height="190" rx="6" fill="#C7D2FE" />
          <rect x="126" y="100" width="80" height="150" rx="6" fill="#A5B4FC" />
          <rect x="490" y="80" width="96" height="170" rx="6" fill="#C7D2FE" />
          <rect y="250" width="600" height="90" fill="#CBD5E1" />
          <rect y="246" width="600" height="8" fill="#94A3B8" />
          {/* Скамейка */}
          <rect x="30" y="226" width="130" height="10" rx="3" fill="#92400E" />
          <rect x="40" y="236" width="8" height="34" fill="#78350F" />
          <rect x="142" y="236" width="8" height="34" fill="#78350F" />

          {/* Девочка */}
          <rect x="292" y="176" width="18" height="26" rx="7" fill={NECK} />
          <path d="M262 312L276 214Q301 196 326 214L340 312Z" fill="#EC4899" />
          <rect x="280" y="312" width="12" height="20" fill={NECK} />
          <rect x="310" y="312" width="12" height="20" fill={NECK} />
          {happy ? (
            <path d="M326 222L342 236" stroke={NECK} strokeWidth="10" strokeLinecap="round" />
          ) : (
            <path d="M326 222L316 196" stroke={NECK} strokeWidth="10" strokeLinecap="round" />
          )}
          <path d="M276 222L262 250" stroke={NECK} strokeWidth="10" strokeLinecap="round" />
          <g transform="translate(253 100) scale(0.8)">
            <FaceGroup emotion={happy ? 'joy' : 'sadness'} hair="girl" tears={!happy} />
          </g>

          {/* Полицейский */}
          <rect x="446" y="168" width="28" height="44" rx="10" fill={NECK} />
          <path d="M380 340C388 258 414 232 460 232C506 232 532 258 540 340Z" fill="#1E3A8A" />
          <circle cx="488" cy="276" r="8" fill="#FBBF24" />
          <g transform="translate(412 96) scale(0.8)">
            <FaceGroup emotion={happy ? 'joy' : 'neutral'} hair="none" />
          </g>
          <path d="M418 140C420 108 438 96 460 96C482 96 500 108 502 140Z" fill="#1D4ED8" />
          <rect x="410" y="136" width="100" height="10" rx="5" fill="#0F172A" />
          <circle cx="460" cy="116" r="7" fill="#FBBF24" />

          {/* Сумка */}
          <g
            role="button"
            tabIndex={phase === 'lost' ? 0 : -1}
            aria-label="Потерянная сумка"
            onClick={returnBag}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                returnBag();
              }
            }}
            style={{
              transform: `translate(${bagPos.x}px, ${bagPos.y}px)`,
              transition: reduceMotion ? undefined : 'transform 0.9s cubic-bezier(0.34, 1.2, 0.64, 1)',
              cursor: phase === 'lost' ? 'pointer' : 'default',
              outline: 'none',
            }}
          >
            {phase === 'lost' && (
              <circle cx="22" cy="20" r="34" fill="#FDE047" opacity="0.45" className="animate-pulse" />
            )}
            <path d="M8 12Q22 -8 36 12" stroke="#7C2D12" strokeWidth="4" fill="none" />
            <rect x="0" y="10" width="44" height="32" rx="7" fill="#A855F7" />
            <rect x="0" y="10" width="44" height="12" rx="6" fill="#9333EA" />
            <circle cx="22" cy="22" r="3.5" fill="#FDE047" />
          </g>
        </svg>
      </div>
      {phase === 'lost' && (
        <p className="mt-3 text-center text-sm font-bold text-indigo-900/70">
          Сумка подсвечена. Нажми на неё!
        </p>
      )}
    </GameShell>
  );
};
