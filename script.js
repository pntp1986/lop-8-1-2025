// ===== CHAT BOX =====
const chatBody = document.getElementById('chatBody');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatMessage');
let lastChatTime = 0;

// Toggle chat box
function toggleChat() {
  chatBody.style.display = (chatBody.style.display === 'flex') ? 'none' : 'flex';
}

// Gửi tin nhắn lên Firebase
function sendMessage() {
  const now = Date.now();
  if (now - lastChatTime < 15000) {
    alert("⏳ Vui lòng chờ 15 giây trước khi gửi tin tiếp theo!");
    return;
  }
  const msg = chatInput.value.trim();
  if (!msg) return;

  // Gửi lên Firebase
  window.push(window.ref(window.db, 'messages'), {
    text: msg,
    time: Date.now()
  });

  chatInput.value = '';
  lastChatTime = now;
}

// Hiển thị tin nhắn mới từ Firebase realtime
window.onChildAdded(window.ref(window.db, 'messages'), (snapshot) => {
  const data = snapshot.val();
  addMessage(data.text);
});

// Thêm tin nhắn vào giao diện
function addMessage(msg) {
  const div = document.createElement('div');
  div.className = 'chat-message';
  div.textContent = msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Nhấn Enter để gửi
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

window.addEventListener('load', () => {
  chatBody.style.display = 'none';
  console.log("✅ Chat box hoạt động & kết nối Firebase!");
});
