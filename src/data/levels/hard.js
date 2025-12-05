// src/data/levels/hard.js
import { createLevel } from '../../utils/levelFactory';

// ID bắt đầu từ 41
export const hardLevels = [
  // --- VARIABLES (BIẾN SỐ) ---
  createLevel(41, 'hard', "Tạo điểm số", "Khối nào dùng để đặt điểm số (Score) ban đầu về 0?", 
    { type: 'variables', text: 'Set Score to 0' },
    { type: 'variables', text: 'Change Score by 0' },
    { type: 'variables', text: 'Show variable Score' }
  ),
  createLevel(42, 'hard', "Tăng điểm", "Khi ăn táo, tăng điểm lên 1.", 
    { type: 'variables', text: 'Change Score by 1' },
    { type: 'variables', text: 'Set Score to 1' },
    { type: 'math', text: 'Score + 1' }
  ),
  createLevel(43, 'hard', "Hiện biến", "Hiển thị biến Score lên màn hình.", 
    { type: 'variables', text: 'Show variable Score' },
    { type: 'variables', text: 'Hide variable Score' },
    { type: 'looks', text: 'Say Score' }
  ),
  createLevel(44, 'hard', "Giảm mạng", "Khi chạm quái, giảm mạng (Lives) đi 1.", 
    { type: 'variables', text: 'Change Lives by -1' },
    { type: 'variables', text: 'Set Lives to -1' },
    { type: 'variables', text: 'Change Lives by 1' }
  ),
  createLevel(45, 'hard', "Logic thắng cuộc", "Nếu Score = 10 thì thắng game.", 
    { type: 'control', text: 'If Score = 10 then...' },
    { type: 'control', text: 'Wait until Score = 10' },
    { type: 'operators', text: 'Score > 10' }
  ),

  // --- CLONES (BẢN SAO) ---
  createLevel(46, 'hard', "Phân thân", "Tạo ra một bản sao của chính mình.", 
    { type: 'control', text: 'Create clone of myself' },
    { type: 'control', text: 'When I start as a clone' },
    { type: 'looks', text: 'Stamp' }
  ),
  createLevel(47, 'hard', "Hành động bản sao", "Khối lệnh bắt đầu hành động cho bản sao vừa tạo?", 
    { type: 'control', text: 'When I start as a clone' },
    { type: 'control', text: 'Create clone of myself' },
    { type: 'events', text: 'When flag clicked' }
  ),
  createLevel(48, 'hard', "Xóa bản sao", "Khi bản sao chạm cạnh, xóa nó đi để đỡ lag máy.", 
    { type: 'control', text: 'Delete this clone' },
    { type: 'looks', text: 'Hide' },
    { type: 'control', text: 'Stop all' }
  ),
  
  // --- OPERATORS & LOGIC PHỨC TẠP ---
  createLevel(49, 'hard', "Điều kiện Kép (AND)", "Nếu chạm màu đỏ VÀ bấm chuột thì mới đúng.", 
    { type: 'operators', text: 'Touching red? AND Mouse down?' },
    { type: 'operators', text: 'Touching red? OR Mouse down?' },
    { type: 'operators', text: 'NOT Mouse down?' }
  ),
  createLevel(50, 'hard', "Điều kiện Hoặc (OR)", "Nếu chạm cạnh HOẶC chạm kẻ địch thì thua.", 
    { type: 'operators', text: 'Touching edge? OR Touching Enemy?' },
    { type: 'operators', text: 'Touching edge? AND Touching Enemy?' },
    { type: 'operators', text: 'NOT Touching edge?' }
  ),
  createLevel(51, 'hard', "Phủ định (NOT)", "Thực hiện nếu KHÔNG chạm màu xanh.", 
    { type: 'operators', text: 'NOT touching color Blue?' },
    { type: 'operators', text: 'Touching color Blue?' },
    { type: 'control', text: 'Else' }
  ),
  createLevel(52, 'hard', "Nối chuỗi", "Nói 'Xin chào' ghép với Tên người chơi.", 
    { type: 'operators', text: 'Join Xin chào (Answer)' },
    { type: 'looks', text: 'Say Xin chào' },
    { type: 'sensing', text: 'Answer' }
  ),
  createLevel(53, 'hard', "Chia lấy dư (Mod)", "Kiểm tra số chẵn lẻ (Số đó chia 2 dư 0).", 
    { type: 'operators', text: 'Number mod 2 = 0' },
    { type: 'operators', text: 'Number / 2' },
    { type: 'operators', text: 'Round Number' }
  ),

  // --- DEBUGGING (SỬA LỖI) ---
  createLevel(54, 'hard', "Debug: Đi xuyên tường", "Mèo đi xuyên qua tường. Thiếu khối lệnh nào?", 
    { type: 'motion', text: 'If on edge, bounce' },
    { type: 'motion', text: 'Move 10 steps' },
    { type: 'motion', text: 'Set rotation style' }
  ),
  createLevel(55, 'hard', "Debug: Không dừng lại", "Vòng lặp chạy mãi không dừng. Cần dùng khối nào để dừng kịch bản này?", 
    { type: 'control', text: 'Stop this script' },
    { type: 'control', text: 'Wait 1 sec' },
    { type: 'events', text: 'Broadcast message' }
  ),
  createLevel(56, 'hard', "Debug: Biến không tăng", "Biến Score không tăng lên. Do dùng sai 'Set' thay vì 'Change'. Chọn khối đúng:", 
    { type: 'variables', text: 'Change Score by 1' },
    { type: 'variables', text: 'Set Score to 1' },
    { type: 'variables', text: 'Show variable Score' }
  ),
  createLevel(57, 'hard', "Debug: Mèo bị lộn ngược", "Khi chạm cạnh bật lại, mèo bị lộn đầu xuống đất. Sửa thế nào?", 
    { type: 'motion', text: 'Set rotation style left-right' },
    { type: 'motion', text: 'Point in direction 90' },
    { type: 'motion', text: 'Turn 180 degrees' }
  ),

  // --- MESSAGES (THÔNG ĐIỆP) ---
  createLevel(58, 'hard', "Phát tin", "Gửi thông điệp 'StartGame' cho các nhân vật khác.", 
    { type: 'events', text: 'Broadcast StartGame' },
    { type: 'events', text: 'When I receive StartGame' },
    { type: 'looks', text: 'Say StartGame' }
  ),
  createLevel(59, 'hard', "Nhận tin", "Khi nhận được tin 'GameOver', làm gì đó.", 
    { type: 'events', text: 'When I receive GameOver' },
    { type: 'events', text: 'Broadcast GameOver' },
    { type: 'control', text: 'Stop all' }
  ),
  createLevel(60, 'hard', "Tin nhắn chờ", "Phát tin và đợi mọi người làm xong mới chạy tiếp.", 
    { type: 'events', text: 'Broadcast message and wait' },
    { type: 'events', text: 'Broadcast message' },
    { type: 'control', text: 'Wait 1 sec' }
  ),
];