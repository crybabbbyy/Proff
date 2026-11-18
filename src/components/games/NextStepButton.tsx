import React from 'react';
import { ChevronRight } from 'lucide-react';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';

/**
 * Кнопка, которая появляется на месте «Проверить» после успешной проверки задания
 * и сразу ведёт дальше (к следующей профессии или локации).
 */
export const NextStepButton: React.FC<{
  label: string;
  onClick: () => void;
  className?: string;
}> = ({ label, onClick, className = '' }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  return (
    <button
      type="button"
      onClick={() => {
        sound.playClick(soundEnabled);
        onClick();
      }}
      className={`px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${className}`}
    >
      <span>{label}</span>
      <ChevronRight className="w-5 h-5 shrink-0" />
    </button>
  );
};
