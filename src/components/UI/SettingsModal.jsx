import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal = ({
  onClose,
  isBlur,
  toggleBlur,
  isSound,
  toggleSound,
  isLowEffects,
  toggleLowEffects,
  fxDensity,
  onChangeFxDensity,
}) => {
  const density = Math.max(0, Math.min(100, fxDensity ?? 60));
  const fx = density / 100;

  const fxLevelLabels = {
    0: 'TẮT',
    20: 'YẾU',
    40: 'VỪA',
    60: 'ĐẸP',
    80: 'MẠNH',
    100: 'MAX',
  };
  const fxLabel = fxLevelLabels[density] || 'TÙY CHỈNH';

  // Overlay khi mở Settings: đổi theo FX + blur
  const overlayStyle = {
    backgroundColor: `rgba(0,0,0,${0.3 + fx * 0.4})`, // 0.3–0.7
    backdropFilter: isBlur ? `blur(${4 + fx * 12}px)` : 'none', // 4–16px
  };

  const handleFxChange = (value) => {
    const raw = Number(value);
    let snapped = Math.round(raw / 20) * 20; // 0 20 40 60 80 100
    if (snapped < 0) snapped = 0;
    if (snapped > 100) snapped = 100;
    onChangeFxDensity(snapped);
  };

  const handleResetFx = () => {
    onChangeFxDensity(60);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={overlayStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[460px] max-w-[92%] rounded-[32px] bg-gradient-to-b from-cyan-400/70 via-sky-500/40 to-violet-500/60 p-[1.5px] shadow-[0_0_90px_rgba(34,211,238,0.7)]"
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <div className="relative rounded-[30px] bg-slate-950/95 px-6 pt-5 pb-6 border border-slate-800/80 backdrop-blur-xl overflow-hidden">
            {/* Glow */}
            <div className="absolute w-48 h-48 rounded-full pointer-events-none -right-24 -top-24 bg-cyan-400/20 blur-3xl" />
            <div className="absolute bottom-0 w-40 h-40 rounded-full pointer-events-none -left-20 bg-violet-500/25 blur-3xl" />

            {/* HEADER */}
            <div className="relative flex items-start justify-between mb-5">
              <div>
                <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-900/80 px-3 py-[2px] text-[10px] font-semibold tracking-[0.28em] text-cyan-300/80">
                  <span className="h-[6px] w-[6px] rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  SYSTEM CONFIG
                </div>
                <h2 className="mt-2 text-[22px] font-extrabold tracking-[0.22em] text-slate-50">
                  CÀI ĐẶT
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Tinh chỉnh hình ảnh và âm thanh để phù hợp với phong cách
                  chơi của bạn.
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/80 text-slate-300 text-sm hover:border-cyan-400/80 hover:text-cyan-200 hover:shadow-[0_0_14px_rgba(34,211,238,0.7)] transition"
              >
                ×
              </button>
            </div>

            {/* Light bar */}
            <div className="relative mb-5 h-[3px] w-full rounded-full bg-slate-800/80">
              <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent" />
            </div>

            {/* ========== HÌNH ẢNH & HIỆU ỨNG ========== */}
            <section className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-semibold tracking-[0.32em] text-cyan-300">
                  HÌNH ẢNH & HIỆU ỨNG
                </h3>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-[2px] text-[10px] font-medium text-cyan-200">
                  VISUAL
                </span>
              </div>

              {/* Blur background */}
              <div className="group relative mb-3 overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 px-4 py-3 shadow-[0_0_26px_rgba(15,23,42,0.9)]">
                <div className="absolute w-20 h-20 transition rounded-full opacity-0 pointer-events-none -right-10 -top-10 bg-cyan-500/10 blur-2xl group-hover:opacity-100" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-50">
                        Hiệu ứng mờ ảo
                      </p>
                      <span className="rounded-full bg-emerald-500/15 px-2 text-[10px] font-medium text-emerald-300/90">
                        UI Focus
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      Làm mờ phông nền khi hiển thị thông báo & bảng kết quả.
                    </p>
                  </div>

                  <button
                    onClick={toggleBlur}
                    className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition
                      ${
                        isBlur
                          ? 'border-cyan-300/70 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                  >
                    <span
                      className={`absolute top-[3px] h-5 w-5 rounded-full bg-slate-950 shadow-md transition
                        ${isBlur ? 'left-[23px]' : 'left-[3px]'}`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* ========== ÂM THANH ========== */}
            <section className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-semibold tracking-[0.32em] text-cyan-300">
                  ÂM THANH
                </h3>
                <span className="rounded-full bg-fuchsia-500/10 px-2.5 py-[2px] text-[10px] font-medium text-fuchsia-200">
                  AUDIO
                </span>
              </div>

              {/* Toggle sound */}
              <div className="group relative mb-3 overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 px-4 py-3 shadow-[0_0_26px_rgba(15,23,42,0.9)]">
                <div className="absolute top-0 w-16 h-16 transition rounded-full opacity-0 pointer-events-none -left-8 bg-fuchsia-500/10 blur-2xl group-hover:opacity-100" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-50">
                        Âm thanh
                      </p>
                      <span
                        className={`rounded-full px-2 text-[10px] font-semibold ${
                          isSound
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-slate-700/60 text-slate-300'
                        }`}
                      >
                        {isSound ? 'ĐANG BẬT' : 'TẮT'}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      Bật / tắt toàn bộ âm thanh trong game (nhạc nền & hiệu
                      ứng).
                    </p>
                  </div>

                  <button
                    onClick={toggleSound}
                    className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition
                      ${
                        isSound
                          ? 'border-cyan-300/70 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                  >
                    <span
                      className={`absolute top-[3px] h-5 w-5 rounded-full bg-slate-950 shadow-md transition
                        ${isSound ? 'left-[23px]' : 'left-[3px]'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Volume nền */}
              <div className="px-4 py-3 mb-3 overflow-hidden border rounded-2xl border-slate-700/80 bg-gradient-to-br from-slate-900/85 via-slate-950/95 to-slate-900/90">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-50">
                    Âm lượng nhạc nền
                  </p>
                  <span className="text-[11px] text-slate-400">70%</span>
                </div>
                <div className="px-3 py-2 mt-2 rounded-full bg-slate-800/90">
                  <input
                    type="range"
                    className="w-full cursor-pointer accent-fuchsia-400"
                    defaultValue={70}
                  />
                </div>
              </div>

              {/* Volume hiệu ứng */}
              <div className="px-4 py-3 overflow-hidden border rounded-2xl border-slate-700/80 bg-gradient-to-br from-slate-900/85 via-slate-950/95 to-slate-900/90">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-50">
                    Âm lượng hiệu ứng
                  </p>
                </div>
                <div className="px-3 py-2 mt-2 rounded-full bg-slate-800/90">
                  <input
                    type="range"
                    className="w-full cursor-pointer accent-fuchsia-400"
                    defaultValue={80}
                  />
                </div>
              </div>
            </section>

            {/* ========== HIỆU ỨNG NÂNG CAO ========== */}
            <section className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-semibold tracking-[0.32em] text-cyan-300">
                  HIỆU ỨNG NÂNG CAO
                </h3>
                <span className="rounded-full bg-amber-400/10 px-2.5 py-[2px] text-[10px] font-medium text-amber-200">
                  FX
                </span>
              </div>

              {/* Chế độ giảm hiệu ứng */}
              <div className="mb-3 group relative overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 px-4 py-3 shadow-[0_0_26px_rgba(15,23,42,0.9)]">
                <div className="absolute top-0 w-16 h-16 transition rounded-full opacity-0 pointer-events-none -right-10 bg-amber-400/15 blur-2xl group-hover:opacity-100" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-50">
                        Chế độ giảm hiệu ứng
                      </p>
                      <span
                        className={`rounded-full px-2 text-[10px] font-semibold ${
                          isLowEffects
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-slate-700/60 text-slate-300'
                        }`}
                      >
                        {isLowEffects ? 'MÁY YẾU' : 'MẶC ĐỊNH'}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      Tắt nền 3D, LED bay và giảm ánh sáng để game mượt hơn trên
                      máy yếu / laptop cũ.
                    </p>
                  </div>

                  <button
                    onClick={toggleLowEffects}
                    className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition
                      ${
                        isLowEffects
                          ? 'border-emerald-300/70 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_16px_rgba(16,185,129,0.7)]'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                  >
                    <span
                      className={`absolute top-[3px] h-5 w-5 rounded-full bg-slate-950 shadow-md transition
                        ${isLowEffects ? 'left-[23px]' : 'left-[3px]'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Slider mật độ hiệu ứng đặc biệt – 6 nấc */}
              <div className="px-4 py-3 overflow-hidden border rounded-2xl border-slate-700/80 bg-gradient-to-br from-slate-900/85 via-slate-950/95 to-slate-900/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-50">
                      Mật độ hiệu ứng đặc biệt
                    </p>
                    <span className="rounded-full bg-slate-800/90 px-2.5 py-[2px] text-[10px] font-semibold text-cyan-300">
                      {fxLabel}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {density}%
                  </span>
                </div>

                <div className="px-3 py-2 mt-2 rounded-full bg-slate-800/90">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={20}
                    value={density}
                    onChange={(e) => handleFxChange(e.target.value)}
                    className="w-full cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Vạch nhỏ dưới thanh cho 6 nấc */}
                <div className="mt-1 flex justify-between text-[9px] text-slate-500">
                  <span>0</span>
                  <span>20</span>
                  <span>40</span>
                  <span>60</span>
                  <span>80</span>
                  <span>100</span>
                </div>

                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Giảm nếu máy yếu / dễ lag. Tăng lên nếu bạn muốn hiệu ứng
                  hoành tráng hơn khi thắng, bắn pháo hoa & nền 3D.
                </p>
              </div>
            </section>

            {/* Buttons bottom */}
            <div className="flex items-center justify-between gap-3 mt-3">
              <button
                type="button"
                className="text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:underline underline-offset-4"
                onClick={handleResetFx}
              >
                Khôi phục mặc định
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold transition border rounded-full border-slate-600 bg-slate-900/80 text-slate-200 hover:border-slate-400 hover:text-white"
              >
                Đóng
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
