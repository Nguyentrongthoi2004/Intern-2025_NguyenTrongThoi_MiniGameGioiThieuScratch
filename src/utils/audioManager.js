// src/utils/audioManager.js

class AudioManager {
  constructor() {
    this.bgm = null;
    this.sfxCache = {};
    this.bgmVolume = 0.3;
    this.sfxVolume = 0.9;
    this.enabled = true;
    this.initialized = false;

    // --- FIX QUAN TRỌNG: Lấy Base URL từ Vite ---
    // Cái này giúp tự động thêm "/scratch-intern-projec/" vào trước đường dẫn
    this.baseUrl = import.meta.env.BASE_URL;
  }

  // Hàm hỗ trợ tạo đường dẫn chuẩn xác
  getSoundPath(fileName) {
    // Xóa dấu / ở đầu nếu lỡ có
    const cleanName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
    
    // Nếu fileName chưa có 'assets/sounds', tự động thêm vào
    if (!cleanName.startsWith('assets/sounds/')) {
        return `${this.baseUrl}assets/sounds/${cleanName}`;
    }
    return `${this.baseUrl}${cleanName}`;
  }

  // Initialize BGM
  initBgm(fileName) {
    if (!this.bgm) {
      const path = this.getSoundPath(fileName);
      this.bgm = new Audio(path);
      this.bgm.loop = true;
      this.bgm.volume = this.bgmVolume;
      this.bgm.preload = 'auto';
    }
  }

  // Preload SFX files to avoid latency
  preloadSfx(files) {
    files.forEach(file => {
      if (!this.sfxCache[file]) {
        const path = this.getSoundPath(file);
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sfxCache[file] = audio;
      }
    });
  }

  // Handle unlocking audio context on first user interaction
  unlockAudio() {
    if (this.bgm && this.bgm.paused && this.enabled) {
      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented by browser policy
          // console.warn("Audio unlock failed (waiting for interaction):", e);
        });
      }
    }
  }

  playBgm(fileName) {
    // Nếu có fileName mới được truyền vào, khởi tạo lại
    if (fileName) {
       // Nếu đang phát đúng bài này rồi thì thôi
       if (this.bgm && this.bgm.src.includes(fileName)) {
           if (this.bgm.paused && this.enabled) this.bgm.play().catch(() => {});
           return;
       }
       // Nếu khác bài, dừng bài cũ và tạo bài mới
       if (this.bgm) this.bgm.pause();
       this.initBgm(fileName);
    }

    if (!this.bgm) return;

    if (this.enabled) {
      this.bgm.volume = this.bgmVolume;
      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
           console.log("Chờ người dùng tương tác để phát nhạc nền...");
        });
      }
    }
  }

  pauseBgm() {
    if (this.bgm) {
      this.bgm.pause();
    }
  }

  playSfx(filename) {
    if (!this.enabled) return;

    // 1. Thử lấy từ Cache
    let audio = this.sfxCache[filename];

    if (audio) {
      const clone = audio.cloneNode();
      clone.volume = this.sfxVolume;
      clone.play().catch(() => {});
    } else {
      // 2. Nếu chưa có trong Cache thì tạo mới (Fallback)
      const path = this.getSoundPath(filename);
      const temp = new Audio(path);
      temp.volume = this.sfxVolume;
      temp.play().catch(() => {
          console.warn("Lỗi phát SFX (có thể do sai đường dẫn):", path);
      });
    }
  }

  setBgmVolume(val) {
    // val is 0-100
    this.bgmVolume = Math.max(0, Math.min(1, val / 100));
    if (this.bgm) {
      this.bgm.volume = this.bgmVolume;
    }
  }

  setSfxVolume(val) {
    // val is 0-100
    this.sfxVolume = Math.max(0, Math.min(1, val / 100));
  }

  setEnabled(val) {
    this.enabled = val;
    if (!val) {
      this.pauseBgm();
    } else {
      this.playBgm(); // Resume
    }
  }
}

export const audioManager = new AudioManager();