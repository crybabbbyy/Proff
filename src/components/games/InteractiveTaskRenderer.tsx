import React from 'react';
import { InteractiveTask, ProfessionId } from '../../types/game';
import { DragToCharacterGame } from './DragToCharacterGame';
import { EmotionMatchGame } from './EmotionMatchGame';
import { ReturnBagGame } from './ReturnBagGame';
import { FindHiddenGame } from './FindHiddenGame';
import { PickFaceGame } from './PickFaceGame';
import { WiresGame } from './WiresGame';
import { SituationChoiceGame } from './SituationChoiceGame';
import { PhotofitGame } from './PhotofitGame';
import { LightbotGame } from './LightbotGame';

interface InteractiveTaskRendererProps {
  task: InteractiveTask;
  professionId: ProfessionId;
  onComplete: () => void;
  /** Подпись кнопки, которая появляется после успешного выполнения. */
  nextLabel: string;
}

export const InteractiveTaskRenderer: React.FC<InteractiveTaskRendererProps> = ({
  task,
  professionId,
  onComplete,
  nextLabel,
}) => {
  const common = { nextLabel, onComplete, title: task.title, instruction: task.instruction, successMessage: task.successMessage };
  switch (task.type) {
    case 'drag_to_character':
      return (
        <DragToCharacterGame
          key={task.id}
          {...common}
          scene={task.scene}
          dropLabel={task.dropLabel}
          requiredCorrect={task.requiredCorrect}
          items={task.items}
          layout={task.layout}
        />
      );
    case 'emotion_match':
      return <EmotionMatchGame key={task.id} {...common} faces={task.faces} />;
    case 'return_bag':
      return <ReturnBagGame key={task.id} {...common} />;
    case 'find_hidden':
      return (
        <FindHiddenGame
          key={task.id}
          {...common}
          scene={task.scene}
          targetLabel={task.targetLabel}
          hint={task.hint}
        />
      );
    case 'pick_face':
      return (
        <PickFaceGame key={task.id} {...common} word={task.word} target={task.target} options={task.options} />
      );
    case 'wires':
      return <WiresGame key={task.id} {...common} wires={task.wires} />;
    case 'situation_choice':
      return <SituationChoiceGame key={task.id} {...common} options={task.options} />;
    case 'photofit':
      return <PhotofitGame key={task.id} {...common} target={task.target} />;
    case 'lightbot':
      return (
        <LightbotGame
          key={task.id}
          {...common}
          taskId={task.id}
          gridSize={task.gridSize}
          start={task.start}
          target={task.target}
          commands={task.commands}
          professionId={professionId}
        />
      );
  }
};
