import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  FinalLocationId,
  ProfessionId,
  ProfessionStatus,
  ScreenType,
} from '../types/game';
import { PROFESSIONS } from '../data/professions';
import { FINAL_GAME_LOCATIONS } from '../data/finalGame';

export interface ProfessionProgressEntry {
  status: ProfessionStatus;
}

interface GameState {
  currentScreen: ScreenType;
  selectedProfessionId: ProfessionId;
  selectedFinalLocationId: FinalLocationId;
  soundEnabled: boolean;
  professionProgress: Record<ProfessionId, ProfessionProgressEntry>;
  completedFinalLocations: FinalLocationId[];
  // Actions
  setScreen: (screen: ScreenType) => void;
  selectProfession: (id: ProfessionId) => void;
  startProfessionTask: () => void;
  /** Отмечает текущую профессию пройденной и открывает следующую (или финальную игру после последней). */
  completeProfessionAndGoNext: () => void;
  openFinalGame: () => void;
  /** Открывает первую непройденную локацию (или первую, если пройдены все). */
  startFinalGame: () => void;
  /** Отмечает локацию пройденной и сразу открывает следующую по порядку (или экран победы). */
  completeFinalLocation: (locationId: FinalLocationId) => void;
  restartFinalGame: () => void;
  toggleSound: () => void;
  resetProgress: () => void;
}

const createInitialProfessionProgress = (): Record<
  ProfessionId,
  ProfessionProgressEntry
> =>
  Object.fromEntries(
    PROFESSIONS.map((p) => [p.id, { status: 'not_started' }])
  ) as Record<ProfessionId, ProfessionProgressEntry>;

export const getNextProfession = (id: ProfessionId) => {
  const idx = PROFESSIONS.findIndex((p) => p.id === id);
  return PROFESSIONS[idx + 1];
};

export const getNextFinalLocation = (id: FinalLocationId) => {
  const idx = FINAL_GAME_LOCATIONS.findIndex((l) => l.id === id);
  return FINAL_GAME_LOCATIONS[idx + 1];
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentScreen: 'home',
      selectedProfessionId: PROFESSIONS[0].id,
      selectedFinalLocationId: FINAL_GAME_LOCATIONS[0].id,
      soundEnabled: true,
      professionProgress: createInitialProfessionProgress(),
      completedFinalLocations: [],

      setScreen: (screen) => set({ currentScreen: screen }),

      selectProfession: (id) => {
        const progress = get().professionProgress;
        const current = progress[id] ?? { status: 'not_started' };
        set({
          selectedProfessionId: id,
          currentScreen: 'profession_intro',
          professionProgress: {
            ...progress,
            [id]: {
              status:
                current.status === 'not_started' ? 'in_progress' : current.status,
            },
          },
        });
      },

      startProfessionTask: () => set({ currentScreen: 'profession_task' }),

      completeProfessionAndGoNext: () => {
        const { selectedProfessionId, professionProgress } = get();
        const updatedProgress = {
          ...professionProgress,
          [selectedProfessionId]: { status: 'completed' as const },
        };
        const next = getNextProfession(selectedProfessionId);
        if (!next) {
          set({ professionProgress: updatedProgress, currentScreen: 'final_intro' });
          return;
        }
        const nextEntry = updatedProgress[next.id] ?? { status: 'not_started' };
        set({
          professionProgress: {
            ...updatedProgress,
            [next.id]: {
              status:
                nextEntry.status === 'not_started' ? 'in_progress' : nextEntry.status,
            },
          },
          selectedProfessionId: next.id,
          currentScreen: 'profession_intro',
        });
      },

      openFinalGame: () => set({ currentScreen: 'final_intro' }),

      startFinalGame: () => {
        const { completedFinalLocations } = get();
        const next =
          FINAL_GAME_LOCATIONS.find(
            (loc) => !completedFinalLocations.includes(loc.id)
          ) ?? FINAL_GAME_LOCATIONS[0];
        set({
          selectedFinalLocationId: next.id,
          currentScreen: 'final_location',
        });
      },

      completeFinalLocation: (locationId) => {
        const { completedFinalLocations } = get();
        const updated = completedFinalLocations.includes(locationId)
          ? completedFinalLocations
          : [...completedFinalLocations, locationId];
        const next = getNextFinalLocation(locationId);
        set({
          completedFinalLocations: updated,
          ...(next
            ? { selectedFinalLocationId: next.id, currentScreen: 'final_location' }
            : { currentScreen: 'final_victory' }),
        });
      },

      restartFinalGame: () =>
        set({
          completedFinalLocations: [],
          selectedFinalLocationId: FINAL_GAME_LOCATIONS[0].id,
          currentScreen: 'final_location',
        }),

      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),

      resetProgress: () =>
        set({
          currentScreen: 'home',
          selectedProfessionId: PROFESSIONS[0].id,
          selectedFinalLocationId: FINAL_GAME_LOCATIONS[0].id,
          professionProgress: createInitialProfessionProgress(),
          completedFinalLocations: [],
        }),
    }),
    {
      // v2: новая структура сохранения (без опыта и дневника). Старые сохранения v1 не подхватываются.
      name: 'mir-professiy-save-v2',
      version: 2,
    }
  )
);
