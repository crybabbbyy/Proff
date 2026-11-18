import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';

interface StepHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  currentStep,
  totalSteps,
  onBack,
}) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  return (
    <div className="flex items-center justify-between gap-4 mb-5">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => {
            sound.playClick(soundEnabled);
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-indigo-50 text-indigo-950 font-extrabold text-xs sm:text-sm shadow-xs border border-indigo-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-violet-600" />
          <span>Назад</span>
        </button>
        <span className="font-extrabold text-base sm:text-lg text-indigo-950 truncate">
          {title}
        </span>
      </div>

      {/* Step Dots + Counter */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5">
          {Array.from({ length: totalSteps }, (_, idx) => {
            const stepNum = idx + 1;
            const isCompletedOrActive = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <React.Fragment key={stepNum}>
                <span
                  className={`rounded-full transition-all ${
                    isCurrent
                      ? 'w-3.5 h-3.5 bg-[#6C5CE7] ring-4 ring-violet-200'
                      : isCompletedOrActive
                      ? 'w-2.5 h-2.5 bg-[#6C5CE7]'
                      : 'w-2.5 h-2.5 bg-indigo-200'
                  }`}
                />
                {stepNum < totalSteps && (
                  <span
                    className={`w-4 h-0.5 rounded-full ${
                      stepNum < currentStep ? 'bg-[#6C5CE7]' : 'bg-indigo-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <span className="text-xs sm:text-sm font-extrabold text-indigo-900/70 tabular-nums bg-white/80 px-3 py-1 rounded-full border border-indigo-100">
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
};
