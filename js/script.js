// ===== CHAT BOX =====

// Mở / đóng chat box
function toggleChat() {
  const body = document.getElementById('chatBody');
  const isHidden = body.style.display === 'none' || body.style.display === '';
  body.style.display = isHidden ? 'flex' : 'none';
}

// Biến toàn cục
let lastChatTime = 0;
let chatHistory = [];

// Gửi tin nhắn
function sendMessage() {
  const now = Date.now();
  if (now - lastChatTime < 15000) {
    alert("⏳ Vui lòng chờ 15 giây trước khi gửi tin tiếp theo!");
    return;
  }

  const input = document.getElementById('chatMessage');
  const msg = input.value.trim();
  if (msg === '') return;

  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-message';
  div.textContent = msg;
  messages.appendChild(div);

  // Lưu vào mảng & localStorage
  chatHistory.push(msg);
  if (chatHistory.length > 100) chatHistory.shift();
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

  input.value = '';
  messages.scrollTop = messages.scrollHeight;
  lastChatTime = now;
}

// Khi tải trang, khôi phục tin nhắn đã lưu
window.addEventListener('load', () => {
  const saved = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  chatHistory = saved;

  const messages = document.getElementById('chatMessages');
  saved.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.textContent = msg;
    messages.appendChild(div);
  });
  messages.scrollTop = messages.scrollHeight;

  // Ẩn chatbox khi mới vào
  document.getElementById('chatBody').style.display = 'none';
});

// Nhấn Enter để gửi tin
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement.id === 'chatMessage') {
    sendMessage();
  }
});

console.log("✅ Chat box hoạt động & lưu lịch sử!");
