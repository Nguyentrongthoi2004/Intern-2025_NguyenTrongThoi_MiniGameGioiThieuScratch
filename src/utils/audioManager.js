// src/utils/audioManager.js

class AudioManager {
  constructor() {
    this.bgm = null;
    this.sfxCache = {};
    this.bgmVolume = 0.3;
    this.sfxVolume = 0.9;
    this.enabled = true;
    this.initialized = false;
  }

  // Initialize BGM
  initBgm(path) {
    if (!this.bgm) {
      this.bgm = new Audio(path);
      this.bgm.loop = true;
      this.bgm.volume = this.bgmVolume;
    }
  }

  // Preload SFX files to avoid latency ("glitches")
  preloadSfx(files) {
    files.forEach(file => {
      if (!this.sfxCache[file]) {
        const audio = new Audio(`assets/sounds/${file}`);
        // Force browser to load metadata/buffer by "playing" briefly?
        // No, creating Audio object is usually enough to start fetching.
        this.sfxCache[file] = audio;
      }
    });
  }

  // Handle unlocking audio context on first user interaction
  unlockAudio() {
    if (this.bgm && this.bgm.paused && this.enabled) {
      this.bgm.play().catch(e => {
        // Still blocked or failed
      });
    }
  }

  playBgm() {
    if (!this.bgm) return;
    if (this.enabled) {
      this.bgm.volume = this.bgmVolume;
      this.bgm.play().catch(e => {
        console.warn("BGM autoplay prevented:", e);
      });
    }
  }

  pauseBgm() {
    if (this.bgm) {
      this.bgm.pause();
    }
  }

  playSfx(filename) {
    if (!this.enabled) return;

    // Use cached audio if available
    let audio = this.sfxCache[filename];

    if (audio) {
      // Clone the node to allow overlapping sounds (e.g. rapid firing) without cutting off previous
      // cloneNode() copies the element and its attributes (src), so it's a lightweight way to get a new player
      // pointing to the same resource.
      const clone = audio.cloneNode();
      clone.volume = this.sfxVolume;
      clone.play().catch(e => {
          // Ignore play errors (e.g. rapid overlapping limits)
      });
    } else {
      // Fallback if not preloaded
      const temp = new Audio(`assets/sounds/${filename}`);
      temp.volume = this.sfxVolume;
      temp.play().catch(() => {});
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
      this.playBgm();
    }
  }
}

export const audioManager = new AudioManager();
