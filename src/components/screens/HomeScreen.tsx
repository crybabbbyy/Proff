import React, { useState } from 'react';
import { Check, Clock, Rocket, RotateCcw, Sparkles } from 'lucide-react';
import { PROFESSIONS } from '../../data/professions';
import { useGameStore } from '../../store/useGameStore';
import {
  ExplorerMascotIllustration,
  ProfessionAvatar,
} from '../illustrations/ProfessionIllustrations';
import { sound } from '../../utils/sound';

export const HomeScreen: React.FC = () => {
  const professionProgress = useGameStore((s) => s.professionProgress);
  const selectProfession = useGameStore((s) => s.selectProfession);
  const openFinalGame = useGameStore((s) => s.openFinalGame);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [confirmReset, setConfirmReset] = useState(false);

  const completedCount = PROFESSIONS.filter(
    (p) => professionProgress[p.id]?.status === 'completed'
  ).length;
  const totalCount = PROFESSIONS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Sidebar: Vertical Progress Timeline (as in Reference 2) */}
      <aside className="lg:col-span-3 bg-white/90 rounded-[28px] p-5 shadow-xs border border-indigo-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-extrabold text-indigo-950">
              Прогресс изучения
            </span>
            <span className="text-xs font-extrabold text-violet-700 tabular-nums">
              {completedCount} / {totalCount}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-indigo-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(progressPercent, 6)}%` }}
            />
          </div>

          {/* Vertical Profession Stepper */}
          <div className="space-y-1.5 relative">
            {PROFESSIONS.map((prof, idx) => {
              const status = professionProgress[prof.id]?.status || 'not_started';
              const isDone = status === 'completed';
              const isInProgress = status === 'in_progress';

              return (
                <div key={prof.id} className="relative">
                  {idx < PROFESSIONS.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-5 ${
                        isDone ? 'bg-emerald-400' : 'bg-indigo-100'
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(soundEnabled);
                      selectProfession(prof.id);
                    }}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-2xl text-left transition-all cursor-pointer ${
                      isInProgress
                        ? 'bg-violet-50 text-indigo-950 font-extrabold border border-violet-200'
                        : 'hover:bg-indigo-50/70 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-3.5 h-3.5 rounded-full shrink-0 border-2 ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-500'
                            : isInProgress
                            ? 'bg-violet-600 border-violet-600'
                            : 'bg-white border-indigo-300'
                        }`}
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {prof.shortTitle}
                      </span>
                    </div>

                    {isDone && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isInProgress && (
                      <Clock className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-indigo-100">
          {confirmReset ? (
            <div className="space-y-2">
              <p className="text-xs font-bold text-indigo-950 text-center">
                Сбросить весь прогресс?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick(soundEnabled);
                    resetProgress();
                    setConfirmReset(false);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Да, сбросить
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                sound.playClick(soundEnabled);
                setConfirmReset(true);
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-2xl bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-indigo-100 font-extrabold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Сбросить прогресс
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area: Greeting + Profession Cards Grid + Mascot */}
      <div className="lg:col-span-9 bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-indigo-100 flex flex-col justify-between">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
          {/* Left 8 Cols: Greeting & 8-Card Grid (7 professions + Final Game Rocket Card) */}
          <div className="xl:col-span-8">
            <h1 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
              Привет, исследователь!
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-xl">
              Выбирай профессию и узнавай, как она помогает людям в реальной
              жизни. Пройди все темы и примени знания в финальном приключении!
            </p>

            {/* 4x2 Grid of Cards (7 Professions + 1 Final Game Rocket Card) matching Reference 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
              {PROFESSIONS.map((prof) => {
                const status =
                  professionProgress[prof.id]?.status || 'not_started';
                const isDone = status === 'completed';
                const isInProgress = status === 'in_progress';

                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => {
                      sound.playClick(soundEnabled);
                      selectProfession(prof.id);
                    }}
                    className={`group relative rounded-[24px] p-4 flex flex-col items-center justify-between text-center transition-all duration-150 cursor-pointer border-2 ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-400 shadow-xs'
                        : isInProgress
                        ? `${prof.cardBg} ${prof.cardAccent} shadow-md`
                        : 'bg-[#F8F9FF] border-indigo-100 hover:border-violet-400 hover:bg-violet-50/40 shadow-xs'
                    }`}
                  >
                    {/* Status corner indicator */}
                    <div className="w-full flex justify-end mb-1">
                      {isDone ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : isInProgress ? (
                        <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                          <Clock className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="w-5 h-5" />
                      )}
                    </div>

                    <ProfessionAvatar
                      professionId={prof.id}
                      className="w-20 h-20 sm:w-22 sm:h-22 group-hover:scale-105 transition-transform duration-150"
                    />

                    <div className="mt-3">
                      <div className="font-extrabold text-sm sm:text-base text-indigo-950 leading-tight">
                        {prof.shortTitle}
                      </div>
                      <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                        {isDone
                          ? 'Изучено'
                          : isInProgress
                          ? 'В процессе'
                          : 'Начать'}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* 8th Card: Final Story Game Rocket Card (from Reference 1) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick(soundEnabled);
                  openFinalGame();
                }}
                className="group col-span-2 sm:col-span-4 rounded-[24px] p-4 sm:p-5 bg-gradient-to-br from-[#6C5CE7] to-[#8B5CF6] text-white flex items-center gap-4 text-left shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-violet-400"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-base sm:text-lg leading-tight">
                    Финальная игра
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-100 mt-0.5">
                    Все профессии в одной истории из 6 локаций
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 group-hover:bg-white/30 font-extrabold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors">
                  Играть
                  <Rocket className="w-4 h-4 text-amber-300" />
                </span>
              </button>
            </div>
          </div>

          {/* Right 4 Cols: Explorer Mascot & Speech Bubble (from Reference 2) */}
          <div className="xl:col-span-4 flex flex-col items-center justify-center bg-[#F5F6FF] rounded-[28px] p-5 border border-indigo-100">
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-indigo-100 text-center relative mb-3">
              <p className="text-xs sm:text-sm font-extrabold text-indigo-950 leading-relaxed">
                «Давай узнаем, как разные профессии помогают друг другу в одной
                большой истории!»
              </p>
              <div className="w-3 h-3 bg-white border-r border-b border-indigo-100 rotate-45 mx-auto -mb-5.5 mt-2" />
            </div>

            <div className="w-44 h-48 sm:w-52 sm:h-56">
              <ExplorerMascotIllustration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
