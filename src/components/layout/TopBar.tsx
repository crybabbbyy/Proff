import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/sound';

export const TopBar: React.FC = () => {
  const currentScreen = useGameStore((s) => s.currentScreen);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const setScreen = useGameStore((s) => s.setScreen);
  const openFinalGame = useGameStore((s) => s.openFinalGame);
  const toggleSound = useGameStore((s) => s.toggleSound);

  const isProfessionsSection =
    currentScreen === 'home' ||
    currentScreen === 'profession_intro' ||
    currentScreen === 'profession_task';

  const isFinalSection =
    currentScreen === 'final_intro' ||
    currentScreen === 'final_location' ||
    currentScreen === 'final_victory';

  const goHome = () => {
    sound.playClick(soundEnabled);
    setScreen('home');
  };

  const goFinal = () => {
    sound.playClick(soundEnabled);
    openFinalGame();
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2">
      <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-3 shadow-xs border border-indigo-100 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={goHome}
          className="text-lg sm:text-xl font-black tracking-tight text-indigo-950 hover:text-violet-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          🎓 Мир профессий
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <button
            type="button"
            onClick={goHome}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isProfessionsSection
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent hover:text-indigo-950'
            }`}
          >
            Профессии
          </button>
          <button
            type="button"
            onClick={goFinal}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isFinalSection
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent hover:text-indigo-950'
            }`}
          >
            Финальная игра
          </button>
        </nav>

        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-950 text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-violet-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
          <span>{soundEnabled ? 'Звук: вкл' : 'Звук: выкл'}</span>
        </button>
      </div>

      {/* Mobile Secondary Navigation Strip */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-2.5 text-xs font-extrabold text-slate-600">
        <button
          type="button"
          onClick={goHome}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 ${
            isProfessionsSection
              ? 'bg-violet-600 text-white'
              : 'bg-white/80 text-indigo-950'
          }`}
        >
          Профессии
        </button>
        <button
          type="button"
          onClick={goFinal}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 ${
            isFinalSection
              ? 'bg-violet-600 text-white'
              : 'bg-white/80 text-indigo-950'
          }`}
        >
          Финальная игра
        </button>
      </div>
    </header>
  );
};
