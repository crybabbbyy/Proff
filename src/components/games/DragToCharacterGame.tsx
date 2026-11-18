import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Check } from 'lucide-react';
import { DragItem, DragScene, ItemIconId, ProfessionId } from '../../types/game';
import { ItemIcon } from '../illustrations/ItemIcons';
import { ProfessionSceneIllustration } from '../illustrations/ProfessionIllustrations';
import { FireScene, IceRescueScene, MedicalCaseScene } from '../illustrations/GameScenes';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { GameShell, useShake } from './GameShell';

const DROP_ID = 'character-drop';

interface Props {
  title: string;
  instruction: string;
  scene: DragScene;
  dropLabel: string;
  requiredCorrect: number;
  items: DragItem[];
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}

const ItemTile: React.FC<{
  item: DragItem;
  placed: boolean;
  disabled: boolean;
  shaking: boolean;
  onGive: () => void;
}> = ({ item, placed, disabled, shaking, onGive }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled: disabled || placed,
  });
  return (
    <button
      type="button"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => {
        if (!disabled && !placed) onGive();
      }}
      aria-label={placed ? `${item.label} — уже отдано` : `Отдать: ${item.label}`}
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        touchAction: 'none',
      }}
      className={`relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border-2 select-none transition-colors ${
        isDragging ? 'z-50 shadow-xl border-violet-500 bg-white' : ''
      } ${
        placed
          ? 'bg-emerald-50 border-emerald-300 opacity-60 cursor-default'
          : 'bg-white border-indigo-100 hover:border-violet-400 shadow-sm cursor-grab active:cursor-grabbing'
      } ${shaking ? 'shake border-rose-400 bg-rose-50' : ''}`}
    >
      {placed && (
        <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
          <Check className="w-3 h-3" />
        </span>
      )}
      <ItemIcon id={item.id} className="w-12 h-12 sm:w-14 sm:h-14" />
      <span className="font-extrabold text-xs sm:text-sm text-slate-800 text-center leading-tight">
        {item.label}
      </span>
    </button>
  );
};

const SceneDropZone: React.FC<{
  scene: DragScene;
  dropLabel: string;
  requiredCorrect: number;
  placed: ItemIconId[];
  done: boolean;
}> = ({ scene, dropLabel, requiredCorrect, placed, done }) => {
  const { isOver, setNodeRef } = useDroppable({ id: DROP_ID });

  const illustration = (() => {
    switch (scene) {
      case 'firefighter':
        return <FireScene done={done} />;
      case 'rescuer':
        return <IceRescueScene done={done} tool={placed[0]} />;
      case 'paramedic':
        return <MedicalCaseScene items={placed} done={done} />;
      default:
        return <ProfessionSceneIllustration professionId={scene as ProfessionId} className="w-full h-full" />;
    }
  })();

  // У учителя и юриста отданные предметы показываем в полоске поверх сцены.
  const showTray = scene === 'teacher' || scene === 'lawyer';

  return (
    <div
      ref={setNodeRef}
      className={`relative rounded-[24px] overflow-hidden border-4 transition-colors bg-white ${
        isOver ? 'border-violet-500 ring-4 ring-violet-200' : done ? 'border-emerald-300' : 'border-indigo-50'
      }`}
    >
      <div className="aspect-[600/340]">{illustration}</div>
      {/* На телефоне полоска под картинкой, на широком экране — поверх неё */}
      {showTray && (
        <div className="sm:absolute sm:left-3 sm:right-3 sm:bottom-3 bg-white/92 backdrop-blur sm:rounded-2xl p-2 sm:p-2.5 sm:border sm:border-white sm:shadow-md flex items-center gap-2">
          <span className="text-[11px] sm:text-xs font-extrabold text-indigo-900 shrink-0">
            {dropLabel}:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: requiredCorrect }, (_, i) => (
              <span
                key={i}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${
                  placed[i] ? 'bg-emerald-50 border-2 border-emerald-300' : 'border-2 border-dashed border-indigo-200'
                }`}
              >
                {placed[i] && <ItemIcon id={placed[i]} className="w-7 h-7 sm:w-9 sm:h-9" />}
              </span>
            ))}
          </div>
        </div>
      )}
      {isOver && !done && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-full">
          Отпусти, чтобы отдать
        </div>
      )}
    </div>
  );
};

/**
 * Перетаскивание предметов к персонажу (или в чемодан). Верные предметы остаются у персонажа,
 * неверные не принимаются: трясутся и показывают, почему не подходят.
 */
export const DragToCharacterGame: React.FC<Props> = ({
  title,
  instruction,
  scene,
  dropLabel,
  requiredCorrect,
  items,
  successMessage,
  nextLabel,
  onComplete,
}) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [placed, setPlaced] = useState<ItemIconId[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shakeId, shake] = useShake();
  const done = placed.length >= requiredCorrect;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  // Актуальный список отданных предметов (защита от двойного срабатывания drop + click).
  const placedRef = React.useRef<ItemIconId[]>([]);

  const give = (id: ItemIconId) => {
    const current = placedRef.current;
    if (current.length >= requiredCorrect || current.includes(id)) return;
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (!item.isCorrect) {
      sound.playError(soundEnabled);
      shake(id);
      setFeedback(`${item.label} — не подходит. ${item.reason ?? ''}`.trim());
      return;
    }
    const next = [...current, id];
    placedRef.current = next;
    setPlaced(next);
    setFeedback(null);
    if (next.length >= requiredCorrect) sound.playSuccess(soundEnabled);
    else sound.playDrop(soundEnabled);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over?.id === DROP_ID) give(e.active.id as ItemIconId);
  };

  const left = requiredCorrect - placed.length;

  return (
    <GameShell
      title={title}
      instruction={instruction}
      feedback={feedback}
      success={done}
      successMessage={successMessage}
      nextLabel={nextLabel}
      onComplete={onComplete}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            <SceneDropZone
              scene={scene}
              dropLabel={dropLabel}
              requiredCorrect={requiredCorrect}
              placed={placed}
              done={done}
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-extrabold text-indigo-900/60 mb-2 px-1">
              {done
                ? 'Готово!'
                : requiredCorrect > 1
                ? `Осталось найти: ${left} из ${requiredCorrect}`
                : 'Выбери один предмет'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
              {items.map((item) => (
                <ItemTile
                  key={item.id}
                  item={item}
                  placed={placed.includes(item.id)}
                  disabled={done}
                  shaking={shakeId === item.id}
                  onGive={() => give(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </DndContext>
    </GameShell>
  );
};
