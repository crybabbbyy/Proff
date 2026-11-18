import React, { useState } from 'react';
import { EyeStyle, HairStyle } from '../../types/game';
import { Face, FaceEyesShape, FaceHairShape } from '../illustrations/Face';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { CheckButton, GameShell } from './GameShell';

const HAIR_OPTIONS: { id: HairStyle; label: string }[] = [
  { id: 'curly', label: 'Кудрявые волосы' },
  { id: 'spiky', label: 'Ёжик' },
];
const EYE_OPTIONS: { id: EyeStyle; label: string }[] = [
  { id: 'round', label: 'Круглые глаза' },
  { id: 'narrow', label: 'Прищуренные глаза' },
];

/** Миниатюра варианта: голова-силуэт и только причёска или только глаза. */
const OptionThumb: React.FC<{ hair?: HairStyle; eyes?: EyeStyle }> = ({ hair, eyes }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" aria-hidden="true">
    <circle cx="60" cy="66" r="40" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5 5" />
    {hair && <FaceHairShape hair={hair} />}
    {eyes && <FaceEyesShape eyes={eyes} />}
  </svg>
);

const OptionButton: React.FC<{
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, selected, disabled, onClick, children }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    aria-pressed={selected}
    className={`w-full flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-colors ${
      selected ? 'bg-violet-50 border-violet-600 shadow-md' : 'bg-white border-indigo-100 hover:border-violet-300'
    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
  >
    <div className="w-20 h-20 sm:w-24 sm:h-24">{children}</div>
    <span className="text-xs font-extrabold text-indigo-950 text-center">{label}</span>
  </button>
);

/** Фоторобот: подобрать причёску и глаза по фото «Воспоминания». */
export const PhotofitGame: React.FC<{
  title: string;
  instruction: string;
  target: { hair: HairStyle; eyes: EyeStyle };
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, target, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [hair, setHair] = useState<HairStyle | null>(null);
  const [eyes, setEyes] = useState<EyeStyle | null>(null);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const check = () => {
    if (!hair || !eyes) return;
    if (hair === target.hair && eyes === target.eyes) {
      sound.playSuccess(soundEnabled);
      setDone(true);
      setFeedback(null);
      return;
    }
    sound.playError(soundEnabled);
    setFeedback(
      hair !== target.hair && eyes !== target.eyes
        ? 'Не похоже. Сравни с фото и причёску, и глаза.'
        : hair !== target.hair
        ? 'Глаза подобраны верно, а причёска на фото другая.'
        : 'Причёска подобрана верно, а глаза на фото другие.'
    );
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
      action={<CheckButton disabled={!hair || !eyes} onClick={check} />}
    >
      <div className="relative rounded-[24px] bg-[#EEF2FF] border border-indigo-100 p-4 sm:p-6">
        {/* Эталонное фото в углу */}
        <figure className="mx-auto mb-4 sm:mb-0 sm:absolute sm:top-4 sm:right-4 w-32 sm:w-36 bg-[#FFFBEB] p-2 pb-1 rounded-lg shadow-md border border-amber-200 rotate-3">
          <div className="aspect-square bg-[#FEF3C7] rounded">
            <Face hair={target.hair} eyes={target.eyes} emotion="neutral" />
          </div>
          <figcaption className="text-center text-xs font-extrabold text-amber-900 py-1">
            Воспоминания
          </figcaption>
        </figure>

        {/* Телефон: лицо сверху, под ним причёски и глаза. Широкий экран: причёски | лицо | глаза */}
        <div className="grid grid-cols-2 sm:grid-cols-[minmax(0,140px)_minmax(0,260px)_minmax(0,140px)] gap-3 sm:gap-6 items-center justify-center">
          <div className="space-y-3 order-2 sm:order-1">
            <p className="text-xs font-extrabold text-indigo-900/60 text-center">Причёска</p>
            {HAIR_OPTIONS.map((o) => (
              <OptionButton
                key={o.id}
                label={o.label}
                selected={hair === o.id}
                disabled={done}
                onClick={() => {
                  sound.playClick(soundEnabled);
                  setHair(o.id);
                  setFeedback(null);
                }}
              >
                <OptionThumb hair={o.id} />
              </OptionButton>
            ))}
          </div>

          <div className="col-span-2 sm:col-span-1 order-1 sm:order-2 justify-self-center w-44 sm:w-full aspect-square rounded-[24px] bg-white border-4 border-white shadow-inner">
            <Face hair={hair ?? 'none'} eyes={eyes ?? 'none'} emotion="neutral" title="Фоторобот" />
          </div>

          <div className="space-y-3 order-3">
            <p className="text-xs font-extrabold text-indigo-900/60 text-center">Глаза</p>
            {EYE_OPTIONS.map((o) => (
              <OptionButton
                key={o.id}
                label={o.label}
                selected={eyes === o.id}
                disabled={done}
                onClick={() => {
                  sound.playClick(soundEnabled);
                  setEyes(o.id);
                  setFeedback(null);
                }}
              >
                <OptionThumb eyes={o.id} />
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    </GameShell>
  );
};
