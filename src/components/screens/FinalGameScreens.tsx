import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ChevronRight, RotateCcw } from 'lucide-react';
import { FINAL_GAME_LOCATIONS } from '../../data/finalGame';
import { PROFESSIONS } from '../../data/professions';
import {
  getNextFinalLocation,
  useGameStore,
} from '../../store/useGameStore';
import { StepHeader } from '../layout/StepHeader';
import { ProfessionAvatar } from '../illustrations/ProfessionIllustrations';
import { InteractiveTaskRenderer } from '../games/InteractiveTaskRenderer';
import { sound } from '../../utils/sound';

const LOCATION_ICONS: Record<string, string> = {
  classroom: '🏫',
  theater: '🎭',
  tech_zone: '💻',
  emergency: '🚨',
  investigation: '🔍',
  legal_resolution: '⚖️',
};

export const FinalIntroScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const startFinalGame = useGameStore((s) => s.startFinalGame);
  const completedFinalLocations = useGameStore(
    (s) => s.completedFinalLocations
  );
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  const nextLocation = FINAL_GAME_LOCATIONS.find(
    (loc) => !completedFinalLocations.includes(loc.id)
  );
  const hasProgress = completedFinalLocations.length > 0 && nextLocation;

  return (
    <div>
      <StepHeader
        title="Финальная игра"
        currentStep={nextLocation ? nextLocation.number : FINAL_GAME_LOCATIONS.length}
        totalSteps={FINAL_GAME_LOCATIONS.length}
        onBack={() => setScreen('home')}
      />

      <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-xs border border-indigo-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black text-indigo-950">
            Готов к финальной игре?
          </h1>
          <p className="text-sm sm:text-lg font-semibold text-slate-600 mt-3 leading-relaxed">
            Впереди одна большая история из {FINAL_GAME_LOCATIONS.length} локаций.
            Проходи их по порядку и смотри, как профессии помогают друг другу!
          </p>
        </div>

        <div className="mt-8 py-6 px-4 rounded-[28px] bg-gradient-to-b from-[#F5F6FF] to-[#EDE9FE] border border-indigo-100 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {PROFESSIONS.map((prof) => (
            <div key={prof.id} className="flex flex-col items-center group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1.5 shadow-md border-2 border-violet-200 group-hover:-translate-y-1 transition-transform">
                <ProfessionAvatar professionId={prof.id} className="w-full h-full" />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-extrabold text-indigo-950">
                {prof.shortTitle}
              </span>
            </div>
          ))}
        </div>

        {/* Маршрут истории: локации идут строго по порядку */}
        <ol className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-left">
          {FINAL_GAME_LOCATIONS.map((loc) => {
            const isDone = completedFinalLocations.includes(loc.id);
            const isNext = nextLocation?.id === loc.id;
            return (
              <li
                key={loc.id}
                className={`rounded-2xl p-3 border-2 flex items-center gap-2.5 ${
                  isNext
                    ? 'bg-[#EDE9FE] border-[#6C5CE7]'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-[#F8F9FF] border-indigo-100 opacity-70'
                }`}
              >
                <span className="text-2xl shrink-0">{LOCATION_ICONS[loc.id]}</span>
                <div className="min-w-0">
                  <div className="text-[11px] font-extrabold text-indigo-400">
                    {isDone ? 'Пройдено' : `Локация ${loc.number}`}
                  </div>
                  <div className="text-xs font-extrabold text-indigo-950 truncate">
                    {loc.shortTitle}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              sound.playClick(soundEnabled);
              startFinalGame();
            }}
            className="px-10 py-4 rounded-full bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white font-extrabold text-base sm:text-lg shadow-lg hover:shadow-xl inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>
              {hasProgress
                ? `Продолжить: локация ${nextLocation!.number}`
                : 'Начать игру'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FinalLocationScreen: React.FC = () => {
  const selectedFinalLocationId = useGameStore(
    (s) => s.selectedFinalLocationId
  );
  const setScreen = useGameStore((s) => s.setScreen);
  const completeFinalLocation = useGameStore((s) => s.completeFinalLocation);

  const location =
    FINAL_GAME_LOCATIONS.find((l) => l.id === selectedFinalLocationId) ||
    FINAL_GAME_LOCATIONS[0];
  const previous = FINAL_GAME_LOCATIONS.find(
    (l) => l.number === location.number - 1
  );
  const next = getNextFinalLocation(location.id);

  return (
    <div className="space-y-5">
      <StepHeader
        title={location.title}
        currentStep={location.number}
        totalSteps={FINAL_GAME_LOCATIONS.length}
        onBack={() => setScreen('final_intro')}
      />

      {/* Описание ситуации на локации */}
      <div className="bg-gradient-to-r from-[#312E81] via-[#4338CA] to-[#5B21B6] text-white rounded-[26px] p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 border border-white/25">
          <ProfessionAvatar professionId={location.professionId} className="w-14 h-14" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-extrabold text-amber-300">
            Локация {location.number} из {FINAL_GAME_LOCATIONS.length} · Напарник:{' '}
            {location.professionRoleLabel}
          </div>
          {previous && (
            <p className="text-xs sm:text-sm font-semibold text-indigo-200 leading-relaxed">
              <span className="font-extrabold text-indigo-100">Что было до этого: </span>
              {previous.storySuccess}
            </p>
          )}
          <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
            <span className="font-extrabold text-amber-200">Ситуация: </span>
            {location.storyIntro}
          </p>
        </div>
      </div>

      <InteractiveTaskRenderer
        task={location.task}
        professionId={location.professionId}
        nextLabel={
          next ? `Перейти к локации ${next.number}` : 'Завершить финальную игру'
        }
        onComplete={() => completeFinalLocation(location.id)}
      />
    </div>
  );
};

export const FinalVictoryScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const restartFinalGame = useGameStore((s) => s.restartFinalGame);
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  useEffect(() => {
    try {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.55 } });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-xs border border-indigo-100 text-center max-w-4xl mx-auto">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-amber-100">
        <Award className="w-12 h-12" />
      </div>

      <h1 className="text-2xl sm:text-4xl font-black text-indigo-950 mt-5">
        Поздравляем, финальная игра пройдена!
      </h1>
      <p className="text-sm sm:text-lg font-semibold text-slate-600 mt-2 max-w-2xl mx-auto">
        Ты прошёл все {FINAL_GAME_LOCATIONS.length} локаций и увидел, как учитель,
        актёр, программист, спасатель МЧС, пожарный, врач скорой помощи,
        полицейский и юрист помогают друг другу в реальной жизни!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-7 text-left">
        {FINAL_GAME_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="rounded-2xl bg-[#F5F6FF] border border-indigo-100 p-4 flex items-start gap-3"
          >
            <span className="text-2xl shrink-0">{LOCATION_ICONS[loc.id]}</span>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-indigo-950">
                {loc.number}. {loc.shortTitle} · {loc.professionRoleLabel}
              </div>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                {loc.storySuccess}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick(soundEnabled);
            restartFinalGame();
          }}
          className="px-7 py-3.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-extrabold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Пройти заново</span>
        </button>
        <button
          type="button"
          onClick={() => {
            sound.playClick(soundEnabled);
            setScreen('home');
          }}
          className="px-7 py-3.5 rounded-full bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
        >
          На главную
        </button>
      </div>
    </div>
  );
};
