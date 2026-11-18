import React, { useState } from 'react';
import { Check, HelpCircle, RotateCcw, Sparkles } from 'lucide-react';
import { ProfessionId } from '../../types/game';
import { ProfessionSceneIllustration } from '../illustrations/ProfessionIllustrations';
import { sound } from '../../utils/sound';
import { NextStepButton } from './NextStepButton';
import { useGameStore } from '../../store/useGameStore';

interface LightbotCommand {
  id: string;
  label: string;
  emoji: string;
}

interface LightbotGameProps {
  taskId: string;
  title: string;
  instruction: string;
  gridSize: number;
  start: { x: number; y: number };
  target: { x: number; y: number };
  commands: LightbotCommand[];
  successMessage: string;
  professionId: ProfessionId;
  onComplete: () => void;
  nextLabel: string;
}

export const LightbotGame: React.FC<LightbotGameProps> = ({
  title,
  instruction,
  gridSize,
  start,
  target,
  commands,
  successMessage,
  professionId,
  onComplete,
  nextLabel,
}) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [program, setProgram] = useState<string[]>([]);
  const [robotPos, setRobotPos] = useState(start);
  const [robotDir, setRobotDir] = useState(0); // 0=right, 1=down, 2=left, 3=up
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const addCommand = (commandId: string) => {
    if (isRunning || isSuccess) return;
    sound.playClick(soundEnabled);
    setProgram((prev) => [...prev, commandId]);
  };

  const removeLastCommand = () => {
    if (isRunning || isSuccess) return;
    sound.playClick(soundEnabled);
    setProgram((prev) => prev.slice(0, -1));
  };

  const resetProgram = () => {
    if (isRunning) return;
    sound.playClick(soundEnabled);
    setProgram([]);
    setRobotPos(start);
    setRobotDir(0);
    setIsSuccess(false);
    setFeedbackMessage(null);
  };

  const runProgram = async () => {
    if (program.length === 0 || isRunning) return;

    setIsRunning(true);
    setRobotPos(start);
    setRobotDir(0);
    setFeedbackMessage(null);

    let currentPos = { ...start };
    let currentDir = 0;

    for (let i = 0; i < program.length; i++) {
      const commandId = program[i];
      const command = commands.find((c) => c.id === commandId);

      if (!command) continue;

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (commandId === 'forward') {
        const directions = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 0, y: -1 },
        ];
        const dir = directions[currentDir];
        const newPos = {
          x: currentPos.x + dir.x,
          y: currentPos.y + dir.y,
        };

        if (
          newPos.x >= 0 &&
          newPos.x < gridSize &&
          newPos.y >= 0 &&
          newPos.y < gridSize
        ) {
          currentPos = newPos;
        } else {
          sound.playError(soundEnabled);
          setFeedbackMessage('Робот вышел за пределы поля!');
          setIsRunning(false);
          return;
        }
      } else if (commandId === 'turn-right') {
        currentDir = (currentDir + 1) % 4;
      } else if (commandId === 'turn-left') {
        currentDir = (currentDir - 1 + 4) % 4;
      }

      setRobotPos({ ...currentPos });
      setRobotDir(currentDir);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (currentPos.x === target.x && currentPos.y === target.y) {
      sound.playSuccess(soundEnabled);
      setIsSuccess(true);
      setFeedbackMessage(null);
    } else {
      sound.playError(soundEnabled);
      setFeedbackMessage(
        `Робот не дошёл до цели! Он оказался на позиции (${currentPos.x}, ${currentPos.y}), а нужно (${target.x}, ${target.y})`
      );
    }

    setIsRunning(false);
  };

  const getRobotEmoji = () => {
    const emojis = ['➡️', '⬇️', '⬅️', '⬆️'];
    return emojis[robotDir];
  };

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-7 shadow-sm border border-indigo-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-indigo-950">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {instruction}
          </p>
        </div>
        {program.length > 0 && !isRunning && !isSuccess && (
          <button
            type="button"
            onClick={resetProgram}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Сбросить
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-4 border-2 border-slate-300">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                const x = idx % gridSize;
                const y = Math.floor(idx / gridSize);
                const isRobot = robotPos.x === x && robotPos.y === y;
                const isTarget = target.x === x && target.y === y;

                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl ${
                      isRobot
                        ? 'bg-blue-500 border-2 border-blue-600 shadow-lg'
                        : isTarget
                        ? 'bg-amber-400 border-2 border-amber-500 animate-pulse'
                        : 'bg-white border border-slate-300'
                    }`}
                  >
                    {isRobot && getRobotEmoji()}
                    {isTarget && !isRobot && '🎯'}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#F5F6FF] border border-indigo-100 p-4">
            <div className="text-xs font-extrabold text-indigo-900/60 mb-2">
              Программа ({program.length} команд):
            </div>
            <div className="flex flex-wrap gap-2 min-h-[50px]">
              {program.length > 0 ? (
                program.map((cmdId, idx) => {
                  const cmd = commands.find((c) => c.id === cmdId);
                  return (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-violet-100 border border-violet-300 text-xs font-bold text-violet-900 flex items-center gap-1"
                    >
                      <span>{cmd?.emoji}</span>
                      <span>{cmd?.label}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-xs text-slate-400 font-semibold py-2">
                  Добавь команды из панели справа
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-4">
            <div className="text-xs font-extrabold text-indigo-900/60 mb-3">
              Команды:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {commands.map((cmd) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => addCommand(cmd.id)}
                  disabled={isRunning || isSuccess}
                  className="p-3 rounded-xl bg-white border-2 border-indigo-200 hover:border-violet-400 hover:bg-violet-50 transition-all flex flex-col items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-2xl">{cmd.emoji}</span>
                  <span className="text-xs font-bold text-indigo-950">
                    {cmd.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {isSuccess ? (
            <NextStepButton
              label={nextLabel}
              onClick={onComplete}
              className="w-full"
            />
          ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={removeLastCommand}
              disabled={program.length === 0 || isRunning || isSuccess}
              className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-indigo-200 hover:border-rose-400 hover:bg-rose-50 text-sm font-bold text-indigo-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Удалить последнюю
            </button>
            <button
              type="button"
              onClick={runProgram}
              disabled={program.length === 0 || isRunning || isSuccess}
              className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                program.length > 0 && !isRunning && !isSuccess
                  ? 'bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white shadow-md cursor-pointer'
                  : 'bg-indigo-100 text-indigo-400 cursor-not-allowed'
              }`}
            >
              {isRunning ? 'Выполняется...' : 'Запустить ▶'}
            </button>
          </div>
          )}
        </div>
      </div>

      {feedbackMessage && !isSuccess && (
        <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-950 font-semibold">
            <span className="font-extrabold">Результат: </span>
            {feedbackMessage}
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-base">
                Программа выполнена!
              </h4>
              <p className="text-sm text-emerald-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};