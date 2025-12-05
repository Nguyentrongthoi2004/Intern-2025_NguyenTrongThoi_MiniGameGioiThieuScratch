// src/data/tutorialData.js

export const tutorialData = [
  {
    id: 'motion',
    label: 'Chuyển động',
    color: 'bg-blue-500',
    icon: '🏃',
    blocks: [
      { img: 'right.png', text: 'Move Right', desc: 'Di chuyển nhân vật sang phải.' },
      { img: 'left.png', text: 'Move Left', desc: 'Di chuyển nhân vật sang trái.' },
      { img: 'up.png', text: 'Move Up', desc: 'Di chuyển nhân vật lên trên.' },
      { img: 'down.png', text: 'Move Down', desc: 'Di chuyển nhân vật xuống dưới.' },
      { img: 'turnright.png', text: 'Turn Right', desc: 'Xoay nhân vật theo chiều kim đồng hồ.' },
      { img: 'turnleft.png', text: 'Turn Left', desc: 'Xoay nhân vật ngược chiều kim đồng hồ.' },
      { img: 'hop.png', text: 'Hop', desc: 'Nhân vật nhảy lên rồi rơi xuống.' },
      { img: 'gohome.png', text: 'Go Home', desc: 'Đưa nhân vật về vị trí ban đầu và hướng ban đầu.' }
    ]
  },
  {
    id: 'trigger', // Trước là events, giờ đổi tên cho khớp với Triggering Blocks
    label: 'Sự kiện',
    color: 'bg-yellow-400',
    icon: '⚡',
    blocks: [
      { img: 'onflag.png', text: 'Start on Green Flag', desc: 'Bắt đầu chương trình khi bấm vào lá cờ xanh.' },
      { img: 'ontap.png', text: 'Start on Tap', desc: 'Bắt đầu khi chạm (click) vào nhân vật.' },
      { img: 'onbump.png', text: 'Start on Bump', desc: 'Bắt đầu khi nhân vật chạm vào nhân vật khác.' },
      { img: 'messagesend.png', text: 'Send Message', desc: 'Gửi đi một tin nhắn màu sắc.' },
      { img: 'messagereceive.png', text: 'Start on Message', desc: 'Bắt đầu khi nhận được tin nhắn màu sắc.' }
    ]
  },
  {
    id: 'looks',
    label: 'Hiển thị',
    color: 'bg-purple-500',
    icon: '👀',
    blocks: [
      { img: 'say.png', text: 'Say', desc: 'Hiện bong bóng hội thoại phía trên nhân vật.' },
      { img: 'grow.png', text: 'Grow', desc: 'Làm nhân vật to lên.' },
      { img: 'shrink.png', text: 'Shrink', desc: 'Làm nhân vật nhỏ đi.' },
      { img: 'reset.png', text: 'Reset Size', desc: 'Đưa nhân vật về kích thước chuẩn.' },
      { img: 'hide.png', text: 'Hide', desc: 'Làm nhân vật biến mất (tàng hình).' },
      { img: 'show.png', text: 'Show', desc: 'Làm nhân vật hiện ra.' }
    ]
  },
  {
    id: 'sound',
    label: 'Âm thanh',
    color: 'bg-green-500',
    icon: '🔊',
    blocks: [
      { img: 'pop.png', text: 'Pop', desc: 'Phát tiếng nổ "Pop".' },
      { img: 'playsound.png', text: 'Play Sound', desc: 'Phát âm thanh đã ghi âm.' }
    ]
  },
  {
    id: 'control',
    label: 'Điều khiển',
    color: 'bg-orange-400',
    icon: '🔄',
    blocks: [
      { img: 'wait.png', text: 'Wait', desc: 'Dừng lại một khoảng thời gian (phần 10 giây).' },
      { img: 'stop.png', text: 'Stop', desc: 'Dừng tất cả các hoạt động của nhân vật.' },
      { img: 'speed.png', text: 'Set Speed', desc: 'Chỉnh tốc độ chạy nhanh hoặc chậm.' },
      { img: 'repeat.png', text: 'Repeat', desc: 'Lặp lại các khối lệnh bên trong nó.' }
    ]
  },
  {
    id: 'end',
    label: 'Kết thúc',
    color: 'bg-red-500',
    icon: '🛑',
    blocks: [
      { img: 'end.png', text: 'End', desc: 'Kết thúc đoạn mã.' },
      { img: 'forever.png', text: 'Repeat Forever', desc: 'Lặp lại đoạn mã mãi mãi.' },
      { img: 'page.png', text: 'Go to Page', desc: 'Chuyển sang màn chơi (trang) khác.' }
    ]
  }
];