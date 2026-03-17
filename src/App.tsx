import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from './store/uiStore';
import { LandingPage }   from './components/screens/LandingPage';
import { LoginPage }     from './components/screens/LoginPage';
import { SplashScreen }  from './components/screens/SplashScreen';
import { AvatarCreator } from './components/screens/AvatarCreator';
import { EditorScreen }    from './components/screens/EditorScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function App() {
  const { screen, darkMode } = useUIStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">

        {screen === 'landing' && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <LandingPage />
          </motion.div>
        )}

        {screen === 'login' && (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <LoginPage />
          </motion.div>
        )}

        {screen === 'splash' && (
          <motion.div
            key="splash"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <SplashScreen />
          </motion.div>
        )}

        {screen === 'creator' && (
          <motion.div
            key="creator"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <AvatarCreator />
          </motion.div>
        )}

        {screen === 'editor' && (
          <motion.div
            key="editor"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <EditorScreen />
          </motion.div>
        )}

        {screen === 'community' && (
          <motion.div
            key="community"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <CommunityScreen />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
