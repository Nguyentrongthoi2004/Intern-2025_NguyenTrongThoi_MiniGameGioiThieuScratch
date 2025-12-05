// src/data/levels/normal.js
import { createLevel } from '../../utils/levelFactory';

// ID bắt đầu từ 21
export const normalLevels = [
  // --- LOOPS (VÒNG LẶP) ---
  createLevel(21, 'normal', "Đi hình vuông", "Mèo cần đi hình vuông. Lặp lại hành động nào 4 lần?", 
    { type: 'control', text: 'Repeat 4' },
    { type: 'control', text: 'Forever' },
    { type: 'control', text: 'Repeat until' }
  ),
  createLevel(22, 'normal', "Lặp mãi mãi", "Làm cho Mèo xoay tròn không ngừng nghỉ.", 
    { type: 'control', text: 'Forever' },
    { type: 'control', text: 'Repeat 10' },
    { type: 'events', text: 'When clicked' }
  ),
  createLevel(23, 'normal', "Vẽ hình tam giác", "Tam giác đều có 3 cạnh. Cần lặp lại mấy lần?", 
    { type: 'control', text: 'Repeat 3' },
    { type: 'control', text: 'Repeat 4' },
    { type: 'control', text: 'Repeat 10' }
  ),
  createLevel(24, 'normal', "Chờ đợi", "Mèo đi 1 bước, nghỉ 1 giây, rồi đi tiếp. Dùng khối nào để nghỉ?", 
    { type: 'control', text: 'Wait 1 seconds' },
    { type: 'control', text: 'Stop all' },
    { type: 'sensing', text: 'Reset timer' }
  ),
  createLevel(25, 'normal', "Lặp có điều kiện", "Lặp lại việc đi cho đến khi chạm cạnh sân khấu.", 
    { type: 'control', text: 'Repeat until touching edge?' },
    { type: 'control', text: 'If on edge, bounce' },
    { type: 'control', text: 'Forever' }
  ),

  // --- LOGIC (ĐIỀU KIỆN IF-ELSE) ---
  createLevel(26, 'normal', "Nếu... thì...", "Nếu Mèo chạm màu đỏ thì nói 'Ouch!'.", 
    { type: 'control', text: 'If touching color Red then' },
    { type: 'control', text: 'Wait until touching color Red' },
    { type: 'events', text: 'When touching color Red' }
  ),
  createLevel(27, 'normal', "Nếu không thì...", "Nếu bấm chuột thì đi, nếu KHÔNG bấm thì dừng lại.", 
    { type: 'control', text: 'If mouse down then... else...' },
    { type: 'control', text: 'If mouse down then' },
    { type: 'control', text: 'Wait until mouse down' }
  ),
  createLevel(28, 'normal', "Va chạm", "Kiểm tra xem Mèo có đang chạm vào con chuột trỏ không.", 
    { type: 'sensing', text: 'Touching mouse-pointer?' },
    { type: 'sensing', text: 'Distance to mouse-pointer' },
    { type: 'events', text: 'When this sprite clicked' }
  ),
  createLevel(29, 'normal', "So sánh lớn hơn", "Kiểm tra nếu kích thước (Size) lớn hơn 100.", 
    { type: 'operators', text: 'Size > 100' },
    { type: 'operators', text: 'Size < 100' },
    { type: 'operators', text: 'Size = 100' }
  ),
  createLevel(30, 'normal', "Phép toán cộng", "Mèo muốn nói kết quả của 10 + 5.", 
    { type: 'operators', text: '10 + 5' },
    { type: 'operators', text: 'Pick random 1 to 10' },
    { type: 'operators', text: 'Join hello world' }
  ),

  // --- SENSING (CẢM BIẾN) ---
  createLevel(31, 'normal', "Hỏi tên", "Mèo hỏi 'Tên bạn là gì?' và đợi trả lời.", 
    { type: 'sensing', text: 'Ask What is your name? and wait' },
    { type: 'looks', text: 'Say What is your name?' },
    { type: 'sensing', text: 'Answer' }
  ),
  createLevel(32, 'normal', "Trả lời", "Khối chứa câu trả lời người dùng vừa nhập là gì?", 
    { type: 'sensing', text: 'Answer' },
    { type: 'sensing', text: 'Username' },
    { type: 'variables', text: 'My Variable' }
  ),
  createLevel(33, 'normal', "Chạm cạnh", "Kiểm tra xem Mèo có chạm cạnh sân khấu không?", 
    { type: 'sensing', text: 'Touching edge?' },
    { type: 'motion', text: 'If on edge, bounce' },
    { type: 'sensing', text: 'Mouse down?' }
  ),
  createLevel(34, 'normal', "Bấm phím", "Kiểm tra phím Mũi tên lên có đang được nhấn không?", 
    { type: 'sensing', text: 'Key up arrow pressed?' },
    { type: 'events', text: 'When up arrow key pressed' },
    { type: 'sensing', text: 'Mouse down?' }
  ),
  createLevel(35, 'normal', "Âm lượng", "Kiểm tra nếu âm lượng (Loudness) lớn hơn 10.", 
    { type: 'operators', text: 'Loudness > 10' },
    { type: 'sensing', text: 'Loudness' },
    { type: 'sound', text: 'Set volume to 100%' }
  ),

  // --- KẾT HỢP ---
  createLevel(36, 'normal', "Đi tới chuột", "Làm Mèo luôn đi theo con trỏ chuột.", 
    { type: 'motion', text: 'Go to mouse-pointer' },
    { type: 'motion', text: 'Glide to mouse-pointer' },
    { type: 'motion', text: 'Point towards mouse-pointer' }
  ),
  createLevel(37, 'normal', "Xoay theo chuột", "Làm Mèo luôn quay mặt về phía con trỏ chuột.", 
    { type: 'motion', text: 'Point towards mouse-pointer' },
    { type: 'motion', text: 'Go to mouse-pointer' },
    { type: 'motion', text: 'Turn 15 degrees' }
  ),
  createLevel(38, 'normal', "Đổi nền", "Khi Score > 10, đổi phông nền sang 'Party'.", 
    { type: 'looks', text: 'Switch backdrop to Party' },
    { type: 'looks', text: 'Next backdrop' },
    { type: 'events', text: 'When backdrop switches to Party' }
  ),
  createLevel(39, 'normal', "Dừng lại tất cả", "Kết thúc game (Game Over).", 
    { type: 'control', text: 'Stop all' },
    { type: 'control', text: 'Stop this script' },
    { type: 'control', text: 'Delete this clone' }
  ),
  createLevel(40, 'normal', "Sinh ngẫu nhiên", "Chọn một số ngẫu nhiên từ 1 đến 10.", 
    { type: 'operators', text: 'Pick random 1 to 10' },
    { type: 'operators', text: '1 + 10' },
    { type: 'sensing', text: 'Current second' }
  ),
];