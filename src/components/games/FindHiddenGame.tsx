import React, { useState } from 'react';
import { HiddenScene } from '../../types/game';
import { HIDDEN_TARGET_ID, HiddenObjectScene } from '../illustrations/HiddenScenes';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { GameShell, useShake } from './GameShell';

/** После стольких промахов показываем подсказку. */
const HINT_AFTER_MISSES = 3;

/** Найти и нажать на спрятанный в интерьере предмет (мел в классе, документ в суде). */
export const FindHiddenGame: React.FC<{
  title: string;
  instruction: string;
  scene: HiddenScene;
  targetLabel: string;
  hint: string;
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, scene, targetLabel, hint, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [found, setFound] = useState(false);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shakeId, shake] = useShake();

  const onPick = (id: string, label: string) => {
    if (found) return;
    if (id === HIDDEN_TARGET_ID) {
      sound.playSuccess(soundEnabled);
      setFound(true);
      setFeedback(null);
      return;
    }
    sound.playError(soundEnabled);
    shake(id);
    const n = misses + 1;
    setMisses(n);
    setFeedback(
      n >= HINT_AFTER_MISSES
        ? `Это ${label.toLowerCase()}, а нам нужен предмет «${targetLabel}». Подсказка: ${hint.charAt(0).toLowerCase()}${hint.slice(1)}`
        : `Это ${label.toLowerCase()}, а нам нужен предмет «${targetLabel}». Ищи дальше!`
    );
  };

  return (
    <GameShell
      title={title}
      instruction={instruction}
      feedback={feedback}
      success={found}
      successMessage={successMessage}
      nextLabel={nextLabel}
      onComplete={onComplete}
    >
      <div className="rounded-[24px] overflow-hidden border-4 border-indigo-50 aspect-[600/340] bg-white">
        <HiddenObjectScene scene={scene} found={found} onPick={onPick} shakeId={shakeId} />
      </div>
    </GameShell>
  );
};
