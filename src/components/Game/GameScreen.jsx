// src/components/Game/GameScreen.jsx
import React, { useState, useEffect } from 'react';
import { levels } from '../../data/levels';
import Block from '../Block/Block';
import Stage from './Stage';
import ResultModal from '../UI/ResultModal';

const GameScreen = ({ difficulty, onBack, characterId }) => {
  
  const gameLevels = levels.filter(lvl => lvl.difficulty === difficulty);
  
  // --- STATE ---
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState('light');

  const [characterState, setCharacterState] = useState({
    x: 0, y: 0, rotation: 90, status: 'idle' 
  });
  
  const currentLevel = gameLevels[currentLevelIndex];

  // --- EFFECT ---
  useEffect(() => {
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter();
    setModal(null);
  }, [difficulty]);

  const resetCharacter = () => {
    setCharacterState({ x: 0, y: 0, rotation: 90, status: 'idle' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!currentLevel) return <div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-500">Loading...</div>;

  // --- LOGIC XỬ LÝ HÀNH ĐỘNG ---
  const executeBlockAction = (blockText) => {
    setCharacterState(prev => ({ ...prev, status: 'move' }));
    if (blockText.includes("Move")) {
        const steps = parseInt(blockText.match(/-?\d+/)[0]) || 10;
        setCharacterState(prev => {
            const rad = (prev.rotation - 90) * (Math.PI / 180);
            return {
                ...prev,
                x: prev.x + Math.cos(rad) * steps * 5, 
                y: prev.y + Math.sin(rad) * steps * 5 
            };
        });
    } else if (blockText.includes("Turn right")) {
        const degrees = parseInt(blockText.match(/\d+/)[0]) || 15;
        setCharacterState(prev => ({ ...prev, rotation: prev.rotation + degrees }));
    } else if (blockText.includes("Turn left")) {
        const degrees = parseInt(blockText.match(/\d+/)[0]) || 15;
        setCharacterState(prev => ({ ...prev, rotation: prev.rotation - degrees }));
    } else if (blockText.includes("Go to x: 0 y: 0")) {
        setCharacterState(prev => ({ ...prev, x: 0, y: 0 }));
    }
    setTimeout(() => {
        setCharacterState(prev => ({ ...prev, status: 'idle' }));
    }, 500);
  };

  // --- LOGIC GAMEPLAY ---
  const handleBlockClick = (blockId) => {
    if (lives <= 0 || modal) return;

    const selectedBlock = currentLevel.options.find(opt => opt.id === blockId);

    if (blockId === currentLevel.correctBlockId) {
      executeBlockAction(selectedBlock.text);
      setTimeout(() => {
        if (currentLevelIndex < gameLevels.length - 1) {
            setModal({ type: 'correct', message: 'Bạn làm tốt lắm!' });
        } else {
            setModal({ type: 'win', message: 'Bạn là thiên tài lập trình!' });
        }
      }, 800);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setCharacterState(prev => ({ ...prev, status: 'death' }));
        setTimeout(() => {
            setModal({ type: 'gameover', message: 'Hết mạng rồi huhu!' });
        }, 1000);
      } else {
        setCharacterState(prev => ({ ...prev, status: 'hurt' }));
        setModal({ type: 'wrong', message: 'Chưa đúng, thử lại nhé!' });
        setTimeout(() => {
            setCharacterState(prev => ({ ...prev, status: 'idle' }));
        }, 500);
      }
    }
  };

  const handleNextLevel = () => {
    if (modal.type === 'correct') {
        setModal(null);
        setCurrentLevelIndex(prev => prev + 1);
        resetCharacter();
    } else if (modal.type === 'wrong') {
        setModal(null); 
    } else if (modal.type === 'win' || modal.type === 'gameover') {
        if (onBack) onBack(); 
    }
  };

  // --- THEME CONFIG ---
  const isDark = theme === 'dark';
  const styles = {
    light: {
        panel: 'bg-white/60 border-white text-slate-800 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-lg',
        textTitle: 'text-indigo-600 drop-shadow-sm',
        textSub: 'text-indigo-400',
        boxTask: 'bg-white/80 border-indigo-300 text-indigo-900 shadow-inner',
        // Hiệu ứng hover cho Block (Light Mode): Nổi lên + Viền xanh đậm
        blockItem: 'bg-white/90 border-white hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1',
        blockText: 'text-slate-700'
    },
    dark: {
        panel: 'bg-slate-900/80 border-cyan-900/50 text-cyan-50 shadow-[0_0_30px_rgba(8,145,178,0.2)] backdrop-blur-md',
        textTitle: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]',
        textSub: 'text-cyan-200/70',
        boxTask: 'bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]',
        // Hiệu ứng hover cho Block (Dark Mode): Phát sáng Neon + Viền Cyan
        blockItem: 'bg-slate-800/80 border-slate-600 hover:bg-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-1',
        blockText: 'text-cyan-50'
    }
  };

  const currentTheme = styles[theme];

  return (
    <div className={`relative flex h-screen p-6 overflow-hidden font-sans pt-20 transition-colors duration-700 bg-slate-900`}>
      
      {/* === BACKGROUND ĐỘNG === */}
      {!isDark && (
        <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-sky-200 to-blue-300 animate-[pulse_8s_infinite]"></div>
            <div className="absolute inset-0 opacity-40" 
                 style={{ 
                     backgroundImage: 'linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px)',
                     backgroundSize: '60px 60px',
                     transform: 'perspective(500px) rotateX(20deg) scale(1.5)',
                     animation: 'grid-move 20s linear infinite'
                 }}>
            </div>
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/40 rounded-full blur-3xl animate-[bounce_10s_infinite]"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl animate-[pulse_12s_infinite]"></div>
        </>
      )}

      {isDark && (
        <>
            <div className="absolute inset-0 bg-[#050b14]"></div>
            <div className="absolute inset-0 animate-[ping_3s_infinite] opacity-30" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                     backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                     backgroundSize: '40px 40px',
                     transform: 'perspective(500px) rotateX(20deg) scale(1.5)',
                     animation: 'grid-move 20s linear infinite'
                 }}>
            </div>
            <div className="absolute left-0 right-0 h-full -bottom-1/2 bg-gradient-to-t from-cyan-900/40 via-purple-900/20 to-transparent blur-3xl animate-pulse"></div>
        </>
      )}

      <style>{`
        @keyframes grid-move {
            0% { transform: perspective(500px) rotateX(20deg) scale(1.5) translateY(0); }
            100% { transform: perspective(500px) rotateX(20deg) scale(1.5) translateY(40px); }
        }
      `}</style>
      
      {/* --- CỤM NÚT ĐIỀU KHIỂN (CÓ HIỆU ỨNG HOVER GLOW) --- */}
      <div className="absolute z-50 flex gap-3 top-6 left-6">
        {/* Nút HOME */}
        <button 
            onClick={() => onBack && onBack()}
            className={`w-12 h-12 rounded-xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
                ${isDark ? 'bg-red-900/80 border-red-500 text-red-200 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'bg-red-500 hover:bg-red-400 text-white border-red-600 hover:shadow-red-300'}`}
            title="Về trang chủ"
        >
            <span className="text-2xl">🏠</span>
        </button>

        {/* Nút SETTING */}
        <button 
            onClick={() => alert("Cài đặt đang phát triển!")}
            className={`w-12 h-12 rounded-xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
                ${isDark ? 'bg-slate-800/80 border-slate-500 text-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 border-slate-300 hover:shadow-lg'}`}
            title="Cài đặt"
        >
            <span className="text-2xl animate-spin-slow hover:animate-spin">⚙️</span>
        </button>

        {/* Nút THEME */}
        <button 
            onClick={toggleTheme}
            className={`w-12 h-12 rounded-xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
                ${isDark ? 'bg-yellow-600/80 border-yellow-400 text-yellow-200 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'bg-indigo-500 hover:bg-indigo-400 text-white border-indigo-600 hover:shadow-indigo-300'}`}
            title="Đổi giao diện"
        >
            <span className="text-2xl">{theme === 'light' ? '🌙' : '☀️'}</span>
        </button>
      </div>

      {/* --- MODAL --- */}
      {modal && (
        <ResultModal 
            type={modal.type} 
            message={modal.message} 
            onNext={handleNextLevel} 
        />
      )}

      {/* --- CỘT TRÁI: BẢNG ĐIỀU KHIỂN --- */}
      <div className={`relative z-10 flex flex-col w-2/5 h-full p-6 mr-6 transition-all border-4 rounded-3xl mt-4 ${currentTheme.panel}`}>
         
         {/* Header */}
         <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
                <span className={`text-xs font-extrabold tracking-widest uppercase ${currentTheme.textSub}`}>Màn chơi</span>
                <span className={`font-mono text-2xl font-black ${currentTheme.textTitle}`}>
                    {currentLevelIndex + 1}<span className="text-lg opacity-50">/</span>{gameLevels.length}
                </span>
            </div>
            
            {/* Thanh máu (Hover vào tim sẽ đập) */}
            <div className={`flex gap-2 px-3 py-1 rounded-full border-2 shadow-sm transition-all hover:scale-105 ${isDark ? 'bg-black/40 border-cyan-900' : 'bg-white/50 border-white'}`}>
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl transition-all duration-300 cursor-default hover:scale-125 ${i < lives ? 'scale-100' : 'scale-75 opacity-30 grayscale'}`}>
                        {i < lives ? '❤️' : '🖤'} 
                    </span>
                ))}
            </div>
         </div>

         {/* Tiêu đề & Nhiệm vụ */}
         <div className="mb-4">
            <h1 className={`mb-2 text-3xl font-black drop-shadow-sm ${currentTheme.textTitle}`}>{currentLevel.title}</h1>
            
            <div className={`p-4 mb-2 border-l-8 rounded-r-xl shadow-sm transition-transform hover:translate-x-1 ${currentTheme.boxTask}`}>
                <p className="flex items-start gap-2 text-lg font-bold">
                    <span className="animate-bounce">🎯</span> {currentLevel.instruction}
                </p>
            </div>
            
            <p className={`ml-1 text-xs italic ${currentTheme.textSub}`}>
                💡 {currentLevel.hint || "Hãy chọn khối lệnh phù hợp nhất bên dưới."}
            </p>
         </div>
         
         {/* Danh sách Block */}
         <div className="flex-1 p-2 overflow-y-auto custom-scrollbar">
             <div className="space-y-4">
                 {currentLevel.options.map(opt => (
                     <div 
                        key={opt.id} 
                        // Áp dụng class hover động dựa theo theme
                        className={`flex items-center gap-4 cursor-pointer group rounded-xl border-2 shadow-sm transition-all duration-300 ${currentTheme.blockItem}`}
                        onClick={() => handleBlockClick(opt.id)}
                     >
                         {/* Cột 1: Block */}
                         <div className="relative z-20 p-2 transition-transform duration-300 transform group-hover:scale-110 group-hover:rotate-2">
                            <Block type={opt.type} text={opt.text} />
                         </div>

                         {/* Cột 2: Mô tả */}
                         <div className="relative z-10 flex-1 p-2">
                             <p className={`text-lg font-bold ${currentTheme.blockText}`}>{opt.text}</p>
                             <p className={`mt-1 text-xs tracking-widest uppercase ${currentTheme.textSub}`}>{opt.type}</p>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>

      {/* --- CỘT PHẢI: STAGE AREA --- */}
      <div className="relative z-10 flex flex-col w-3/5 h-full mt-4">
         
         {/* Badge Độ khó */}
         <div className="absolute z-20 transition-transform -top-3 right-8 hover:scale-110">
            <span className={`px-6 py-2 rounded-b-xl text-sm font-black uppercase shadow-[0_0_15px_rgba(0,0,0,0.5)] tracking-widest border-t-0 border-4
                ${isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-600' : 'bg-white text-indigo-600 border-white'}`}>
                Cấp độ: {difficulty}
            </span>
         </div>

         {/* Khung Màn Hình TV */}
         <div className={`relative flex items-center justify-center flex-1 p-4 shadow-2xl rounded-3xl border-b-8 transition-colors duration-500
            ${isDark ? 'bg-slate-900 border-black ring-4 ring-cyan-900/50 shadow-[0_0_50px_rgba(6,182,212,0.3)]' : 'bg-slate-200 border-slate-400 ring-4 ring-white/50'}`}>
            
            {/* Đèn tín hiệu */}
            <div className={`absolute flex flex-col items-center justify-around w-2 py-2 rounded-full top-1/2 left-2 h-16
                ${isDark ? 'bg-cyan-950 border border-cyan-800' : 'bg-slate-300 border border-slate-400'}`}>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-ping"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>

            {/* Stage */}
            <div className={`relative w-full h-full overflow-hidden border-4 shadow-inner rounded-2xl
                ${isDark ? 'border-cyan-900 bg-black' : 'border-slate-400 bg-white'}`}>
                <Stage 
                    key={currentLevelIndex} 
                    x={characterState.x} 
                    y={characterState.y} 
                    rotation={characterState.rotation} 
                    status={characterState.status}
                    characterId={characterId}
                />
            </div>
         </div>
      </div>

    </div>
  );
};

export default GameScreen;