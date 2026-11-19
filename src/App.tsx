import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useGameStore } from './store/useGameStore';
import { TopBar } from './components/layout/TopBar';
import { HomeScreen } from './components/screens/HomeScreen';
import {
  ProfessionIntroScreen,
  ProfessionTaskScreen,
} from './components/screens/ProfessionCycleScreens';
import {
  FinalIntroScreen,
  FinalLocationScreen,
  FinalVictoryScreen,
} from './components/screens/FinalGameScreens';

export default function App() {
  const currentScreen = useGameStore((s) => s.currentScreen);
  const selectedProfessionId = useGameStore((s) => s.selectedProfessionId);
  const selectedFinalLocationId = useGameStore(
    (s) => s.selectedFinalLocationId
  );

  const screenKey = `${currentScreen}-${selectedProfessionId}-${selectedFinalLocationId}`;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'profession_intro':
        return <ProfessionIntroScreen />;
      case 'profession_task':
        return <ProfessionTaskScreen />;
      case 'final_intro':
        return <FinalIntroScreen />;
      case 'final_location':
        return <FinalLocationScreen />;
      case 'final_victory':
        return <FinalVictoryScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF0FF] text-[#1E1B4B]">
      <TopBar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
