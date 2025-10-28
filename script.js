// ===== CHAT BOX =====
const chatBox = document.getElementById('chatBox');
const chatBody = document.getElementById('chatBody');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatMessage');
const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const chatInputBox = document.getElementById("chatMessage");
let lastChatTime = 0;
let username = localStorage.getItem('chatUsername') || null;

// ===== Khi tải trang =====
window.addEventListener('load', () => {
  // Ẩn phần thân chat, chỉ hiện header
  chatBody.style.display = 'none';
  chatBox.classList.remove('open');
  console.log("✅ Chat box hoạt động & kết nối Firebase!");
});

// ===== NÚT TRÒN 💬 MỞ / ẨN TOÀN BỘ CHAT =====
const chatToggleBtn = document.getElementById('chatToggleBtn') || document.querySelector('.chat-floating-btn');
if (chatToggleBtn) {
  chatToggleBtn.addEventListener('click', () => {
    if (chatBox.classList.contains('open')) {
      chatBox.classList.remove('open');
      chatBody.style.display = 'none';
    } else {
      chatBox.classList.add('open');
      chatBody.style.display = 'flex';
    }
  });
}

// ===== BẤM HEADER — THU GỌN / MỞ NỘI DUNG CHAT =====
function toggleChat() {
  if (chatBody.style.display === 'none' || chatBody.style.display === '') {
    chatBody.style.display = 'flex';
    chatBox.classList.add('open');
  } else {
    chatBody.style.display = 'none';
    chatBox.classList.remove('open');
  }
}

// ===== GỬI TIN NHẮN =====
function sendMessage() {
  if (!username) {
    document.getElementById('namePrompt').style.display = 'flex';
    return;
  }

  const msg = chatInput.value.trim();
  if (!msg) return;

  const now = Date.now();
  if (now - lastChatTime < 5000) {
    alert("⏳ Uốn lưỡi 7 lần trước khi chat :)");
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

// ===== LƯU TÊN NGƯỜI DÙNG =====
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

// ===== NHẬN TIN NHẮN REALTIME =====
window.onChildAdded(window.ref(window.db, 'messages'), (snapshot) => {
  const data = snapshot.val();
  addMessage(data.name, data.text, data.time);
});

// ===== HIỂN THỊ TIN NHẮN =====
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

// ===== GỬI BẰNG PHÍM ENTER =====
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ===== EMOJI PANEL =====
emojiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  emojiPanel.classList.toggle("show");
});
document.addEventListener("click", () => {
  emojiPanel.classList.remove("show");
});
function addEmoji(emoji) {
  chatInputBox.value += emoji + " ";
  chatInputBox.focus();
}
