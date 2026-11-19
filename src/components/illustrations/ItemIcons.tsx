import React from 'react';
import { ItemIconId } from '../../types/game';

/** Рисунки предметов для заданий. Все в системе координат 64×64. */
const ICONS: Record<ItemIconId, React.ReactNode> = {
  pointer: (
    <g strokeLinecap="round">
      <path d="M10 54L52 12" stroke="#D97706" strokeWidth="5" />
      <path d="M10 54L20 44" stroke="#78350F" strokeWidth="8" />
      <circle cx="53" cy="11" r="3.5" fill="#FDE68A" />
    </g>
  ),
  globe: (
    <g>
      <rect x="22" y="55" width="20" height="5" rx="2" fill="#92400E" />
      <rect x="30" y="46" width="4" height="10" fill="#92400E" />
      <circle cx="32" cy="27" r="18" fill="#60A5FA" />
      <path d="M20 18Q27 12 32 19Q30 27 23 27Q18 24 20 18Z" fill="#22C55E" />
      <path d="M36 28Q45 25 47 33Q42 40 36 36Q33 32 36 28Z" fill="#22C55E" />
      <path d="M12 30A20 20 0 0 0 46 44" stroke="#B45309" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  chalk: (
    <g>
      <rect x="10" y="26" width="38" height="10" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" transform="rotate(-20 29 31)" />
      <rect x="18" y="38" width="32" height="9" rx="3" fill="#FEF9C3" stroke="#E5D38A" strokeWidth="2" transform="rotate(-20 34 42)" />
    </g>
  ),
  textbooks: (
    <g>
      <rect x="10" y="44" width="44" height="11" rx="2" fill="#EF4444" />
      <rect x="14" y="33" width="38" height="11" rx="2" fill="#3B82F6" />
      <rect x="9" y="22" width="42" height="11" rx="2" fill="#10B981" />
      <path d="M12 49H50M16 38H48M12 27H46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </g>
  ),
  ball: (
    <g>
      <circle cx="32" cy="32" r="21" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2.5" />
      <path d="M32 23L40 29L37 38H27L24 29Z" fill="#1F2937" />
      <path d="M32 23V12M40 29L51 25M37 38L44 48M27 38L20 48M24 29L13 25" stroke="#1F2937" strokeWidth="2" />
    </g>
  ),
  comb: (
    <g>
      <rect x="8" y="20" width="48" height="11" rx="4" fill="#EC4899" />
      <path d="M12 30V46M18 30V46M24 30V46M30 30V46M36 30V46M42 30V46M48 30V46M53 30V44" stroke="#EC4899" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  flashlight: (
    <g>
      <rect x="6" y="26" width="32" height="13" rx="4" fill="#475569" />
      <path d="M38 23L52 17V48L38 42Z" fill="#64748B" />
      <rect x="51" y="17" width="6" height="31" rx="2" fill="#FDE68A" />
      <rect x="16" y="23" width="8" height="4" rx="1" fill="#EF4444" />
    </g>
  ),
  banana: (
    <g>
      <path d="M10 18Q14 50 50 52Q57 50 54 45Q24 42 20 16Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 18L15 13L20 16" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  ),
  rope: (
    <g fill="none" stroke="#A16207" strokeLinecap="round">
      <circle cx="28" cy="32" r="18" strokeWidth="5" />
      <circle cx="28" cy="32" r="11" strokeWidth="5" />
      <circle cx="28" cy="32" r="4" strokeWidth="4" />
      <path d="M46 32Q58 40 52 56" strokeWidth="5" />
    </g>
  ),
  board: (
    <g>
      <rect x="4" y="22" width="56" height="18" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="2.5" />
      <path d="M10 28H28M34 34H54M14 35H22" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="28" r="2" fill="#92400E" />
    </g>
  ),
  umbrella: (
    <g>
      <path d="M6 34Q32 4 58 34Q52 29 45 34Q38 29 32 34Q26 29 19 34Q12 29 6 34Z" fill="#8B5CF6" />
      <path d="M32 34V52Q32 59 25 57" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  ),
  fire_hose: (
    <g>
      <circle cx="26" cy="32" r="17" stroke="#DC2626" strokeWidth="8" fill="none" />
      <circle cx="26" cy="32" r="6" stroke="#B91C1C" strokeWidth="5" fill="none" />
      <path d="M40 42L48 48" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />
      <path d="M46 46L60 56L55 61L43 50Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1.5" />
    </g>
  ),
  axe: (
    <g>
      <path d="M16 56L44 12" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M36 8L56 16L50 32L32 22Z" fill="#DC2626" />
      <path d="M56 16L50 32" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  shovel: (
    <g>
      <rect x="23" y="4" width="18" height="6" rx="3" fill="#92400E" />
      <path d="M32 8V38" stroke="#B45309" strokeWidth="5" />
      <path d="M20 37H44V48Q32 64 20 48Z" fill="#64748B" stroke="#475569" strokeWidth="2" />
    </g>
  ),
  bucket: (
    <g>
      <path d="M14 22Q32 0 50 22" stroke="#475569" strokeWidth="3" fill="none" />
      <path d="M12 22H52L46 56H18Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="32" cy="22" rx="20" ry="4" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.5" />
    </g>
  ),
  stethoscope: (
    <g fill="none" strokeLinecap="round">
      <path d="M20 10V26Q20 40 32 40Q44 40 44 26V10" stroke="#334155" strokeWidth="4" />
      <path d="M32 40V46" stroke="#334155" strokeWidth="4" />
      <circle cx="20" cy="9" r="3.5" fill="#94A3B8" />
      <circle cx="44" cy="9" r="3.5" fill="#94A3B8" />
      <circle cx="32" cy="53" r="8" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
    </g>
  ),
  syringe: (
    <g transform="rotate(-35 32 32)">
      <path d="M4 32H14" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="25" width="30" height="14" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <rect x="16" y="28" width="18" height="8" fill="#38BDF8" />
      <path d="M44 32H55" stroke="#64748B" strokeWidth="3.5" />
      <rect x="54" y="23" width="5" height="18" rx="1.5" fill="#64748B" />
    </g>
  ),
  bandage: (
    <g>
      <path d="M32 50H58V58H32Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="30" cy="32" r="20" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
      <circle cx="30" cy="32" r="7" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M44 22V26M42 24H46" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  gloves: (
    <g fill="#93C5FD">
      <rect x="18" y="12" width="6" height="22" rx="3" />
      <rect x="25" y="8" width="6" height="26" rx="3" />
      <rect x="32" y="9" width="6" height="25" rx="3" />
      <rect x="39" y="13" width="6" height="21" rx="3" />
      <rect x="9" y="28" width="16" height="6" rx="3" transform="rotate(-35 17 31)" />
      <rect x="17" y="26" width="28" height="24" rx="8" />
      <rect x="17" y="48" width="28" height="10" rx="2" fill="#60A5FA" />
    </g>
  ),
  chocolate: (
    <g>
      <rect x="12" y="10" width="40" height="44" rx="3" fill="#78350F" />
      <path d="M12 21H52M12 32H52M25 10V32M38 10V32" stroke="#5B2A0A" strokeWidth="2" />
      <rect x="12" y="34" width="40" height="20" rx="2" fill="#DC2626" />
      <path d="M18 44H46" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  phone: (
    <g>
      <rect x="18" y="5" width="28" height="54" rx="6" fill="#1E293B" />
      <rect x="21" y="11" width="22" height="38" rx="2" fill="#60A5FA" />
      <circle cx="32" cy="54" r="2.5" fill="#64748B" />
    </g>
  ),
  keys: (
    <g>
      <circle cx="18" cy="18" r="10" stroke="#CA8A04" strokeWidth="4" fill="none" />
      <circle cx="30" cy="30" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="30" cy="30" r="2.5" fill="#CA8A04" />
      <path d="M35 35L55 55" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
      <path d="M47 47L52 42M52 52L57 47" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  folder: (
    <g>
      <path d="M6 14H24L29 19H58V52H6Z" fill="#D97706" />
      <rect x="11" y="12" width="38" height="28" rx="1" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M16 19H42M16 25H42M16 31H34" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="26" width="52" height="28" rx="2" fill="#FBBF24" />
    </g>
  ),
  scales: (
    <g>
      <path d="M32 10V52" stroke="#92400E" strokeWidth="3.5" />
      <rect x="20" y="52" width="24" height="6" rx="2" fill="#92400E" />
      <path d="M10 18H54" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 18L6 36M12 18L20 36M52 18L44 36M52 18L58 36" stroke="#B45309" strokeWidth="1.5" />
      <path d="M4 36Q13 46 22 36Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <path d="M42 36Q51 46 60 36Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="32" cy="10" r="4" fill="#FBBF24" />
    </g>
  ),
  pen: (
    <g transform="rotate(-40 32 32)">
      <rect x="8" y="27" width="38" height="10" rx="4" fill="#1D4ED8" />
      <path d="M46 27L58 32L46 37Z" fill="#E5E7EB" />
      <circle cx="57" cy="32" r="1.5" fill="#1E293B" />
      <path d="M14 27V22H30" stroke="#93C5FD" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  constitution: (
    <g>
      <rect x="13" y="6" width="38" height="52" rx="3" fill="#1E40AF" />
      <rect x="13" y="6" width="7" height="52" fill="#1E3A8A" />
      <circle cx="36" cy="24" r="8" fill="#FACC15" />
      <path d="M32 24L36 19L40 24L36 29Z" fill="#B45309" />
      <path d="M26 40H46M28 46H44" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  ice_cream: (
    <g>
      <path d="M20 30H44L32 60Z" fill="#D97706" />
      <path d="M24 36L38 50M36 32L28 48M22 32L34 44" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="25" cy="26" r="9" fill="#F9A8D4" />
      <circle cx="39" cy="26" r="9" fill="#FDE68A" />
      <circle cx="32" cy="15" r="9" fill="#C4B5FD" />
    </g>
  ),
  needle_thread: (
    <g>
      <rect x="10" y="12" width="28" height="6" rx="2" fill="#92400E" />
      <rect x="10" y="46" width="28" height="6" rx="2" fill="#92400E" />
      <rect x="14" y="18" width="20" height="28" fill="#F472B6" />
      <path d="M14 24H34M14 30H34M14 36H34M14 42H34" stroke="#DB2777" strokeWidth="1.5" />
      <path d="M44 6L54 56" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="45" cy="11" rx="1.5" ry="3" fill="#FFFFFF" transform="rotate(-11 45 11)" />
      <path d="M34 24Q48 22 45 11" stroke="#F472B6" strokeWidth="1.5" fill="none" />
    </g>
  ),
  watering_can: (
    <g>
      <path d="M16 26Q28 8 40 26" stroke="#16A34A" strokeWidth="4" fill="none" />
      <path d="M40 34L56 20" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
      <circle cx="57" cy="19" r="4" fill="#16A34A" />
      <rect x="10" y="26" width="32" height="28" rx="5" fill="#22C55E" />
      <path d="M58 26V30M54 28V33M61 24V27" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  toothbrush: (
    <g transform="rotate(-35 32 32)">
      <rect x="4" y="29" width="42" height="8" rx="4" fill="#0EA5E9" />
      <rect x="44" y="28" width="14" height="10" rx="2" fill="#0284C7" />
      <path d="M46 28V19M49 28V19M52 28V19M55 28V19" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
};

export const ItemIconGroup: React.FC<{ id: ItemIconId }> = ({ id }) => <>{ICONS[id]}</>;

export const ItemIcon: React.FC<{ id: ItemIconId; className?: string }> = ({
  id,
  className = 'w-12 h-12',
}) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
    {ICONS[id]}
  </svg>
);
