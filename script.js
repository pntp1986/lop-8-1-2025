// ===== CHAT BOX =====
const chatBody = document.getElementById('chatBody');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatMessage');
let lastChatTime = 0;

// Lấy tên người dùng đã lưu (nếu có)
let username = localStorage.getItem('chatUsername') || null;

// ===== Khi tải trang =====
window.addEventListener('load', () => {
  chatBody.style.display = 'none';
  console.log("✅ Chat box hoạt động & kết nối Firebase!");
});

// ===== MỞ / THU NHỎ CHAT BOX =====
function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  const chatBody = document.getElementById('chatBody');

  if (window.innerWidth <= 600) {
    // 📱 Mobile: toggle class collapsed
    chatBox.classList.toggle('collapsed');
  } else {
    // 💻 Desktop: ẩn/hiện phần nội dung
    if (chatBody.style.display === 'none' || chatBody.style.display === '') {
      chatBody.style.display = 'flex';
    } else {
      chatBody.style.display = 'none';
    }
  }
}


// ===== Gửi tin nhắn =====
function sendMessage() {
  // Nếu chưa có tên thì yêu cầu nhập
  if (!username) {
    document.getElementById('namePrompt').style.display = 'flex';
    return;
  }

  const msg = chatInput.value.trim();
  if (!msg) return;

  const now = Date.now();
  if (now - lastChatTime < 10000) { // Giới hạn 10s
    alert("⏳ Vui lòng chờ 10 giây trước khi gửi tin tiếp theo!");
    return;
  }

  // Gửi tin nhắn lên Firebase
  window.push(window.ref(window.db, 'messages'), {
    name: username,
    text: msg,
    time: Date.now()
  });

  chatInput.value = '';
  lastChatTime = now;
}

// ===== Lưu tên người dùng khi nhập xong =====
function saveUsername() {
  const name = document.getElementById('usernameInput').value.trim();
  if (!name) {
    alert("Vui lòng nhập tên!");
    return;
  }
  localStorage.setItem('chatUsername', name);
  username = name;
  document.getElementById('namePrompt').style.display = 'none';
  alert("✅ Xin chào " + name + "! Bây giờ bạn có thể chat.");
}

// ===== Nhận tin nhắn realtime =====
window.onChildAdded(window.ref(window.db, 'messages'), (snapshot) => {
  const data = snapshot.val();
  addMessage(data.name, data.text, data.time);
});

// ===== Hiển thị tin nhắn =====
function addMessage(name, msg, time) {
  const div = document.createElement('div');
  div.className = 'chat-message';

  const date = new Date(time);
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hh}:${mm}`;

  div.innerHTML = `<b>${name}</b> <small style="color:#777;">(${timeStr})</small><br>${msg}`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== Gửi bằng phím Enter =====
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ====== EMOJI PANEL ======
const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const chatInputBox = document.getElementById("chatMessage");

// Ẩn/hiện bảng emoji
emojiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  emojiPanel.classList.toggle("show");
});

// Ẩn khi click ra ngoài
document.addEventListener("click", () => {
  emojiPanel.classList.remove("show");
});

// Thêm emoji vào ô nhập
function addEmoji(emoji) {
  chatInputBox.value += emoji + " ";
  chatInputBox.focus();
  // ❌ Xóa dòng này để không ẩn bảng sau mỗi lần chọn
  // emojiPanel.classList.remove("show");
}

// ===== THU NHỎ / MỞ RỘNG CHATBOX =====
const chatHeader = document.getElementById('chatHeader');
const chatBox = document.querySelector('.chatbox');

chatHeader.addEventListener('click', () => {
  // Trên mobile thì toggle thu nhỏ
  if (window.innerWidth <= 600) {
    chatBox.classList.toggle('collapsed');
  } else {
    // Trên PC: bật / tắt nội dung chat
    chatBody.style.display = (chatBody.style.display === 'flex') ? 'none' : 'flex';
  }
});




