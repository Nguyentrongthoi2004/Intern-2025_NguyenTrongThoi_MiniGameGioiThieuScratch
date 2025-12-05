// src/components/Menu/CharacterSelection.jsx
import React from 'react';

const CharacterSelection = ({ onSelectCharacter, onBack }) => {
  
  const characters = [
    { 
      id: 'pink', 
      name: 'Pinky', 
      img: '/assets/images/characters/pink/Pink_Monster.png',
      color: 'bg-pink-500 border-pink-700'
    },
    { 
      id: 'owlet', 
      name: 'Owlet', 
      img: '/assets/images/characters/owlet/Owlet_Monster.png',
      color: 'bg-slate-500 border-slate-700'
    },
    { 
      id: 'dude', 
      name: 'Dude', 
      img: '/assets/images/characters/dude/Dude_Monster.png',
      color: 'bg-yellow-500 border-yellow-700'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white">
      
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 animate-bg-scroll"
        style={{
            backgroundImage: "url('/assets/images/bg-stage.png')", 
            backgroundPosition: 'center bottom', 
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl p-4">
        <h1 className="mb-10 text-4xl font-extrabold tracking-widest uppercase drop-shadow-md">
          Chọn nhân vật của bạn
        </h1>

        <div className="flex justify-center w-full gap-8">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => onSelectCharacter(char.id)}
              className={`
                group relative w-48 h-64 rounded-3xl border-4 transition-all duration-300
                hover:-translate-y-4 hover:shadow-2xl flex flex-col items-center 
                justify-center pb-4
                ${char.color} shadow-lg
              `}
            >
              {/* Vòng tròn sáng sau lưng nhân vật */}
              <div className="absolute w-32 h-32 transition-all -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-white/30 blur-xl group-hover:bg-white/50"></div>

              {/* Ảnh nhân vật */}
              <img 
                src={char.img} 
                alt={char.name} 
                className="z-10 object-contain object-bottom w-32 h-32 mb-2 transition-transform pixelated group-hover:scale-110"
                onError={(e) => { e.target.src = '/assets/images/characters/pink/Pink_Monster.png'; }}
              />
              
              <h3 className="z-10 text-2xl font-bold tracking-wider uppercase">{char.name}</h3>
            </button>
          ))}
        </div>

        {/* --- NÚT QUAY LẠI (STYLE XÁM ĐÁ 3D) --- */}
        <button 
          onClick={onBack}
          className="
            mt-12
            relative group
            bg-slate-600 hover:bg-slate-500 text-white  /* Màu xám đá */
            font-bold py-3 px-12 rounded-full
            border-b-4 border-slate-800 hover:border-slate-700 /* Viền đáy tối màu tạo 3D */
            active:border-b-0 active:translate-y-1
            transition-all duration-200 ease-in-out
            flex items-center gap-3
            uppercase tracking-wider shadow-xl
          "
        >
          {/* Icon mũi tên */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Quay lại Menu
        </button>
      </div>
    </div>
  );
};

export default CharacterSelection;