import { useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

export const useGameAudio = (enableSound, bgmVolume, sfxVolume) => {
  // Sync volume with audioManager when props change
  useEffect(() => {
    audioManager.setBgmVolume(bgmVolume);
  }, [bgmVolume]);

  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
  }, [sfxVolume]);

  useEffect(() => {
    audioManager.setEnabled(enableSound);
  }, [enableSound]);

  const playSfx = (filename) => {
    if (enableSound) {
        audioManager.playSfx(filename);
    }
  };

  const playBgm = (filename) => {
      audioManager.playBgm(filename);
  };

  const pauseBgm = () => {
      audioManager.pauseBgm();
  };

  return { playSfx, playBgm, pauseBgm };
};
