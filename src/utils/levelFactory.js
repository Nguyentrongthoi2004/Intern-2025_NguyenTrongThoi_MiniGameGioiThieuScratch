// src/utils/levelFactory.js

// Thêm tham số 'hint' vào cuối hàm
export const createLevel = (id, difficulty, title, instruction, correctBlock, wrongBlock1, wrongBlock2, hint = "Hãy thử các khối lệnh màu xanh dương!") => {
  const rawOptions = [
    { id: `opt_${id}_correct`, ...correctBlock, isCorrect: true },
    { id: `opt_${id}_wrong1`, ...wrongBlock1, isCorrect: false },
    { id: `opt_${id}_wrong2`, ...wrongBlock2, isCorrect: false },
    // Thêm option thứ 4 cho đủ bộ (nếu muốn 4 ô) - Tạm thời ta dùng 3 ô nhưng xếp dọc cho thoáng
  ];

  const shuffledOptions = rawOptions.sort(() => Math.random() - 0.5);

  return {
    id,
    difficulty,
    title,
    instruction,
    hint, // Lưu hint vào object trả về
    correctBlockId: rawOptions.find(opt => opt.isCorrect).id, 
    options: shuffledOptions
  };
};