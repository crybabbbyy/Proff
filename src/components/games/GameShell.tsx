import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { NextStepButton } from './NextStepButton';

/** Общая рамка задания: заголовок, инструкция, содержимое, подсказка и переход дальше. */
export const GameShell: React.FC<{
  title: string;
  instruction: string;
  /** Текст подсказки или ошибки под заданием. */
  feedback?: string | null;
  /** Задание выполнено: показываем сообщение об успехе и кнопку перехода. */
  success: boolean;
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
  /** Кнопка действия до успеха (например, «Проверить»). Без неё внизу ничего нет до успеха. */
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({
  title,
  instruction,
  feedback,
  success,
  successMessage,
  nextLabel,
  onComplete,
  action,
  children,
}) => (
  <div className="bg-white rounded-[28px] p-5 sm:p-7 shadow-sm border border-indigo-100">
    <div className="mb-5">
      <h2 className="text-xl sm:text-2xl font-extrabold text-indigo-950">{title}</h2>
      <p className="text-sm sm:text-base text-slate-600 mt-1">{instruction}</p>
    </div>

    {children}

    <div aria-live="polite">
      {feedback && !success && (
        <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-950 font-semibold">{feedback}</p>
        </div>
      )}
      {success && (
        <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-emerald-950 text-base">Задание выполнено!</h4>
            <p className="text-sm text-emerald-800">{successMessage}</p>
          </div>
        </div>
      )}
    </div>

    {(success || action) && (
      <div className="mt-6 flex items-center justify-end">
        {success ? (
          <NextStepButton label={nextLabel} onClick={onComplete} className="w-full sm:w-auto" />
        ) : (
          action
        )}
      </div>
    )}
  </div>
);

/** Кнопка «Проверить» в общем стиле. */
export const CheckButton: React.FC<{ disabled: boolean; onClick: () => void }> = ({
  disabled,
  onClick,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-sm sm:text-base transition-all ${
      disabled
        ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed'
        : 'bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white shadow-md hover:shadow-lg cursor-pointer'
    }`}
  >
    Проверить
  </button>
);

/** «Тряска» элемента после неверного ответа. Повторная ошибка на том же элементе трясёт снова. */
export function useShake(): [string | null, (id: string) => void] {
  const [shakeId, setShakeId] = React.useState<string | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  const trigger = React.useCallback((id: string) => {
    window.clearTimeout(timer.current);
    setShakeId(null);
    requestAnimationFrame(() => {
      setShakeId(id);
      timer.current = window.setTimeout(() => setShakeId(null), 420);
    });
  }, []);
  return [shakeId, trigger];
}

export const EMOTION_LABELS: Record<string, string> = {
  joy: 'Радость',
  anger: 'Злость',
  sadness: 'Грусть',
  surprise: 'Удивление',
  neutral: 'Спокойствие',
};

/** Перемешивание с фиксированным зерном: порядок одинаковый при каждом открытии. */
export function shuffledOrder<T>(items: T[], seed = 7): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
