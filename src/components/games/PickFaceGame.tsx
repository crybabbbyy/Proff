import React, { useState } from 'react';
import { Emotion } from '../../types/game';
import { Face } from '../illustrations/Face';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { EMOTION_LABELS, GameShell, useShake } from './GameShell';

/** Показано слово-эмоция и три лица; нужно нажать на подходящее. */
export const PickFaceGame: React.FC<{
  title: string;
  instruction: string;
  word: string;
  target: Emotion;
  options: Emotion[];
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, word, target, options, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shakeId, shake] = useShake();

  const pick = (emotion: Emotion) => {
    if (done) return;
    if (emotion === target) {
      sound.playSuccess(soundEnabled);
      setDone(true);
      setFeedback(null);
    } else {
      sound.playError(soundEnabled);
      shake(emotion);
      setFeedback(`Это лицо показывает «${EMOTION_LABELS[emotion].toLowerCase()}». Найди лицо, на котором ${word.toLowerCase()}.`);
    }
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
      <div className="flex justify-center mb-5">
        <div className="px-8 py-4 rounded-[24px] bg-[#2E1065] text-amber-200 text-2xl sm:text-4xl font-black tracking-wide shadow-md">
          «{word}»
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((emotion, i) => {
          const isRight = done && emotion === target;
          return (
            <button
              key={emotion}
              type="button"
              disabled={done}
              onClick={() => pick(emotion)}
              aria-label={`Лицо ${i + 1}`}
              className={`flex items-center justify-center p-4 rounded-[24px] border-2 transition-colors ${
                isRight
                  ? 'bg-emerald-50 border-emerald-400'
                  : 'bg-[#F8F9FF] border-indigo-100 hover:border-violet-400 cursor-pointer disabled:cursor-default disabled:hover:border-indigo-100'
              } ${shakeId === emotion ? 'shake border-rose-400 bg-rose-50' : ''}`}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40">
                <Face emotion={emotion} hair="default" />
              </div>
            </button>
          );
        })}
      </div>
    </GameShell>
  );
};
