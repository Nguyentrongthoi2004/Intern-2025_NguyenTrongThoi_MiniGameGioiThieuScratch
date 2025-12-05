// src/data/levels/index.js
import { easyLevels } from './easy';
import { normalLevels } from './normal';
import { hardLevels } from './hard';

// Sử dụng toán tử Spread (...) để nối các mảng lại với nhau
export const levels = [
  ...easyLevels,
  ...normalLevels,
  ...hardLevels
];