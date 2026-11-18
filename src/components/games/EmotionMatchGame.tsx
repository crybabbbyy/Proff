import React, { useMemo, useRef, useState } from 'react';
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
import { Emotion } from '../../types/game';
import { Face } from '../illustrations/Face';
import { sound } from '../../utils/sound';
import { useGameStore } from '../../store/useGameStore';
import { GameShell, shuffledOrder, useShake } from './GameShell';

interface FaceDef {
  id: string;
  emotion: Emotion;
  label: string;
}

const LabelChip: React.FC<{
  face: FaceDef;
  used: boolean;
  selected: boolean;
  onSelect: () => void;
}> = ({ face, used, selected, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `label-${face.id}`,
    data: { faceId: face.id },
    disabled: used,
  });
  if (used) return null;
  return (
    <button
      type="button"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onSelect}
      aria-pressed={selected}
      style={{ transform: transform ? CSS.Translate.toString(transform) : undefined, touchAction: 'none' }}
      className={`px-6 py-3 rounded-full border-2 font-extrabold text-base sm:text-lg select-none transition-colors cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'z-50 shadow-xl bg-white border-violet-500'
          : selected
          ? 'bg-violet-600 border-violet-600 text-white shadow-md'
          : 'bg-white border-indigo-200 text-indigo-950 hover:border-violet-400 shadow-sm'
      }`}
    >
      {face.label}
    </button>
  );
};

const FaceSlot: React.FC<{
  face: FaceDef;
  index: number;
  matched: boolean;
  canTap: boolean;
  shaking: boolean;
  onTap: () => void;
}> = ({ face, index, matched, canTap, shaking, onTap }) => {
  const { isOver, setNodeRef } = useDroppable({ id: face.id });
  return (
    <button
      type="button"
      ref={setNodeRef}
      onClick={onTap}
      aria-label={matched ? `Лицо ${index + 1}: ${face.label}` : `Лицо ${index + 1}`}
      className={`flex flex-col items-center gap-3 p-4 rounded-[24px] border-2 transition-colors ${
        matched
          ? 'bg-emerald-50 border-emerald-400'
          : isOver || canTap
          ? 'bg-violet-50 border-dashed border-violet-500 cursor-pointer'
          : 'bg-[#F8F9FF] border-indigo-100'
      } ${shaking ? 'shake border-rose-400 bg-rose-50' : ''}`}
    >
      <div className="w-28 h-28 sm:w-36 sm:h-36">
        <Face emotion={face.emotion} hair="default" />
      </div>
      <span
        className={`min-h-9 min-w-28 px-4 py-1.5 rounded-full text-sm sm:text-base font-extrabold flex items-center justify-center gap-1.5 ${
          matched ? 'bg-emerald-500 text-white' : 'border-2 border-dashed border-indigo-200 text-indigo-300'
        }`}
      >
        {matched ? (
          <>
            <Check className="w-4 h-4" /> {face.label}
          </>
        ) : (
          '?'
        )}
      </span>
    </button>
  );
};

/** Актёр: соотнести названия эмоций с нарисованными лицами. */
export const EmotionMatchGame: React.FC<{
  title: string;
  instruction: string;
  faces: FaceDef[];
  successMessage: string;
  nextLabel: string;
  onComplete: () => void;
}> = ({ title, instruction, faces, successMessage, nextLabel, onComplete }) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [matched, setMatched] = useState<string[]>([]);
  const matchedRef = useRef<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shakeId, shake] = useShake();
  const done = matched.length === faces.length;

  const labels = useMemo(() => shuffledOrder(faces, 3), [faces]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const tryMatch = (labelFaceId: string, targetFaceId: string) => {
    if (matchedRef.current.includes(targetFaceId) || matchedRef.current.includes(labelFaceId)) return;
    const label = faces.find((f) => f.id === labelFaceId)!;
    if (labelFaceId === targetFaceId) {
      const next = [...matchedRef.current, targetFaceId];
      matchedRef.current = next;
      setMatched(next);
      setSelectedLabel(null);
      setFeedback(null);
      if (next.length === faces.length) sound.playSuccess(soundEnabled);
      else sound.playDrop(soundEnabled);
    } else {
      sound.playError(soundEnabled);
      shake(targetFaceId);
      setFeedback(`Это лицо не показывает «${label.label.toLowerCase()}». Посмотри на брови и рот.`);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const faceId = e.active.data.current?.faceId as string | undefined;
    if (faceId && e.over) tryMatch(faceId, String(e.over.id));
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {faces.map((face, i) => (
            <FaceSlot
              key={face.id}
              face={face}
              index={i}
              matched={matched.includes(face.id)}
              canTap={Boolean(selectedLabel) && !matched.includes(face.id)}
              shaking={shakeId === face.id}
              onTap={() => {
                if (selectedLabel && !matched.includes(face.id)) tryMatch(selectedLabel, face.id);
              }}
            />
          ))}
        </div>
        {!done && (
          <div className="mt-5 rounded-2xl bg-[#F5F6FF] border border-indigo-100 p-4 flex flex-wrap items-center justify-center gap-3">
            {labels.map((face) => (
              <LabelChip
                key={face.id}
                face={face}
                used={matched.includes(face.id)}
                selected={selectedLabel === face.id}
                onSelect={() => {
                  sound.playClick(soundEnabled);
                  setSelectedLabel(selectedLabel === face.id ? null : face.id);
                }}
              />
            ))}
          </div>
        )}
      </DndContext>
    </GameShell>
  );
};
