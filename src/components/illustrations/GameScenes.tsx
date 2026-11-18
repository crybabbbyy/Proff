import React from 'react';
import { ItemIconId, WorkerAvatarId } from '../../types/game';
import { FaceGroup } from './Face';
import { ItemIconGroup } from './ItemIcons';
import { ProfessionAvatar } from './ProfessionIllustrations';

const NECK = '#F6CDB8';

const SceneSvg: React.FC<{ className?: string; children: React.ReactNode; label: string }> = ({
  className = 'w-full h-full',
  children,
  label,
}) => (
  <svg
    viewBox="0 0 600 340"
    className={className}
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label={label}
  >
    {children}
  </svg>
);

/** Язычок пламени с основанием в точке (x, y). */
const Flame: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0C-20 -6 -22 -34 -4 -60C-2 -40 14 -38 12 -16C18 -22 18 -30 16 -36C30 -20 24 0 0 0Z" fill="#F97316" />
    <path d="M0 0C-10 -4 -10 -20 0 -32C2 -20 10 -18 8 -6C8 -2 4 0 0 0Z" fill="#FDE047" />
  </g>
);

const Firefighter: React.FC<{ happy: boolean; withHose: boolean }> = ({ happy, withHose }) => (
  <g>
    <rect x="436" y="200" width="28" height="48" rx="10" fill={NECK} />
    <path d="M370 340C378 262 404 240 450 240C496 240 522 262 530 340Z" fill="#DC2626" />
    <rect x="392" y="290" width="116" height="12" rx="5" fill="#FDE047" />
    <g transform="translate(402 128) scale(0.8)">
      <FaceGroup emotion={happy ? 'joy' : 'surprise'} hair="none" />
    </g>
    <path d="M410 172C412 138 430 124 450 124C470 124 488 138 490 172Z" fill="#991B1B" />
    <rect x="402" y="166" width="96" height="9" rx="4" fill="#FBBF24" />
    <rect x="440" y="136" width="20" height="16" rx="4" fill="#FDE047" />
    {withHose && (
      <g>
        <path d="M470 330Q470 280 420 286Q390 290 384 252" stroke="#DC2626" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M378 256L372 236L388 232L392 252Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
      </g>
    )}
  </g>
);

/** Пожарный у горящего дома. После тушения огонь гаснет, из рукава идёт вода. */
export const FireScene: React.FC<{ done: boolean; className?: string }> = ({ done, className }) => (
  <SceneSvg className={className} label={done ? 'Пожар потушен' : 'Горит дом, рядом стоит пожарный'}>
    <rect width="600" height="340" fill={done ? '#E0F2FE' : '#FEE2E2'} />
    <rect y="290" width="600" height="50" fill="#86EFAC" />
    {/* Дом */}
    <rect x="60" y="130" width="220" height="165" fill="#FCA5A5" />
    <path d="M38 138L170 58L302 138Z" fill="#B91C1C" />
    <rect x="88" y="162" width="52" height="50" rx="4" fill={done ? '#BFDBFE' : '#FDBA74'} stroke="#FFFFFF" strokeWidth="4" />
    <rect x="200" y="162" width="52" height="50" rx="4" fill={done ? '#BFDBFE' : '#FDBA74'} stroke="#FFFFFF" strokeWidth="4" />
    <rect x="145" y="220" width="50" height="75" rx="4" fill="#7F1D1D" />
    {done ? (
      <g fill="#CBD5E1" opacity="0.9">
        <circle cx="130" cy="70" r="20" />
        <circle cx="156" cy="52" r="24" />
        <circle cx="190" cy="62" r="18" />
        <circle cx="226" cy="190" r="12" />
        <path d="M384 238Q320 110 240 150" stroke="#60A5FA" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.85" />
        <circle cx="236" cy="158" r="6" fill="#60A5FA" />
        <circle cx="222" cy="170" r="5" fill="#60A5FA" />
        <circle cx="248" cy="176" r="4" fill="#60A5FA" />
      </g>
    ) : (
      <g className="animate-pulse">
        <Flame x={110} y={110} s={1.1} />
        <Flame x={170} y={78} s={1.4} />
        <Flame x={232} y={112} s={1.1} />
        <Flame x={114} y={168} s={0.8} />
        <Flame x={226} y={168} s={0.8} />
      </g>
    )}
    <Firefighter happy={done} withHose={done} />
  </SceneSvg>
);

const Rescuer: React.FC = () => (
  <g>
    <rect x="456" y="200" width="28" height="48" rx="10" fill={NECK} />
    <path d="M390 340C398 262 424 240 470 240C516 240 542 262 550 340Z" fill="#EA580C" />
    <rect x="414" y="284" width="112" height="18" rx="6" fill="#FDE047" />
    <text x="470" y="298" textAnchor="middle" fill="#1E293B" fontSize="14" fontWeight="900" fontFamily="Nunito, sans-serif">
      МЧС
    </text>
    <g transform="translate(422 128) scale(0.8)">
      <FaceGroup emotion="neutral" hair="none" />
    </g>
    <path d="M430 172C432 138 450 124 470 124C490 124 508 138 510 172Z" fill="#F97316" />
    <rect x="422" y="166" width="96" height="9" rx="4" fill="#FB923C" />
  </g>
);

/** Человек провалился под лёд. После спасения он стоит на льду рядом со спасателем. */
export const IceRescueScene: React.FC<{ done: boolean; tool?: ItemIconId; className?: string }> = ({
  done,
  tool,
  className,
}) => (
  <SceneSvg className={className} label={done ? 'Человек спасён и стоит на льду' : 'Человек провалился под лёд'}>
    <rect width="600" height="340" fill="#DBEAFE" />
    <path d="M0 175Q150 155 300 175T600 170V340H0Z" fill="#F8FAFC" stroke="#BFDBFE" strokeWidth="3" />
    <ellipse cx="180" cy="262" rx="98" ry="40" fill="#1D4ED8" />
    <ellipse cx="180" cy="265" rx="80" ry="30" fill="#3B82F6" />
    <path d="M118 262Q140 252 160 262M200 270Q222 260 242 270" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" fill="none" />
    {!done && (
      <g>
        <path d="M150 256L128 206M210 256L232 206" stroke="#FDE2D2" strokeWidth="11" strokeLinecap="round" />
        <circle cx="127" cy="203" r="9" fill="#FDE2D2" />
        <circle cx="233" cy="203" r="9" fill="#FDE2D2" />
        <g transform="translate(141 182) scale(0.65)">
          <FaceGroup emotion="sadness" hair="default" tears />
        </g>
        <path d="M134 266Q180 250 226 266" stroke="#1D4ED8" strokeWidth="10" strokeLinecap="round" />
      </g>
    )}
    {done && (
      <g>
        {/* Предмет, которым вытащили человека: лежит на льду у проруби */}
        {tool === 'board' ? (
          <rect x="212" y="300" width="120" height="16" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="2.5" transform="rotate(8 272 308)" />
        ) : (
          <path d="M420 318Q360 336 300 324Q268 316 262 288" stroke="#A16207" strokeWidth="6" strokeLinecap="round" fill="none" />
        )}
        <rect x="312" y="236" width="20" height="32" rx="8" fill={NECK} />
        <path d="M282 336C288 286 302 266 322 266C342 266 356 286 362 336Z" fill="#2563EB" />
        <g transform="translate(290 186) scale(0.55)">
          <FaceGroup emotion="joy" hair="default" />
        </g>
        {/* Капли воды */}
        <g fill="#60A5FA">
          <path d="M276 292Q272 300 276 304Q280 300 276 292Z" />
          <path d="M370 296Q366 304 370 308Q374 304 370 296Z" />
        </g>
      </g>
    )}
    <Rescuer />
  </SceneSvg>
);

/** Открытый медицинский чемодан. Собранные предметы рисуются внутри. */
export const MedicalCaseScene: React.FC<{ items: ItemIconId[]; done: boolean; className?: string }> = ({
  items,
  done,
  className,
}) => (
  <SceneSvg className={className} label="Медицинский чемодан">
    <rect width="600" height="340" fill="#FFE4E6" />
    <rect y="292" width="600" height="48" fill="#FECDD3" />
    <rect x="240" y="20" width="120" height="22" rx="11" stroke="#991B1B" strokeWidth="10" />
    <rect x="140" y="36" width="320" height="120" rx="18" fill="#DC2626" />
    <rect x="285" y="62" width="30" height="74" rx="6" fill="#FFFFFF" />
    <rect x="263" y="84" width="74" height="30" rx="6" fill="#FFFFFF" />
    <rect x="120" y="150" width="360" height="150" rx="20" fill="#EF4444" />
    <rect x="140" y="166" width="320" height="118" rx="12" fill={done ? '#DCFCE7' : '#FFF1F2'} />
    {Array.from({ length: 4 }, (_, i) => {
      const id = items[i];
      const x = 152 + i * 76;
      return (
        <g key={i}>
          <rect x={x} y="186" width="68" height="78" rx="10" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="2" strokeDasharray={id ? undefined : '6 5'} />
          {id && (
            <g transform={`translate(${x + 4} 195) scale(0.94)`}>
              <ItemIconGroup id={id} />
            </g>
          )}
        </g>
      );
    })}
  </SceneSvg>
);

/** Аватар работника: профессии из игры + швея, продавец, водитель, повар. */
export const WorkerAvatar: React.FC<{ id: WorkerAvatarId; className?: string }> = ({
  id,
  className = 'w-16 h-16',
}) => {
  const extra: Record<string, { bg: string; body: string; top?: React.ReactNode; front?: React.ReactNode; hair?: string }> = {
    seamstress: {
      bg: '#FCE7F3',
      body: '#EC4899',
      hair: '#7C2D12',
      front: <path d="M44 80Q60 100 76 80" stroke="#FACC15" strokeWidth="4" fill="none" />,
      top: <circle cx="60" cy="24" r="10" fill="#7C2D12" />,
    },
    seller: {
      bg: '#DCFCE7',
      body: '#FFFFFF',
      hair: '#3E2723',
      front: <path d="M44 84H76V106H44Z" fill="#16A34A" />,
    },
    driver: {
      bg: '#E0F2FE',
      body: '#0369A1',
      top: (
        <g>
          <path d="M36 44C38 30 48 24 60 24C72 24 82 30 84 44Z" fill="#0C4A6E" />
          <rect x="34" y="41" width="56" height="6" rx="3" fill="#082F49" />
        </g>
      ),
      front: <circle cx="60" cy="96" r="9" stroke="#1E293B" strokeWidth="3.5" />,
    },
    cook: {
      bg: '#FFF7ED',
      body: '#FFFFFF',
      top: (
        <g fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5">
          <circle cx="46" cy="26" r="10" />
          <circle cx="60" cy="20" r="12" />
          <circle cx="74" cy="26" r="10" />
          <rect x="42" y="28" width="36" height="14" />
        </g>
      ),
      front: (
        <g fill="#F97316">
          <circle cx="56" cy="88" r="2.5" />
          <circle cx="64" cy="88" r="2.5" />
          <circle cx="56" cy="98" r="2.5" />
          <circle cx="64" cy="98" r="2.5" />
        </g>
      ),
    },
  };
  const conf = extra[id];
  if (!conf) {
    return <ProfessionAvatar professionId={id as Parameters<typeof ProfessionAvatar>[0]['professionId']} className={className} />;
  }
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill={conf.bg} />
      <rect x="53" y="66" width="14" height="16" rx="5" fill={NECK} />
      <path d="M24 106C27 84 42 78 60 78C78 78 93 84 96 106H24Z" fill={conf.body} stroke="#E5E7EB" strokeWidth={conf.body === '#FFFFFF' ? 2 : 0} />
      {conf.front}
      <rect x="38" y="36" width="44" height="38" rx="19" fill="#FDE2D2" />
      {conf.hair && (
        <path d="M35 50C35 32 47 25 60 25C73 25 85 32 85 50C77 41 68 38 60 40C52 38 43 41 35 50Z" fill={conf.hair} />
      )}
      {conf.top}
      <circle cx="49" cy="55" r="3" fill="#1E293B" />
      <circle cx="71" cy="55" r="3" fill="#1E293B" />
      <path d="M54 65C57 68 63 68 66 65" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
