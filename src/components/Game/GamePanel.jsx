// src/components/Game/GamePanel.jsx
import React from 'react';
import Block from '../Block/Block';

const GamePanel = ({
  theme,
  currentTheme,
  currentLevelIndex,
  totalLevels,
  lives,
  currentLevel,
  handleBlockClick,
}) => {
  const isDark = theme === 'dark';

  // Style cho khung Tablet (vỏ ngoài)
  const frameBorder = isDark ? 'border-slate-700' : 'border-slate-300';
  const frameBg = isDark ? 'bg-slate-900/85' : 'bg-slate-50/95';
  const frameShadow = isDark
    ? 'shadow-[0_30px_80px_rgba(0,0,0,0.8)]'
    : 'shadow-[0_25px_60px_rgba(15,23,42,0.25)]';

  const progressPercent = ((currentLevelIndex + 1) / totalLevels) * 100;

  return (
    // VỎ TABLET
    <div
      className={`relative z-10 flex flex-col w-full h-full rounded-[2.5rem] border-[6px] ${frameBorder} ${frameBg} ${frameShadow} p-3 transition-all duration-500 overflow-hidden backdrop-blur-xl`}
    >
      {/* Camera & sensor trên đỉnh */}
      <div className="absolute z-20 flex items-center gap-2 -translate-x-1/2 top-2 left-1/2">
        <div className={`w-2 h-2 rounded-full shadow-sm ${isDark ? 'bg-slate-950' : 'bg-slate-500'}`} />
        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-400'}`} />
      </div>

      {/* THÂN ĐIỆN THOẠI (viền trong) */}
      <div
        className={`relative flex flex-col w-full h-full p-3 rounded-[2rem] border-[2px] ${
          isDark ? 'border-slate-700/70 bg-slate-950' : 'border-slate-200 bg-slate-900'
        }`}
      >
        {/* MÀN HÌNH ĐEN BÊN TRONG */}
        <div className="relative flex flex-col w-full h-full rounded-[1.5rem] bg-black/95 border border-slate-800 overflow-hidden px-5 py-4">
          {/* Ánh sáng nhẹ quanh mép màn hình */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] border border-white/5" />

          {/* ==== HEADER NGẮN GỌN ==== */}
          <div className="flex-none mb-4">
            <div className="flex items-start justify-between gap-4">
              {/* Level + tiến độ */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase">
                  <span className="px-2 py-[2px] rounded-full bg-white/5 text-slate-300">
                    CHƯƠNG TRÌNH
                  </span>
                </div>

                <div className="flex items-end gap-3">
                  <div>
                    <div
                      className={`text-[10px] font-black tracking-[0.25em] uppercase opacity-70 mb-1 ${currentTheme.textSub}`}
                    >
                      LEVEL
                    </div>
                    <div
                      className={`font-mono text-3xl font-black leading-none tracking-tight flex items-baseline gap-1 ${currentTheme.textTitle}`}
                    >
                      <span>{currentLevelIndex + 1}</span>
                      <span className="text-sm font-semibold opacity-40">/ {totalLevels}</span>
                    </div>
                  </div>

                  {/* Badge độ khó nhỏ gọn */}
                  <div
                    className={`px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-[0.22em] flex items-center gap-2 ${
                      isDark ? 'bg-slate-900/80 border-slate-700/80' : 'bg-slate-800/80 border-slate-600'
                    } ${currentTheme.textSub}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{currentLevel.difficultyLabel || 'STANDARD'}</span>
                  </div>
                </div>
              </div>

              {/* LIVES góc phải */}
              <div
                className={`flex flex-col items-end gap-1 px-3 py-2 rounded-2xl border shadow-sm min-w-[130px] ${
                  isDark ? 'bg-slate-950/80 border-slate-700/80' : 'bg-slate-900/90 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="text-[9px] tracking-[0.25em] font-bold text-slate-300">
                    LIVES
                  </span>
                  <span className="px-2 py-[1px] rounded-full bg-amber-500/20 text-[9px] font-semibold text-amber-300 uppercase tracking-[0.18em]">
                    x{lives}
                  </span>
                </div>
                <div className="flex self-start gap-1 pt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg transition-all duration-300 transform ${
                        i < lives ? 'scale-100 opacity-100' : 'scale-75 opacity-20 grayscale'
                      }`}
                    >
                      {i < lives ? '❤️' : '🖤'}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Thanh progress */}
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span>TIẾN ĐỘ LỘ TRÌNH</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 overflow-hidden rounded-full bg-slate-700/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* ==== NỘI DUNG CUỘN BÊN TRONG MÀN HÌNH ==== */}
          <div className="flex flex-col flex-1 min-h-0 space-y-4 overflow-y-auto pr-1.5 custom-scrollbar">
            {/* NHIỆM VỤ CHÍNH (không còn heading “Bước đi đầu tiên” nữa) */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span className="px-2 py-[2px] rounded-full bg-white/5">NHIỆM VỤ CHÍNH</span>
              </div>

              <div
                className={`relative p-4 border-l-[5px] rounded-r-2xl shadow-sm overflow-hidden group ${currentTheme.boxTask}`}
              >
                <span className="absolute -right-3 -bottom-3 text-6xl opacity-[0.04] rotate-12 pointer-events-none">
                  🎯
                </span>
                <p className="relative z-10 flex items-start gap-3 text-sm font-semibold leading-relaxed">
                  <span className="mt-0.5 text-lg">🎯</span>
                  <span>{currentLevel.instruction}</span>
                </p>
              </div>

              <p
                className={`mt-1 text-[11px] font-medium flex items-center gap-2 opacity-70 ${currentTheme.textSub}`}
              >
                <span className="text-yellow-400 animate-pulse">💡</span>
                {currentLevel.hint || 'Gợi ý: Hãy quan sát kỹ đường đi của nhân vật.'}
              </p>
            </div>

            {/* DANH SÁCH BLOCK */}
            <div className="pb-2 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] uppercase tracking-[0.25em] font-semibold opacity-80 ${currentTheme.textSub}`}
                >
                  THƯ VIỆN LỆNH
                </span>
                <span className="text-[10px] opacity-60 italic text-slate-400">
                  Nhấn để thêm vào chương trình →
                </span>
              </div>

              {currentLevel.options.map((opt, index) => (
                <div
                  key={opt.id}
                  onClick={() => handleBlockClick(opt.id)}
                  className={`relative flex items-center gap-4 cursor-pointer group rounded-2xl p-3 border-2 transition-all duration-200 transform hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(15,23,42,0.7)] active:scale-[0.98] ${currentTheme.blockWrapper}`}
                >
                  {/* Thanh nhấn bên trái */}
                  <div className="absolute w-1 transition-opacity rounded-full opacity-0 inset-y-2 left-1 bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-500 group-hover:opacity-100" />

                  {/* Số thứ tự + block */}
                  <div className="relative z-20 flex items-center flex-none gap-3 pl-1 pr-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border ${
                        isDark
                          ? 'bg-slate-900/80 border-slate-600 text-slate-200'
                          : 'bg-slate-800/90 border-slate-600 text-slate-100'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="transition-transform duration-300 group-hover:rotate-2 group-hover:scale-110">
                      <Block type={opt.type} text={opt.text} theme={theme} scale={0.8} />
                    </div>
                  </div>

                  {/* Nội dung mô tả */}
                  <div className="relative z-10 flex flex-col justify-center flex-1 min-w-0">
                    <p
                      className={`text-base font-bold mb-0.5 truncate ${currentTheme.blockTextMain}`}
                      title={opt.text}
                    >
                      {opt.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] tracking-[0.2em] uppercase font-bold opacity-80 ${currentTheme.blockTextSub}`}
                      >
                        {opt.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 ${
                          isDark ? 'text-cyan-400' : 'text-sky-400'
                        }`}
                      >
                        Thêm vào lệnh ➜
                      </span>
                    </div>
                  </div>

                  {/* Glow hover */}
                  <div className="absolute inset-0 transition-opacity opacity-0 pointer-events-none rounded-2xl group-hover:opacity-60 bg-gradient-to-r from-cyan-400/5 via-transparent to-indigo-500/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
