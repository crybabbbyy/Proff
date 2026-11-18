import React from 'react';
import { Emotion, EyeStyle, HairStyle } from '../../types/game';

export type FaceHair = HairStyle | 'default' | 'girl' | 'none';
export type FaceEyes = EyeStyle | 'normal' | 'none';

const SKIN = '#FDE2D2';
const INK = '#1E1B4B';
const MOUTH = '#9A3412';

/** Причёска. Рисуется поверх головы (кроме хвостиков девочки — они за головой). */
export const FaceHairShape: React.FC<{ hair: FaceHair }> = ({ hair }) => {
  switch (hair) {
    case 'curly':
      return (
        <g fill="#3E2723">
          <path d="M20 62C18 34 36 18 60 18C84 18 102 34 100 62C92 46 78 40 60 42C42 40 28 46 20 62Z" />
          <circle cx="24" cy="50" r="11" />
          <circle cx="32" cy="33" r="12" />
          <circle cx="47" cy="23" r="13" />
          <circle cx="64" cy="20" r="13" />
          <circle cx="80" cy="26" r="12" />
          <circle cx="92" cy="39" r="11" />
          <circle cx="97" cy="54" r="9" />
        </g>
      );
    case 'spiky':
      return (
        <path
          d="M20 60L22 32L34 42L38 16L50 34L60 10L70 34L82 16L86 42L98 32L100 60C90 46 78 40 60 42C42 40 30 46 20 60Z"
          fill="#F59E0B"
        />
      );
    case 'girl':
      return (
        <g>
          <path
            d="M20 64C18 34 36 18 60 18C84 18 102 34 100 64C96 50 86 40 60 40C34 40 24 50 20 64Z"
            fill="#7C2D12"
          />
          <path d="M60 22L48 12L50 30Z M60 22L72 12L70 30Z" fill="#EC4899" />
          <circle cx="60" cy="22" r="4" fill="#DB2777" />
        </g>
      );
    case 'default':
      return (
        <path
          d="M20 60C20 30 38 18 60 18C82 18 100 30 100 60C92 44 78 38 60 40C42 38 28 44 20 60Z"
          fill="#4E342E"
        />
      );
    default:
      return null;
  }
};

/** Глаза без эмоции (для фоторобота и спокойного лица). */
export const FaceEyesShape: React.FC<{ eyes: FaceEyes }> = ({ eyes }) => {
  switch (eyes) {
    case 'round':
      return (
        <g>
          <circle cx="44" cy="64" r="9" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
          <circle cx="76" cy="64" r="9" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
          <circle cx="44" cy="65" r="4.5" fill={INK} />
          <circle cx="76" cy="65" r="4.5" fill={INK} />
          <circle cx="45.5" cy="63" r="1.5" fill="#FFFFFF" />
          <circle cx="77.5" cy="63" r="1.5" fill="#FFFFFF" />
        </g>
      );
    case 'narrow':
      return (
        <g stroke={INK} strokeWidth="4" strokeLinecap="round">
          <path d="M35 64H53" />
          <path d="M67 64H85" />
          <path d="M34 55L52 58" strokeWidth="3.5" />
          <path d="M86 55L68 58" strokeWidth="3.5" />
        </g>
      );
    case 'normal':
      return (
        <g fill={INK}>
          <circle cx="44" cy="64" r="4.5" />
          <circle cx="76" cy="64" r="4.5" />
        </g>
      );
    default:
      return null;
  }
};

/** Брови, глаза и рот для эмоции. */
const EmotionFeatures: React.FC<{ emotion: Emotion; eyes: FaceEyes; tears?: boolean }> = ({
  emotion,
  eyes,
  tears,
}) => {
  switch (emotion) {
    case 'joy':
      return (
        <g>
          <path d="M36 66Q44 56 52 66M68 66Q76 56 84 66" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="80" r="7" fill="#FCA5A5" opacity="0.6" />
          <circle cx="88" cy="80" r="7" fill="#FCA5A5" opacity="0.6" />
          <path d="M42 82Q60 104 78 82Z" fill={MOUTH} />
          <path d="M50 92Q60 98 70 92Q60 88 50 92Z" fill="#F87171" />
        </g>
      );
    case 'anger':
      return (
        <g>
          {/* Покрасневшее лицо, сдвинутые брови, стиснутые зубы */}
          <circle cx="60" cy="66" r="40" fill="#EF4444" opacity="0.16" />
          <path d="M32 48L54 60M88 48L66 60" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="67" r="4.5" fill={INK} />
          <circle cx="76" cy="67" r="4.5" fill={INK} />
          <rect x="45" y="83" width="30" height="12" rx="4" fill="#FFFFFF" stroke={MOUTH} strokeWidth="3" />
          <path d="M45 89H75M53 83V95M60 83V95M67 83V95" stroke={MOUTH} strokeWidth="1.5" />
        </g>
      );
    case 'sadness':
      return (
        <g>
          <path d="M34 58L52 51M86 58L68 51" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <circle cx="44" cy="66" r="4" fill={INK} />
          <circle cx="76" cy="66" r="4" fill={INK} />
          <path d="M48 92Q60 82 72 92" stroke={MOUTH} strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M40 72Q36 80 40 84Q44 80 40 72Z" fill="#60A5FA" />
          {tears && <path d="M80 72Q76 82 80 87Q84 82 80 72Z" fill="#60A5FA" />}
        </g>
      );
    case 'surprise':
      return (
        <g>
          <path d="M34 48Q44 40 54 48M66 48Q76 40 86 48" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="44" cy="64" r="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
          <circle cx="76" cy="64" r="8" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
          <circle cx="44" cy="64" r="3.5" fill={INK} />
          <circle cx="76" cy="64" r="3.5" fill={INK} />
          <ellipse cx="60" cy="90" rx="7" ry="9" fill={MOUTH} />
        </g>
      );
    default:
      return (
        <g>
          <FaceEyesShape eyes={eyes} />
          <path d="M50 88Q60 93 70 88" stroke={MOUTH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
};

/**
 * Голова с эмоцией. Рисуется в системе координат 120×120;
 * для вставки в другую SVG-сцену используйте <FaceGroup> с transform.
 */
export const FaceGroup: React.FC<{
  emotion?: Emotion;
  hair?: FaceHair;
  eyes?: FaceEyes;
  tears?: boolean;
}> = ({ emotion = 'neutral', hair = 'default', eyes = 'normal', tears }) => (
  <g>
    {hair === 'girl' && (
      <g fill="#7C2D12">
        <circle cx="16" cy="80" r="12" />
        <circle cx="104" cy="80" r="12" />
      </g>
    )}
    <circle cx="20" cy="68" r="7" fill={SKIN} />
    <circle cx="100" cy="68" r="7" fill={SKIN} />
    <circle cx="60" cy="66" r="40" fill={SKIN} />
    <path d="M57 72Q60 78 63 72" stroke="#E7A98F" strokeWidth="3" strokeLinecap="round" fill="none" />
    <EmotionFeatures emotion={emotion} eyes={eyes} tears={tears} />
    <FaceHairShape hair={hair} />
  </g>
);

export const Face: React.FC<{
  emotion?: Emotion;
  hair?: FaceHair;
  eyes?: FaceEyes;
  tears?: boolean;
  className?: string;
  title?: string;
}> = ({ className = 'w-full h-full', title, ...rest }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" role={title ? 'img' : undefined} aria-label={title}>
    <FaceGroup {...rest} />
  </svg>
);
