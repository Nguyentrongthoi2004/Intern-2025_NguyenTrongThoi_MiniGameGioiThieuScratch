// src/components/Game/GameScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';

import { levels } from '../../data/levels';
import ResultModal from '../UI/ResultModal';
import SettingsModal from '../UI/SettingsModal';
import GameControls from './GameControls';
import GamePanel from './GamePanel';
import GameMonitor from './GameMonitor';

// ================== CYBER GAMING BACKGROUND DECOR ==================
const ThemeDecorations = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Lớp glow nền chung */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at top, rgba(129,140,248,0.35) 0, transparent 55%), radial-gradient(circle at bottom, rgba(8,47,73,0.9) 0, transparent 60%)'
            : 'radial-gradient(circle at top, rgba(56,189,248,0.4) 0, transparent 55%), radial-gradient(circle at bottom, rgba(30,64,175,0.85) 0, transparent 60%)',
        }}
      />

      {/* ========= LIGHT THEME: CYBER MORNING ========= */}
      {!isDark && (
        <>
          {/* Gradient trời sáng nhưng vẫn game */}
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'radial-gradient(circle at top left, rgba(59,130,246,0.45) 0, transparent 55%), ' +
                'radial-gradient(circle at bottom right, rgba(244,114,182,0.4) 0, transparent 60%)',
            }}
          />

          {/* Mặt trời neon */}
          <motion.div
            className="absolute w-32 h-32 rounded-full top-10 right-16"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, #fef9c3, #fde047, #f97316)',
              boxShadow:
                '0 0 50px rgba(250,204,21,0.9), 0 0 120px rgba(251,191,36,0.7)',
            }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Horizon glow */}
          <div
            className="absolute bottom-[32%] left-1/2 w-[1200px] h-40 -translate-x-1/2 blur-[60px] opacity-70"
            style={{
              background:
                'radial-gradient(circle at center, rgba(248,250,252,0.9), transparent 60%)',
            }}
          />

          {/* Tia ánh sáng quét ngang */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute -bottom-12 -left-40 w-[55vw] h-32 bg-gradient-to-r from-white/15 via-cyan-300/40 to-transparent skew-x-[-18deg]"
              animate={{ x: ['-40vw', '120vw'] }}
              transition={{
                duration: 22 + i * 5,
                repeat: Infinity,
                delay: i * 3,
                ease: 'linear',
              }}
            />
          ))}

          {/* Hạt sáng nhỏ */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: 2,
                height: 2,
                top: `${10 + Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.15, 0.9, 0.2], y: [0, -6, 0] }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </>
      )}

      {/* ========= DARK THEME: NEON GRID ========= */}
      {isDark && (
        <>
          {/* Lưới 3D xanh dương */}
          <div
            className="absolute inset-x-[-20%] bottom-[-40%] h-[140%] opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(rgba(8,145,178,0.6) 1px, transparent 1px), ' +
                'linear-gradient(90deg, rgba(8,145,178,0.6) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transform:
                'perspective(650px) rotateX(68deg) translateY(-40px) scale(1.4)',
            }}
          />

          {/* Glow chân trời */}
          <div
            className="absolute bottom-0 left-1/2 w-[1300px] h-[420px] -translate-x-1/2 blur-[85px] opacity-70"
            style={{
              background:
                'radial-gradient(circle at top, rgba(56,189,248,0.95), transparent 65%)',
            }}
          />

          {/* Mặt trăng / hành tinh */}
          <motion.div
            className="absolute rounded-full top-10 right-16 w-28 h-28"
            style={{
              background:
                'radial-gradient(circle at 25% 30%, #e2e8f0, #94a3b8, #64748b)',
              boxShadow:
                'inset -6px -6px 18px rgba(15,23,42,0.95), 0 0 40px rgba(168,85,247,0.9)',
            }}
            animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute w-5 h-5 rounded-full top-4 left-6 bg-slate-500/25" />
            <div className="absolute rounded-full w-7 h-7 bottom-6 right-7 bg-slate-500/25" />
          </motion.div>

          {/* Sao lấp lánh */}
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-100"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.1, 0.95, 0.1] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Laser quét chéo */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute -top-16 left-[-25%] w-[70vw] h-24 bg-gradient-to-r from-purple-500/40 via-cyan-400/40 to-transparent skew-y-[-16deg]"
              animate={{ x: ['-30vw', '120vw'] }}
              transition={{
                duration: 26 + i * 6,
                repeat: Infinity,
                delay: 2 + i * 4,
                ease: 'linear',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

// ================== GAME SCREEN ==================
const GameScreen = ({ difficulty, onBack, characterId }) => {
  const gameLevels = levels.filter((lvl) => lvl.difficulty === difficulty);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [hideUI, setHideUI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [enableBlur, setEnableBlur] = useState(true);
  const [enableSound, setEnableSound] = useState(true);

  const [characterState, setCharacterState] = useState({
    x: 0,
    y: 0,
    rotation: 90,
    status: 'idle',
  });

  const containerControls = useAnimation();
  const currentLevel = gameLevels[currentLevelIndex];

  // Reset khi đổi độ khó
  useEffect(() => {
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter();
    setModal(null);
  }, [difficulty]);

  const resetCharacter = () => {
    setCharacterState({ x: 0, y: 0, rotation: 90, status: 'idle' });
  };

  // Logic chạy block (giữ nguyên)
  const executeBlockAction = (blockText) => {
    setCharacterState((prev) => ({ ...prev, status: 'move' }));

    if (blockText.includes('Move')) {
      const steps = parseInt(blockText.match(/-?\d+/)?.[0]) || 10;
      setCharacterState((prev) => {
        const rad = (prev.rotation - 90) * (Math.PI / 180);
        return {
          ...prev,
          x: prev.x + Math.cos(rad) * steps * 5,
          y: prev.y + Math.sin(rad) * steps * 5,
        };
      });
    } else if (blockText.includes('Turn right')) {
      const degrees = parseInt(blockText.match(/\d+/)?.[0]) || 15;
      setCharacterState((prev) => ({ ...prev, rotation: prev.rotation + degrees }));
    } else if (blockText.includes('Turn left')) {
      const degrees = parseInt(blockText.match(/\d+/)?.[0]) || 15;
      setCharacterState((prev) => ({ ...prev, rotation: prev.rotation - degrees }));
    } else if (blockText.includes('Go to x: 0 y: 0')) {
      setCharacterState((prev) => ({ ...prev, x: 0, y: 0 }));
    }

    setTimeout(() => {
      setCharacterState((prev) => ({ ...prev, status: 'idle' }));
    }, 500);
  };

  const handleBlockClick = (blockId) => {
    if (lives <= 0 || modal || showSettings) return;

    const selectedBlock = currentLevel.options.find((opt) => opt.id === blockId);
    if (!selectedBlock) return;

    if (blockId === currentLevel.correctBlockId) {
      executeBlockAction(selectedBlock.text);

      setTimeout(() => {
        if (currentLevelIndex < gameLevels.length - 1) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setModal({ type: 'correct', message: 'Xuất sắc! Tiếp tục nào!' });
        } else {
          confetti({ particleCount: 200, spread: 100 });
          setModal({ type: 'win', message: 'Bạn là bậc thầy Code!' });
        }
      }, 800);
    } else {
      const newLives = lives - 1;
      setLives(newLives);

      // Lắc nhẹ cả layout
      containerControls.start({
        x: [-5, 5, -5, 5, 0],
        transition: { duration: 0.3 },
      });

      if (newLives <= 0) {
        setCharacterState((prev) => ({ ...prev, status: 'death' }));
        setTimeout(() => {
          setModal({ type: 'gameover', message: 'Hết mạng rồi! Cố lên nhé!' });
        }, 1000);
      } else {
        setCharacterState((prev) => ({ ...prev, status: 'hurt' }));
        setModal({ type: 'wrong', message: 'Sai rồi, thử lại xem!' });
        setTimeout(() => {
          setCharacterState((prev) => ({ ...prev, status: 'idle' }));
        }, 500);
      }
    }
  };

  const handleNextLevel = () => {
    if (modal?.type === 'correct') {
      setModal(null);
      setCurrentLevelIndex((prev) => prev + 1);
      resetCharacter();
    } else if (modal?.type === 'wrong') {
      setModal(null);
    } else if (modal?.type === 'win' || modal?.type === 'gameover') {
      if (onBack) onBack();
    }
  };

  const isDark = theme === 'dark';

  // Base màu nền – đều là gaming, chỉ khác tông
  const mainBgClass = isDark ? 'bg-slate-950' : 'bg-slate-900';

  // ================== CYBER THEME CHO PANEL / TEXT ==================
  const currentTheme = isDark
    ? {
        // Dark: tím – cyan
        panel:
          'bg-[#020617]/90 backdrop-blur-xl border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.4)]',
        textTitle: 'text-cyan-300 font-extrabold',
        textSub: 'text-slate-300 font-semibold',
        blockTextMain: 'text-slate-50',
        blockTextSub: 'text-cyan-300',
        boxTask:
          'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 border-l-4 border-cyan-400 text-slate-100',
        blockWrapper:
          'bg-slate-900/80 border-slate-700 hover:border-cyan-400 hover:bg-slate-900',
      }
    : {
        // Light: xanh dương – vàng neon nhưng nền vẫn dark để đồng bộ monitor
        panel:
          'bg-[#020617]/90 backdrop-blur-xl border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.5)]',
        textTitle: 'text-sky-300 font-extrabold',
        textSub: 'text-slate-200 font-semibold',
        blockTextMain: 'text-slate-50',
        blockTextSub: 'text-sky-300',
        boxTask:
          'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 border-l-4 border-sky-400 text-slate-100',
        blockWrapper:
          'bg-slate-900/80 border-slate-700 hover:border-sky-400 hover:bg-slate-900',
      };

  if (!currentLevel) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-full h-screen overflow-hidden flex flex-col ${mainBgClass}`}
      animate={containerControls}
    >
      <ThemeDecorations theme={theme} />

      {/* Nút điều khiển góc trên trái */}
      <div className="absolute top-0 left-0 z-50 p-4">
        <GameControls
          onBack={onBack}
          setShowSettings={setShowSettings}
          toggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          theme={theme}
          setHideUI={setHideUI}
          hideUI={hideUI}
        />
      </div>

      <AnimatePresence>
        {!hideUI && (
          <motion.div
            className="z-10 flex items-center justify-center flex-1 w-full min-h-0 px-8 pt-24 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex gap-12 w-full h-full max-w-[1800px] items-center justify-between">
              {/* CỘT TRÁI - GamePanel */}
              <motion.div
                className="w-[28%] min-w-[350px] max-w-[450px] h-full flex-none flex flex-col"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GamePanel
                  theme={theme}
                  currentTheme={currentTheme}
                  currentLevelIndex={currentLevelIndex}
                  totalLevels={gameLevels.length}
                  lives={lives}
                  currentLevel={currentLevel}
                  handleBlockClick={handleBlockClick}
                />
              </motion.div>

              {/* CỘT PHẢI - GameMonitor */}
              <motion.div
                className="relative flex items-center justify-end flex-1 h-full"
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Hào quang phía sau Switch */}
                <div
                  className={`absolute right-32 top-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-[50%] blur-[120px] opacity-40 pointer-events-none ${
                    isDark ? 'bg-cyan-500/80' : 'bg-sky-400/80'
                  }`}
                />
                <GameMonitor
                  isDark={isDark}
                  difficulty={difficulty}
                  currentLevelIndex={currentLevelIndex}
                  characterState={characterState}
                  characterId={characterId}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            isBlur={enableBlur}
            toggleBlur={() => setEnableBlur(!enableBlur)}
            isSound={enableSound}
            toggleSound={() => setEnableSound(!enableSound)}
          />
        )}

        {modal && (
          <ResultModal
            type={modal.type}
            message={modal.message}
            onNext={handleNextLevel}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;
