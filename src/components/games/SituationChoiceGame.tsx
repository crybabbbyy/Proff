import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { SituationOption } from '../../types/game';
import { WorkerAvatar } from '../illustrations/GameScenes';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { CheckButton, GameShell } from './GameShell';

/** Выбрать из ряда работников всех, кто нужен в ситуации, и нажать «Проверить». */
export const SituationChoiceGame: React.FC<{
  title: string;
  instruction: string;
  options: SituationOption[];
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, options, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const correctCount = options.filter((o) => o.isCorrect).length;

  const toggle = (id: string) => {
    if (done) return;
    sound.playClick(soundEnabled);
    setChecked(false);
    setFeedback(null);
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const check = () => {
    setChecked(true);
    const chosen = options.filter((o) => selected.includes(o.id));
    const wrong = chosen.find((o) => !o.isCorrect);
    if (wrong) {
      sound.playError(soundEnabled);
      setFeedback(wrong.feedback);
      return;
    }
    if (chosen.length < correctCount) {
      sound.playError(soundEnabled);
      const left = correctCount - chosen.length;
      setFeedback(`Верно, но выбраны не все. Нужен ещё ${left === 1 ? 'один сотрудник' : `${left} сотрудника`}.`);
      return;
    }
    sound.playSuccess(soundEnabled);
    setDone(true);
    setFeedback(null);
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
      action={<CheckButton disabled={selected.length === 0} onClick={check} />}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((o) => {
          const isSel = selected.includes(o.id);
          const showWrong = checked && isSel && !o.isCorrect;
          const showRight = (checked || done) && isSel && o.isCorrect;
          return (
            <button
              key={o.id}
              type="button"
              disabled={done}
              onClick={() => toggle(o.id)}
              aria-pressed={isSel}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-colors ${
                showWrong
                  ? 'bg-rose-50 border-rose-400'
                  : showRight
                  ? 'bg-emerald-50 border-emerald-400'
                  : isSel
                  ? 'bg-violet-50 border-violet-600 shadow-md'
                  : 'bg-[#F8F9FF] border-indigo-100 hover:border-violet-300'
              } ${done ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span
                className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showWrong
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : showRight
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isSel
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-white border-indigo-200'
                }`}
              >
                {showWrong ? <X className="w-3.5 h-3.5" /> : isSel ? <Check className="w-3.5 h-3.5" /> : null}
              </span>
              <WorkerAvatar id={o.avatar} className="w-16 h-16 sm:w-20 sm:h-20" />
              <span className="font-extrabold text-sm text-indigo-950 text-center leading-tight">{o.label}</span>
            </button>
          );
        })}
      </div>
    </GameShell>
  );
};
