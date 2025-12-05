// src/components/Game/GameMonitor.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Stage from './Stage';

const GameMonitor = ({ isDark, difficulty, currentLevelIndex, characterState, characterId }) => {
  const [seconds, setSeconds] = useState(0);

  // Đếm thời gian
  useEffect(() => {
    const timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // ===== TRẠNG THÁI NHÂN VẬT =====
  const isIdle = characterState.status === 'idle';
  const isWin = characterState.status === 'win';
  const isLose = characterState.status === 'lose';
  const isRunning = !isIdle && !isWin && !isLose;

  // Hiệu ứng cho cả cái máy
  const consoleAnimationClass = isLose
    ? "animate-lose-shake"   // THUA → rung mạnh 1 lần
    : isWin
    ? "animate-win-pop"      // THẮNG → bật nảy
    : isRunning
    ? "animate-shake-soft"   // ĐANG CHẠY → rung nhẹ
    : "";                    // IDLE → đứng yên

  // Style nút bấm
  const btnBase =
    "relative w-10 h-10 rounded-full bg-[#2a2a2a] shadow-[0_5px_0_#151515] " +
    "flex items-center justify-center cursor-pointer transition-all duration-100 " +
    "active:translate-y-[5px] active:shadow-none active:scale-95 " +
    "group border-b border-white/5 hover:bg-[#2f2f2f]";

  const btnTextLeft =
    "text-[#555] text-[10px] font-black group-hover:text-cyan-400 " +
    "group-active:text-cyan-300 transition-colors duration-200 " +
    "group-hover:drop-shadow-[0_0_5px_cyan]";

  const btnTextRight =
    "text-[#555] text-xs font-black group-hover:text-yellow-400 " +
    "group-active:text-yellow-200 transition-colors duration-200 " +
    "group-hover:drop-shadow-[0_0_5px_yellow]";

  // Particles trong màn hình (memo để không random mỗi lần render)
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        left: `${(i * 13) % 100}%`,
        top: `${(i * 17) % 100}%`,
        delay: `${i * 0.4}s`,
      })),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      
      {/* --- MÁY NINTENDO --- */}
      <div
        className={
          "relative flex items-center justify-center ml-12 transition-transform duration-300 filter drop-shadow-2xl " +
          consoleAnimationClass
        }
      >
        
        {/* --- JOY-CON TRÁI (XANH) --- */}
        <div className="w-44 h-[660px] bg-[#00c3e3] rounded-l-[5rem] border-y-4 border-l-4 border-[#00a3c3] flex flex-col items-center justify-center gap-12 relative z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.3)] overflow-hidden">
          
          {/* Shine Joy-Con */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-l-[5rem]">
            <div className="absolute top-0 w-24 h-full animate-shine -left-24 bg-gradient-to-b from-white/40 via-white/10 to-transparent rotate-12" />
          </div>

          {/* Nút - */}
          <div className="absolute top-12 right-10 w-10 h-2.5 bg-[#333] shadow-[0_1px_0_rgba(255,255,255,0.2)] rounded-sm cursor-pointer hover:bg-[#444]" />

          {/* Analog Stick */}
          <div className="w-24 h-24 rounded-full bg-[#1a1a1a] shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_5px_10px_rgba(255,255,255,0.05)] flex items-center justify-center border-b-4 border-[#111]">
            <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-[#333] relative cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#333] to-[#000] opacity-80" />
              <div className="w-12 h-12 rounded-full bg-[#151515] opacity-50 blur-[2px]" />
            </div>
          </div>

          {/* D-Pad */}
          <div className="grid grid-cols-3 gap-2 mt-4 scale-110">
            <div />
            <div className={btnBase}><span className={btnTextLeft}>▲</span></div>
            <div />
            <div className={btnBase}><span className={btnTextLeft}>◀</span></div>
            <div />
            <div className={btnBase}><span className={btnTextLeft}>▶</span></div>
            <div />
            <div className={btnBase}><span className={btnTextLeft}>▼</span></div>
            <div />
          </div>

          {/* Nút Capture */}
          <div className="absolute bottom-14 right-10 w-8 h-8 bg-[#222] rounded-lg border-2 border-[#333] shadow-inner hover:bg-[#2a2a2a] cursor-pointer" />
        </div>

        {/* --- MÀN HÌNH CHÍNH --- */}
        <div
          className={
            "relative bg-[#1a1a1a] border-y-[20px] border-x-[20px] border-[#222] w-[950px] h-[680px] rounded-3xl z-20 flex flex-col " +
            (isRunning
              ? "shadow-[0_0_30px_rgba(34,211,238,0.8)]"
              : isWin
              ? "shadow-[0_0_35px_rgba(96,165,250,0.9)]"
              : isLose
              ? "shadow-[0_0_35px_rgba(248,113,113,0.9)]"
              : "shadow-[0_0_15px_rgba(255,255,255,0.12)]")
          }
        >
          {/* Display Area */}
          <div className="relative flex-1 overflow-hidden bg-black border rounded-lg shadow-inner border-white/5">
            
            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* CRT scanline */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-overlay opacity-40" />

            {/* Particles */}
            <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
              {particles.map((p, i) => (
                <span
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/25 animate-float-particle"
                  style={{ left: p.left, top: p.top, animationDelay: p.delay }}
                />
              ))}
            </div>

            {/* STAGE CONTAINER */}
            <div className="flex items-center justify-center w-full h-full bg-black">
              <div
                style={{ width: '1024px', height: '576px' }}
                className="relative overflow-hidden bg-black rounded-md shadow-2xl animate-screen-in"
              >
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

            {/* Overlay WIN */}
            {isWin && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none bg-gradient-to-t from-black/70 via-black/40 to-transparent animate-fade-in-soft">
                <div className="flex gap-2 mb-4">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-6 rounded-full bg-gradient-to-t from-yellow-400 via-pink-400 to-sky-400 animate-confetti"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
                <div className="px-10 py-4 bg-black/70 border border-white/20 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.8)] backdrop-blur-md">
                  <p className="text-xs font-semibold tracking-[0.35em] text-sky-300 text-center mb-2 uppercase">
                    Level Complete
                  </p>
                  <p className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]">
                    VICTORY!
                  </p>
                </div>
              </div>
            )}

            {/* Overlay LOSE */}
            {isLose && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none bg-gradient-to-t from-red-950/90 via-black/80 to-transparent animate-fade-in-soft">
                <div className="mb-6 flex items-center gap-2 text-red-300 text-sm font-semibold tracking-[0.35em] uppercase">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span>Mission Failed</span>
                </div>
                <div className="px-10 py-4 bg-black/80 border border-red-500/40 rounded-2xl shadow-[0_0_30px_rgba(248,113,113,0.9)] backdrop-blur-md">
                  <p className="text-4xl font-black text-red-300 drop-shadow-[0_0_20px_rgba(248,113,113,0.9)]">
                    GAME OVER
                  </p>
                  <p className="mt-2 text-xs tracking-widest text-center text-red-200/80">
                    Thử lại để giải cứu chú mèo nhé!
                  </p>
                </div>
              </div>
            )}

            {/* Badge Level / Difficulty */}
            <div className="absolute z-30 top-5 right-5">
              <div className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black rounded-full border-2 border-white/20 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse">
                {difficulty} MODE
              </div>
            </div>
          </div>

          {/* Bottom Bezel (thanh dưới màn hình) */}
          <div className="h-10 bg-[#1a1a1a] flex items-center justify-center relative">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-3 h-6 border-2 border-[#888] rounded-l-[5px]" />
              <div className="w-3 h-6 bg-[#888] rounded-r-[5px] relative">
                <div className="absolute top-1.5 left-0.5 w-1 h-1 bg-[#1a1a1a] rounded-full" />
              </div>
            </div>
            <div className="absolute right-10 w-2 h-2 bg-[#000] rounded-full border border-[#333]" />
          </div>
        </div>

        {/* --- JOY-CON PHẢI (ĐỎ) --- */}
        <div className="w-44 h-[660px] bg-[#ff4554] rounded-r-[5rem] border-y-4 border-r-4 border-[#d63a46] flex flex-col items-center justify-center gap-12 relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.3)] overflow-hidden">
          
          {/* Shine Joy-Con */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-r-[5rem]">
            <div className="absolute top-0 w-24 h-full animate-shine -right-24 bg-gradient-to-b from-white/40 via-white/10 to-transparent -rotate-12" />
          </div>

          {/* Nút + */}
          <div className="absolute flex items-center justify-center w-10 h-10 cursor-pointer top-12 left-10 hover:opacity-80 active:scale-95">
            <div className="absolute w-10 h-2.5 bg-[#333] shadow-[0_1px_0_rgba(255,255,255,0.2)] rounded-sm" />
            <div className="absolute w-2.5 h-10 bg-[#333] shadow-[0_1px_0_rgba(255,255,255,0.2)] rounded-sm" />
          </div>

          {/* Các nút ABXY */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div />
            <div className={btnBase}><span className={btnTextRight}>X</span></div>
            <div />
            <div className={btnBase}><span className={btnTextRight}>Y</span></div>
            <div />
            <div className={btnBase}><span className={btnTextRight}>A</span></div>
            <div />
            <div className={btnBase}><span className={btnTextRight}>B</span></div>
            <div />
          </div>

          {/* Analog Stick */}
          <div className="w-24 h-24 rounded-full bg-[#1a1a1a] shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_5px_10px_rgba(255,255,255,0.05)] flex items-center justify-center border-b-4 border-[#111]">
            <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-[#333] relative cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#333] to-[#000] opacity-80" />
              <div className="w-12 h-12 rounded-full bg-[#151515] opacity-50 blur-[2px]" />
            </div>
          </div>

          {/* Nút Home */}
          <div className="absolute bottom-14 left-10 w-10 h-10 rounded-full border-[4px] border-[#333] bg-[#222] flex items-center justify-center shadow-inner cursor-pointer hover:bg-[#2a2a2a] group active:scale-95">
            <div className={`absolute inset-0 rounded-full ${isRunning ? 'bg-cyan-400/30 animate-ping' : ''}`} />
            <div
              className={
                "w-4 h-4 bg-[#111] rounded-full z-10 border border-[#444] group-hover:bg-[#333] transition-colors " +
                (isRunning ? 'bg-cyan-900 border-cyan-500' : '')
              }
            />
          </div>
        </div>

      </div>

      {/* --- DASHBOARD DƯỚI --- */}
      <div className="mt-8 ml-12 flex items-center gap-8 px-10 py-4 bg-[#0f172a]/90 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        {/* Thời gian */}
        <div className="flex items-center gap-4 pr-8 border-r border-white/10">
          <span className="text-3xl animate-[pulse_3s_infinite]">⏳</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Thời gian</span>
            <span className="font-mono text-2xl font-black text-cyan-400 tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              {formatTime(seconds)}
            </span>
          </div>
        </div>

        {/* Trạng thái */}
        <div className="flex items-center gap-4">
          <div className="relative flex w-4 h-4">
            <span
              className={
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 " +
                (isWin ? 'bg-blue-400' : isLose ? 'bg-red-400' : isIdle ? 'bg-green-400' : 'bg-yellow-400')
              }
            />
            <span
              className={
                "relative inline-flex rounded-full h-4 w-4 " +
                (isWin ? 'bg-blue-500' : isLose ? 'bg-red-500' : isIdle ? 'bg-green-500' : 'bg-yellow-500')
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Trạng thái</span>
            <span
              className={
                "text-base font-bold uppercase " +
                (isWin ? 'text-blue-400' : isLose ? 'text-red-400' : isIdle ? 'text-green-400' : 'text-yellow-400')
              }
            >
              {isWin
                ? 'LEVEL CLEARED'
                : isLose
                ? 'GAME OVER'
                : isIdle
                ? 'READY TO CODE'
                : 'PROCESSING...'}
            </span>
          </div>
        </div>

        {/* LED Wave */}
        <div className="flex gap-1.5 pl-4 ml-4 border-l border-white/10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`w-2 h-8 rounded-full ${
                i <= 4 ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_5px_cyan]' : 'bg-slate-700'
              } animate-bar-wave`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameMonitor;
