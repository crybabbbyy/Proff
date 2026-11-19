import React from 'react';
import { HiddenScene } from '../../types/game';
import { ItemIconGroup } from './ItemIcons';

/** id нужного предмета в любой сцене. */
export const HIDDEN_TARGET_ID = 'target';

interface PickProps {
  onPick: (id: string, label: string) => void;
  /** id предмета, который сейчас «трясётся» после неверного нажатия. */
  shakeId: string | null;
}

/** Кликабельный предмет сцены. Невидимый прямоугольник hit расширяет зону нажатия. */
const Obj: React.FC<
  PickProps & {
    id: string;
    label: string;
    hit?: [number, number, number, number];
    children: React.ReactNode;
  }
> = ({ id, label, hit, onPick, shakeId, children }) => (
  <g
    role="button"
    tabIndex={0}
    aria-label={label}
    onClick={() => onPick(id, label)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPick(id, label);
      }
    }}
    className={`cursor-pointer outline-none hover:brightness-105 focus-visible:brightness-110 ${shakeId === id ? 'hidden-shake' : ''}`}
    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
  >
    {children}
    {hit && <rect x={hit[0]} y={hit[1]} width={hit[2]} height={hit[3]} fill="transparent" />}
  </g>
);

const Classroom: React.FC<PickProps> = (p) => (
  <>
    <rect width="600" height="340" fill="#FEF9C3" />
    <rect y="252" width="600" height="88" fill="#FCD34D" />
    <Obj {...p} id="window" label="Окно">
      <rect x="28" y="38" width="112" height="132" rx="8" fill="#BAE6FD" stroke="#F59E0B" strokeWidth="8" />
      <path d="M84 38V170M28 104H140" stroke="#F59E0B" strokeWidth="6" />
    </Obj>
    <Obj {...p} id="board" label="Доска">
      <rect x="170" y="34" width="262" height="134" rx="8" fill="#065F46" stroke="#92400E" strokeWidth="9" />
      <text x="200" y="88" fill="#D1FAE5" fontSize="26" fontWeight="800" fontFamily="Nunito, sans-serif">2 + 3 = 5</text>
      <text x="200" y="128" fill="#D1FAE5" fontSize="22" fontWeight="700" fontFamily="Nunito, sans-serif">Тема урока: …</text>
    </Obj>
    <rect x="176" y="168" width="250" height="8" rx="2" fill="#78350F" />
    <Obj {...p} id="eraser" label="Губка для доски">
      <rect x="318" y="156" width="34" height="12" rx="3" fill="#64748B" />
      <rect x="318" y="156" width="34" height="5" rx="2" fill="#FBBF24" />
    </Obj>
    <Obj {...p} id="clock" label="Часы">
      <circle cx="500" cy="58" r="24" fill="#FFFFFF" stroke="#334155" strokeWidth="5" />
      <path d="M500 58V42M500 58L511 64" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    </Obj>
    <Obj {...p} id="map" label="Карта">
      <rect x="456" y="96" width="114" height="76" rx="4" fill="#DBEAFE" stroke="#94A3B8" strokeWidth="3" />
      <path d="M470 120Q490 106 504 122Q498 140 478 136Z M514 140Q536 126 556 140Q548 158 526 156Z" fill="#86EFAC" />
    </Obj>
    {/* Стол учителя */}
    <Obj {...p} id="desk" label="Стол учителя">
      <rect x="52" y="226" width="186" height="16" rx="3" fill="#92400E" />
      <rect x="62" y="242" width="12" height="62" fill="#78350F" />
      <rect x="216" y="242" width="12" height="62" fill="#78350F" />
    </Obj>
    <Obj {...p} id="books" label="Книги">
      <rect x="72" y="214" width="46" height="12" rx="2" fill="#EF4444" />
      <rect x="76" y="203" width="40" height="11" rx="2" fill="#3B82F6" />
      <rect x="70" y="193" width="44" height="10" rx="2" fill="#10B981" />
    </Obj>
    <Obj {...p} id="globe" label="Глобус">
      <g transform="translate(128 182) scale(0.75)">
        <ItemIconGroup id="globe" />
      </g>
    </Obj>
    <Obj {...p} id="apple" label="Яблоко">
      <circle cx="206" cy="215" r="11" fill="#EF4444" />
      <path d="M206 204Q208 198 213 197" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
    </Obj>
    {/* Парта ученика */}
    <Obj {...p} id="school_desk" label="Парта">
      <rect x="290" y="250" width="150" height="14" rx="3" fill="#B45309" />
      <rect x="300" y="264" width="10" height="56" fill="#78350F" />
      <rect x="420" y="264" width="10" height="56" fill="#78350F" />
    </Obj>
    <Obj {...p} id="notebook" label="Тетрадь">
      <rect x="340" y="240" width="40" height="10" rx="2" fill="#A78BFA" />
    </Obj>
    <Obj {...p} id="backpack" label="Рюкзак">
      <rect x="466" y="262" width="50" height="62" rx="14" fill="#8B5CF6" />
      <rect x="476" y="286" width="30" height="24" rx="6" fill="#7C3AED" />
      <path d="M478 262Q491 246 504 262" stroke="#5B21B6" strokeWidth="5" fill="none" />
    </Obj>
    <Obj {...p} id="bin" label="Мусорная корзина">
      <path d="M244 280H284L280 326H248Z" fill="#94A3B8" />
      <rect x="240" y="276" width="48" height="7" rx="3" fill="#64748B" />
    </Obj>
    <Obj {...p} id="plant" label="Цветок">
      <path d="M548 250L540 196M548 250L560 192M548 250L530 214M548 250L572 214" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
      <path d="M530 250H566L560 300H536Z" fill="#C2410C" />
    </Obj>
    <Obj {...p} id={HIDDEN_TARGET_ID} label="Мел" hit={[515, 267, 28, 13]}>
      <rect x="565" y="290" width="22" height="7" rx="2" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
    </Obj>
  </>
);

const Bench: React.FC<{ x: number }> = ({ x }) => (
  <g>
    <rect x={x} y="236" width="220" height="18" rx="4" fill="#78350F" />
    <rect x={x} y="262" width="220" height="16" rx="4" fill="#92400E" />
    <rect x={x + 12} y="278" width="12" height="46" fill="#5B2A0A" />
    <rect x={x + 196} y="278" width="12" height="46" fill="#5B2A0A" />
    <rect x={x + 104} y="278" width="12" height="46" fill="#5B2A0A" />
  </g>
);

const Courtroom: React.FC<PickProps> = (p) => (
  <>
    <rect width="600" height="340" fill="#EDE9FE" />
    <rect y="230" width="600" height="110" fill="#D6A26B" />
    <Obj {...p} id="window" label="Окно">
      <path d="M26 170V70Q26 36 66 36Q106 36 106 70V170Z" fill="#BFDBFE" stroke="#A78BFA" strokeWidth="7" />
      <path d="M66 36V170M26 104H106" stroke="#A78BFA" strokeWidth="5" />
    </Obj>
    <Obj {...p} id="clock" label="Часы">
      <circle cx="160" cy="58" r="20" fill="#FFFFFF" stroke="#334155" strokeWidth="4" />
      <path d="M160 58V45M160 58L170 62" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    </Obj>
    <Obj {...p} id="emblem" label="Герб">
      <circle cx="300" cy="52" r="30" fill="#FACC15" stroke="#CA8A04" strokeWidth="4" />
      <g transform="translate(280 32) scale(0.62)">
        <ItemIconGroup id="scales" />
      </g>
    </Obj>
    <Obj {...p} id="flag" label="Флаг" hit={[378, 22, 70, 148]}>
      <path d="M384 24V170" stroke="#64748B" strokeWidth="4" />
      <rect x="386" y="26" width="60" height="14" fill="#FFFFFF" stroke="#E5E7EB" />
      <rect x="386" y="40" width="60" height="14" fill="#2563EB" />
      <rect x="386" y="54" width="60" height="14" fill="#DC2626" />
    </Obj>
    <Obj {...p} id="chair" label="Кресло судьи">
      <rect x="268" y="88" width="64" height="50" rx="10" fill="#1E293B" />
    </Obj>
    <Obj {...p} id="judge_desk" label="Стол судьи">
      <rect x="186" y="122" width="228" height="106" rx="6" fill="#7C2D12" />
      <rect x="180" y="116" width="240" height="12" rx="4" fill="#92400E" />
      <rect x="276" y="150" width="48" height="48" rx="6" fill="#92400E" />
    </Obj>
    <Obj {...p} id="gavel" label="Молоток судьи">
      <rect x="352" y="96" width="30" height="13" rx="4" fill="#B45309" transform="rotate(-20 367 102)" />
      <path d="M366 106L392 114" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
    </Obj>
    <Obj {...p} id="bookcase" label="Шкаф с книгами">
      <rect x="474" y="76" width="104" height="156" rx="4" fill="#92400E" />
      <path d="M474 128H578M474 180H578" stroke="#78350F" strokeWidth="5" />
      <rect x="484" y="94" width="10" height="32" fill="#EF4444" />
      <rect x="496" y="98" width="10" height="28" fill="#3B82F6" />
      <rect x="508" y="92" width="10" height="34" fill="#10B981" />
      <rect x="486" y="146" width="10" height="32" fill="#F59E0B" />
      <rect x="498" y="150" width="10" height="28" fill="#8B5CF6" />
      <rect x="540" y="146" width="10" height="32" fill="#EF4444" />
    </Obj>
    <Obj {...p} id="plant" label="Цветок">
      <path d="M140 226L132 184M140 226L152 182M140 226L124 200M140 226L160 200" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
      <path d="M124 226H158L152 262H130Z" fill="#C2410C" />
    </Obj>
    <Obj {...p} id="bench_left" label="Скамейка">
      <Bench x={34} />
    </Obj>
    {/* Документ лежит под правой скамейкой */}
    <Obj {...p} id={HIDDEN_TARGET_ID} label="Документ" hit={[440, 280, 70, 46]}>
      <g transform="rotate(-8 474 302)">
        <rect x="454" y="288" width="40" height="30" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <path d="M460 296H488M460 302H488M460 308H480" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </Obj>
    <Obj {...p} id="bench_right" label="Скамейка">
      <Bench x={344} />
    </Obj>
  </>
);

export const HiddenObjectScene: React.FC<
  PickProps & { scene: HiddenScene; found: boolean; className?: string }
> = ({ scene, found, className = 'w-full h-full', ...pick }) => {
  const target = scene === 'classroom' ? { cx: 576, cy: 293, r: 20 } : { cx: 474, cy: 302, r: 38 };
  return (
    <svg viewBox="0 0 600 340" className={className} fill="none" preserveAspectRatio="xMidYMid meet">
      {scene === 'classroom' ? <Classroom {...pick} /> : <Courtroom {...pick} />}
      {found && (
        <circle cx={target.cx} cy={target.cy} r={target.r} stroke="#22C55E" strokeWidth="5" className="animate-pulse" />
      )}
    </svg>
  );
};
