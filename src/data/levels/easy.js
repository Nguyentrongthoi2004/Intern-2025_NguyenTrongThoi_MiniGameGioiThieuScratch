// src/data/levels/easy.js
import { createLevel } from '../../utils/levelFactory';

export const easyLevels = [
  // --- MOTION (DI CHUYỂN) ---
  createLevel(1, 'easy', "Bước đi đầu tiên", "Làm sao để Mèo đi về phía trước 10 bước?", 
    { type: 'motion', text: 'Move 10 steps' },
    { type: 'looks', text: 'Say Hello' },
    { type: 'events', text: 'When clicked' }
  ),
  createLevel(2, 'easy', "Đi lùi", "Mèo muốn đi lùi lại 10 bước.", 
    { type: 'motion', text: 'Move -10 steps' },
    { type: 'motion', text: 'Move 10 steps' },
    { type: 'control', text: 'Wait 1 sec' }
  ),
  createLevel(3, 'easy', "Xoay phải", "Xoay chú mèo theo chiều kim đồng hồ 15 độ.", 
    { type: 'motion', text: 'Turn right 15 degrees' },
    { type: 'motion', text: 'Turn left 15 degrees' },
    { type: 'motion', text: 'Point in direction 90' }
  ),
  createLevel(4, 'easy', "Xoay trái", "Xoay chú mèo ngược chiều kim đồng hồ 15 độ.", 
    { type: 'motion', text: 'Turn left 15 degrees' },
    { type: 'motion', text: 'Turn right 15 degrees' },
    { type: 'events', text: 'When space pressed' }
  ),
  createLevel(5, 'easy', "Nhìn thẳng", "Đặt hướng nhìn của mèo sang phải (90 độ).", 
    { type: 'motion', text: 'Point in direction 90' },
    { type: 'motion', text: 'Point in direction -90' },
    { type: 'motion', text: 'Turn right 90' }
  ),
  createLevel(6, 'easy', "Nhìn sang trái", "Đặt hướng nhìn của mèo sang trái (-90 độ).", 
    { type: 'motion', text: 'Point in direction -90' },
    { type: 'motion', text: 'Point in direction 180' },
    { type: 'looks', text: 'Switch costume' }
  ),
  createLevel(7, 'easy', "Về đích", "Đưa mèo về tọa độ gốc (x=0, y=0).", 
    { type: 'motion', text: 'Go to x: 0 y: 0' },
    { type: 'motion', text: 'Go to random position' },
    { type: 'motion', text: 'Glide 1 sec to x:0 y:0' }
  ),
  createLevel(8, 'easy', "Thay đổi X", "Dịch chuyển mèo sang phải 10 đơn vị (trục ngang).", 
    { type: 'motion', text: 'Change x by 10' },
    { type: 'motion', text: 'Set x to 10' },
    { type: 'motion', text: 'Change y by 10' }
  ),
  createLevel(9, 'easy', "Thay đổi Y", "Dịch chuyển mèo lên trên 10 đơn vị (trục dọc).", 
    { type: 'motion', text: 'Change y by 10' },
    { type: 'motion', text: 'Change x by 10' },
    { type: 'looks', text: 'Change size by 10' }
  ),
  createLevel(10, 'easy', "Bật lại", "Nếu mèo chạm vào cạnh sân khấu thì tự động bật lại.", 
    { type: 'motion', text: 'If on edge, bounce' },
    { type: 'motion', text: 'Move 10 steps' },
    { type: 'control', text: 'Stop all' }
  ),

  // --- LOOKS (HÌNH ẢNH) ---
  createLevel(11, 'easy', "Xin chào", "Mèo nói 'Hello!' trong 2 giây.", 
    { type: 'looks', text: 'Say Hello! for 2 secs' },
    { type: 'looks', text: 'Think Hmm... for 2 secs' },
    { type: 'sound', text: 'Play sound Meow' }
  ),
  createLevel(12, 'easy', "Suy tư", "Mèo đang suy nghĩ 'Hmm...'", 
    { type: 'looks', text: 'Think Hmm...' },
    { type: 'looks', text: 'Say Hello!' },
    { type: 'events', text: 'When clicked' }
  ),
  createLevel(13, 'easy', "Hoạt hình", "Chuyển sang hình dạng (costume) tiếp theo.", 
    { type: 'looks', text: 'Next costume' },
    { type: 'looks', text: 'Switch backdrop' },
    { type: 'looks', text: 'Clear graphic effects' }
  ),
  createLevel(14, 'easy', "Biến mất", "Làm chú mèo ẩn đi.", 
    { type: 'looks', text: 'Hide' },
    { type: 'looks', text: 'Show' },
    { type: 'control', text: 'Delete this clone' }
  ),
  createLevel(15, 'easy', "Xuất hiện", "Làm chú mèo hiện lại.", 
    { type: 'looks', text: 'Show' },
    { type: 'looks', text: 'Hide' },
    { type: 'looks', text: 'Go to front layer' }
  ),
  createLevel(16, 'easy', "Phóng to", "Tăng kích thước mèo lên 10 đơn vị.", 
    { type: 'looks', text: 'Change size by 10' },
    { type: 'looks', text: 'Set size to 100%' },
    { type: 'motion', text: 'Change x by 10' }
  ),

  // --- EVENTS (SỰ KIỆN) ---
  createLevel(17, 'easy', "Khởi động", "Khối lệnh nào luôn dùng để BẮT ĐẦU game?", 
    { type: 'events', text: 'When flag clicked' },
    { type: 'control', text: 'Forever' },
    { type: 'sensing', text: 'Timer' }
  ),
  createLevel(18, 'easy', "Bàn phím", "Hành động khi nhấn phím CÁCH (Space).", 
    { type: 'events', text: 'When space key pressed' },
    { type: 'events', text: 'When sprite clicked' },
    { type: 'sensing', text: 'Key space pressed?' }
  ),
  createLevel(19, 'easy', "Tương tác", "Hành động khi Click chuột vào Mèo.", 
    { type: 'events', text: 'When this sprite clicked' },
    { type: 'events', text: 'When backdrop switches' },
    { type: 'control', text: 'Wait until' }
  ),
  createLevel(20, 'easy', "Chờ đợi", "Dừng lại 1 giây trước khi làm việc khác.", 
    { type: 'control', text: 'Wait 1 seconds' },
    { type: 'control', text: 'Stop all' },
    { type: 'control', text: 'Forever' }
  ),
];