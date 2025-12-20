// src/App.jsx
import { useState, useEffect } from 'react';
import GameScreen from './components/Game/GameScreen';
import MainMenu from './components/Menu/MainMenu';
import DifficultySelection from './components/Menu/DifficultySelection';
import CharacterSelection from './components/Menu/CharacterSelection';
import TutorialScreen from './components/Tutorial/TutorialScreen';
import LeaderboardScreen from './components/Menu/LeaderboardScreen';
import AboutScreen from './components/Menu/AboutScreen';
import MouseTrail from './components/UI/MouseTrail';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [character, setCharacter] = useState('pink'); 
  const [loadGame, setLoadGame] = useState(false);
  
  // 1. THÊM STATE UI SCALE (Mặc định 100%)
  const [uiScale, setUiScale] = useState(100);

  // Hàm "Dịch chuyển"
  const goHome = () => setCurrentScreen('menu');
  const goGuide = () => setCurrentScreen('tutorial');
  const goLeaderboard = () => setCurrentScreen('leaderboard');
  const goAbout = () => setCurrentScreen('about');

  // Load Game
  const handleContinue = () => {
    try {
      const save = JSON.parse(localStorage.getItem('scratch_game_save'));
      if (save) {
        setDifficulty(save.difficulty || 'easy');
        setCharacter(save.characterId || 'pink');
        setLoadGame(true);
        setCurrentScreen('game');
      }
    } catch (e) {
      console.error("Failed to load game", e);
    }
  };

  const handleStartNew = () => {
    setLoadGame(false);
    localStorage.removeItem('scratch_game_save');
    setCurrentScreen('character');
  };

  // Xử lý chuyển level tiếp theo
  const handleNextLevel = () => {
    if (difficulty === 'easy') setDifficulty('normal');
    else if (difficulty === 'normal') setDifficulty('hard');
    // Restart game with new difficulty
    // Note: React state update might batch, so we might need to force remount or ensure GameScreen picks it up.
    // GameScreen takes 'difficulty' as prop, so it should re-render if key changes or internal logic resets.
    // However, GameScreen manages its own state (lives, level).
    // Safest way is to unmount GameScreen briefly or force reset.
    // But simply changing state here works if GameScreen listens to difficulty change.
    // To ensure full reset, we can toggle a key.
    setCurrentScreen('menu'); // Reset to menu briefly? No, user wants to play next level immediately.
    // Better: Just set Difficulty. But GameScreen needs to reset.
    // Let's rely on GameScreen to handle "restart" via key change.
    // Or we can modify GameScreen to accept a "key" prop that we increment.
    setTimeout(() => setCurrentScreen('game'), 0);
  };

  // Trick to force remount GameScreen when difficulty changes significantly if needed.
  // Using a key on GameScreen helps.

  return (
    // Áp dụng scale cho toàn bộ ứng dụng (nếu bạn muốn zoom cả app)
    // Hoặc chỉ truyền setUiScale xuống để Settings chỉnh
    <div 
      className="h-screen overflow-hidden font-sans select-none App"
      style={{ zoom: uiScale / 100 }} // (Tùy chọn) Dòng này giúp UI thực sự to/nhỏ
    >
      
      <MouseTrail />

      {/* 2. MENU CHÍNH */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onStart={handleStartNew}
          onContinue={handleContinue}
          onTutorial={goGuide} 
          onLeaderboard={goLeaderboard}
          onAbout={goAbout}
          onGoHome={goHome} 
          onGoGuide={goGuide}
          
          // --- QUAN TRỌNG: Truyền setUiScale xuống ---
          setUiScale={setUiScale} 
        />
      )}

      {/* 3. CHỌN NHÂN VẬT */}
      {currentScreen === 'character' && (
        <CharacterSelection 
          onSelectCharacter={(charId) => {
            setCharacter(charId); 
            setCurrentScreen('difficulty');
          }}
          onBack={goHome} 
        />
      )}

      {/* 4. CHỌN ĐỘ KHÓ */}
      {currentScreen === 'difficulty' && (
        <DifficultySelection 
          onSelectDifficulty={(diff) => {
            setDifficulty(diff);
            setCurrentScreen('game');
          }}
          onBack={() => setCurrentScreen('character')}
        />
      )}

      {/* 5. MÀN HÌNH GAME */}
      {currentScreen === 'game' && (
        <div className="relative h-full">
          <GameScreen 
            key={`${difficulty}-${character}-${loadGame ? 'load' : 'new'}`} // Force remount on diff change
            difficulty={difficulty} 
            characterId={character}
            loadGame={loadGame}
            onBack={goHome} 
            onGoGuide={goGuide}
            onNextLevel={handleNextLevel}
            
            // --- QUAN TRỌNG: Truyền setUiScale xuống ---
            setUiScale={setUiScale}
          />
        </div>
      )}

      {/* 6. MÀN HÌNH HƯỚNG DẪN */}
      {currentScreen === 'tutorial' && (
        <TutorialScreen 
          onBack={goHome} 
          onGoHome={goHome} 
          onGoGuide={goGuide}
          
          // --- QUAN TRỌNG: Truyền setUiScale xuống ---
          setUiScale={setUiScale}
        />
      )}

      {/* 7. BẢNG XẾP HẠNG */}
      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen onBack={goHome} />
      )}

      {/* 8. GIỚI THIỆU */}
      {currentScreen === 'about' && (
        <AboutScreen onBack={goHome} />
      )}

    </div>
  );
}

export default App;