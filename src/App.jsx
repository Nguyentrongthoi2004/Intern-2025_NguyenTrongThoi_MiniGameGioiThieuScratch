// src/App.jsx
import { useState } from 'react';
import GameScreen from './components/Game/GameScreen';
import MainMenu from './components/Menu/MainMenu';
import DifficultySelection from './components/Menu/DifficultySelection';
import CharacterSelection from './components/Menu/CharacterSelection';
import MouseTrail from './components/UI/MouseTrail'; // <--- 1. Import hiệu ứng chuột

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [character, setCharacter] = useState('pink'); 

  return (
    <div className="h-screen overflow-hidden font-sans select-none App">
      
      {/* 2. Kích hoạt hiệu ứng chuột (Luôn hiển thị) */}
      <MouseTrail />

      {/* 1. MENU CHÍNH */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onStart={() => setCurrentScreen('character')} 
          onTutorial={() => alert("Coming soon!")} 
        />
      )}

      {/* 2. CHỌN NHÂN VẬT */}
      {currentScreen === 'character' && (
        <CharacterSelection 
          onSelectCharacter={(charId) => {
            setCharacter(charId);
            setCurrentScreen('difficulty');
          }}
          onBack={() => setCurrentScreen('menu')}
        />
      )}

      {/* 3. CHỌN ĐỘ KHÓ */}
      {currentScreen === 'difficulty' && (
        <DifficultySelection 
          onSelectDifficulty={(diff) => {
            setDifficulty(diff);
            setCurrentScreen('game');
          }}
          onBack={() => setCurrentScreen('character')}
        />
      )}

      {/* 4. MÀN HÌNH GAME */}
      {currentScreen === 'game' && (
        <div className="relative h-full">
          {/* Lưu ý: Nút Home nhỏ đã được xóa vì trong GameScreen đã có nút Home xịn hơn */}
          
          <GameScreen 
            difficulty={difficulty} 
            characterId={character}
            onBack={() => setCurrentScreen('menu')} 
          />
        </div>
      )}
    </div>
  );
}

export default App;