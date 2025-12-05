// src/App.jsx
import { useState } from 'react';
import GameScreen from './components/Game/GameScreen';
import MainMenu from './components/Menu/MainMenu';
import DifficultySelection from './components/Menu/DifficultySelection';
import CharacterSelection from './components/Menu/CharacterSelection';
import TutorialScreen from './components/Tutorial/TutorialScreen'; // Import màn hình hướng dẫn
import MouseTrail from './components/UI/MouseTrail'; // Import hiệu ứng chuột

function App() {
  // Các màn hình: 'menu' | 'character' | 'difficulty' | 'game' | 'tutorial'
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [character, setCharacter] = useState('pink'); 

  return (
    <div className="h-screen overflow-hidden font-sans select-none App">
      
      {/* 1. Hiệu ứng chuột (Luôn hiển thị đè lên tất cả) */}
      <MouseTrail />

      {/* 2. MENU CHÍNH */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onStart={() => setCurrentScreen('character')} 
          // SỬA: Chuyển sang màn hình tutorial thay vì alert
          onTutorial={() => setCurrentScreen('tutorial')} 
        />
      )}

      {/* 3. CHỌN NHÂN VẬT */}
      {currentScreen === 'character' && (
        <CharacterSelection 
          onSelectCharacter={(charId) => {
            setCharacter(charId);         // Lưu nhân vật
            setCurrentScreen('difficulty'); // Sang chọn độ khó
          }}
          onBack={() => setCurrentScreen('menu')}
        />
      )}

      {/* 4. CHỌN ĐỘ KHÓ */}
      {currentScreen === 'difficulty' && (
        <DifficultySelection 
          onSelectDifficulty={(diff) => {
            setDifficulty(diff);
            setCurrentScreen('game'); // Sang màn chơi game
          }}
          onBack={() => setCurrentScreen('character')} // Quay lại chọn tướng
        />
      )}

      {/* 5. MÀN HÌNH GAME */}
      {currentScreen === 'game' && (
        <div className="relative h-full">
          <GameScreen 
            difficulty={difficulty} 
            characterId={character}
            onBack={() => setCurrentScreen('menu')} // Nút Home trong game sẽ về Menu
          />
        </div>
      )}

      {/* 6. MÀN HÌNH HƯỚNG DẪN */}
      {currentScreen === 'tutorial' && (
        <TutorialScreen 
          onBack={() => setCurrentScreen('menu')} // Quay lại Menu
        />
      )}

    </div>
  );
}

export default App;