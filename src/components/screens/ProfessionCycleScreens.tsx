import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PROFESSIONS } from '../../data/professions';
import { getNextProfession, useGameStore } from '../../store/useGameStore';
import { StepHeader } from '../layout/StepHeader';
import { ProfessionSceneIllustration } from '../illustrations/ProfessionIllustrations';
import { InteractiveTaskRenderer } from '../games/InteractiveTaskRenderer';
import { sound } from '../../utils/sound';

export const ProfessionIntroScreen: React.FC = () => {
  const selectedProfessionId = useGameStore((s) => s.selectedProfessionId);
  const setScreen = useGameStore((s) => s.setScreen);
  const startProfessionTask = useGameStore((s) => s.startProfessionTask);
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  const profession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) || PROFESSIONS[0];

  return (
    <div>
      <StepHeader
        title="Профессии"
        currentStep={1}
        totalSteps={2}
        onBack={() => setScreen('home')}
      />

      <div className="bg-white rounded-[32px] p-4 sm:p-6 shadow-xs border border-indigo-100">
        <div className="relative rounded-[26px] overflow-hidden border border-indigo-100">
          <div className="w-full h-[320px] sm:h-[400px]">
            <ProfessionSceneIllustration
              professionId={profession.id}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white/92 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-md border border-white">
            <h1 className="text-2xl sm:text-3xl font-black text-indigo-950">
              {profession.title}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-700 mt-2 leading-relaxed">
              {profession.definition}
            </p>
          </div>

          <div className="absolute bottom-5 right-5">
            <button
              type="button"
              onClick={() => {
                sound.playClick(soundEnabled);
                startProfessionTask();
              }}
              className="px-7 py-4 rounded-full bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white font-extrabold text-base sm:text-lg shadow-xl inline-flex items-center gap-2 transition-all hover:scale-102 cursor-pointer whitespace-nowrap shrink-0 border-2 border-white/80"
            >
              <span>Перейти к заданию</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfessionTaskScreen: React.FC = () => {
  const selectedProfessionId = useGameStore((s) => s.selectedProfessionId);
  const setScreen = useGameStore((s) => s.setScreen);
  const completeProfessionAndGoNext = useGameStore(
    (s) => s.completeProfessionAndGoNext
  );

  const profession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) || PROFESSIONS[0];
  const nextProfession = getNextProfession(profession.id);

  return (
    <div>
      <StepHeader
        title={`${profession.title} · Задание`}
        currentStep={2}
        totalSteps={2}
        onBack={() => setScreen('profession_intro')}
      />

      <InteractiveTaskRenderer
        task={profession.task}
        professionId={profession.id}
        nextLabel={
          nextProfession
            ? 'Перейти к следующей профессии'
            : 'Перейти к финальной игре'
        }
        onComplete={completeProfessionAndGoNext}
      />
    </div>
  );
};
