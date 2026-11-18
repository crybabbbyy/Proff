export type ProfessionId =
  | 'teacher'
  | 'actor'
  | 'programmer'
  | 'rescuer'
  | 'firefighter'
  | 'paramedic'
  | 'police'
  | 'lawyer';

export type ProfessionStatus = 'not_started' | 'in_progress' | 'completed';

export type ScreenType =
  | 'home'
  | 'profession_intro'
  | 'profession_task'
  | 'final_intro'
  | 'final_location'
  | 'final_victory';

export type FinalLocationId =
  | 'classroom'
  | 'theater'
  | 'tech_zone'
  | 'emergency'
  | 'investigation'
  | 'legal_resolution';

/** Эмоции нарисованного лица. */
export type Emotion = 'joy' | 'anger' | 'sadness' | 'surprise' | 'neutral';

/** Варианты причёски и глаз для фоторобота. */
export type HairStyle = 'curly' | 'spiky';
export type EyeStyle = 'round' | 'narrow';

/** Иллюстрации, к которым перетаскивают предметы. */
export type DragScene =
  | 'teacher'
  | 'lawyer'
  | 'firefighter'
  | 'paramedic'
  | 'rescuer';

/** Сцены с поиском спрятанного предмета. */
export type HiddenScene = 'classroom' | 'courtroom';

/** id рисунка предмета (см. ItemIcon). */
export type ItemIconId =
  | 'pointer'
  | 'globe'
  | 'chalk'
  | 'textbooks'
  | 'ball'
  | 'comb'
  | 'flashlight'
  | 'banana'
  | 'rope'
  | 'board'
  | 'umbrella'
  | 'fire_hose'
  | 'axe'
  | 'shovel'
  | 'bucket'
  | 'stethoscope'
  | 'syringe'
  | 'bandage'
  | 'gloves'
  | 'chocolate'
  | 'phone'
  | 'keys'
  | 'folder'
  | 'scales'
  | 'pen'
  | 'constitution'
  | 'ice_cream'
  | 'needle_thread'
  | 'watering_can'
  | 'toothbrush';

export interface DragItem {
  id: ItemIconId;
  label: string;
  isCorrect: boolean;
  /** Пояснение, почему предмет не подходит. */
  reason?: string;
}

/** Иконка варианта в выборе служб: профессия из игры или другой работник. */
export type WorkerAvatarId =
  | ProfessionId
  | 'seamstress'
  | 'seller'
  | 'driver'
  | 'cook';

export interface SituationOption {
  id: string;
  label: string;
  avatar: WorkerAvatarId;
  isCorrect: boolean;
  feedback: string;
}

export interface LightbotCommand {
  id: string;
  label: string;
  emoji: string;
}

export interface WireColor {
  id: string;
  label: string;
  color: string;
}

export type InteractiveTask =
  | {
      id: string;
      type: 'drag_to_character';
      title: string;
      instruction: string;
      scene: DragScene;
      /** Подпись зоны, куда перетаскивают предметы. */
      dropLabel: string;
      /** Сколько верных предметов нужно перетащить, чтобы задание засчиталось. */
      requiredCorrect: number;
      items: DragItem[];
      successMessage: string;
    }
  | {
      id: string;
      type: 'emotion_match';
      title: string;
      instruction: string;
      faces: { id: string; emotion: Emotion; label: string }[];
      successMessage: string;
    }
  | {
      id: string;
      type: 'return_bag';
      title: string;
      instruction: string;
      successMessage: string;
    }
  | {
      id: string;
      type: 'find_hidden';
      title: string;
      instruction: string;
      scene: HiddenScene;
      targetLabel: string;
      /** Подсказка после нескольких промахов. */
      hint: string;
      successMessage: string;
    }
  | {
      id: string;
      type: 'pick_face';
      title: string;
      instruction: string;
      word: string;
      target: Emotion;
      options: Emotion[];
      successMessage: string;
    }
  | {
      id: string;
      type: 'wires';
      title: string;
      instruction: string;
      wires: WireColor[];
      successMessage: string;
    }
  | {
      id: string;
      type: 'situation_choice';
      title: string;
      instruction: string;
      options: SituationOption[];
      successMessage: string;
    }
  | {
      id: string;
      type: 'photofit';
      title: string;
      instruction: string;
      target: { hair: HairStyle; eyes: EyeStyle };
      successMessage: string;
    }
  | {
      id: string;
      type: 'lightbot';
      title: string;
      instruction: string;
      gridSize: number;
      start: { x: number; y: number };
      target: { x: number; y: number };
      commands: LightbotCommand[];
      successMessage: string;
    };

export interface Profession {
  id: ProfessionId;
  title: string;
  shortTitle: string;
  cardBg: string;
  cardAccent: string;
  definition: string;
  task: InteractiveTask;
}

export interface FinalGameLocation {
  id: FinalLocationId;
  number: number;
  title: string;
  shortTitle: string;
  professionId: ProfessionId;
  professionRoleLabel: string;
  storyIntro: string;
  storySuccess: string;
  task: InteractiveTask;
}
