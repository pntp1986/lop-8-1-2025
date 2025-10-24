// ====== KHỞI TẠO ======
const chatBox = document.getElementById('chatBox');
const chatBody = document.getElementById('chatBody');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatMessage');
const chatHeader = document.getElementById('chatHeader');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPanel = document.getElementById('emojiPanel');
let username = localStorage.getItem('chatUsername') || null;
let lastChatTime = 0;

// ====== KHI LOAD TRANG ======
window.addEventListener('load', () => {
  chatBody.style.display = 'none';
  console.log("✅ Chat box sẵn sàng!");
});

// ====== MỞ / THU NHỎ CHAT ======
chatHeader.addEventListener('click', () => {
  if (window.innerWidth <= 600) {
    chatBox.classList.toggle('collapsed');
  } else {
    chatBody.style.display =
      chatBody.style.display === 'flex' ? 'none' : 'flex';
  }
});

// ====== GỬI TIN NHẮN ======
function sendMessage() {
  if (!username) {
    document.getElementById('namePrompt').style.display = 'flex';
    return;
  }

  const msg = chatInput.value.trim();
  if (!msg) return;

  const now = Date.now();
  if (now - lastChatTime < 10000) {
    alert("⏳ Vui lòng chờ 10 giây trước khi gửi tiếp!");
    return;
  }

  window.push(window.ref(window.db, 'messages'), {
    name: username,
    text: msg,
    time: Date.now()
  });

  chatInput.value = '';
  lastChatTime = now;
}

// ====== LƯU TÊN NGƯỜI DÙNG ======
function saveUsername() {
  const name = document.getElementById('usernameInput').value.trim();
  if (!name) return alert("Vui lòng nhập tên!");
  localStorage.setItem('chatUsername', name);
  username = name;
  document.getElementById('namePrompt').style.display = 'none';
  alert("✅ Xin chào " + name + "!");
}

// ====== NHẬN TIN NHẮN REALTIME ======
window.onChildAdded(window.ref(window.db, 'messages'), (snap) => {
  const d = snap.val();
  const div = document.createElement('div');
  div.className = 'chat-message';
  const t = new Date(d.time);
  const timeStr = `${t.getHours().toString().padStart(2,'0')}:${t.getMinutes().toString().padStart(2,'0')}`;
  div.innerHTML = `<b>${d.name}</b> <small style="color:#777;">(${timeStr})</small><br>${d.text}`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// ====== EMOJI ======
const emojis = ['😀','😁','😂','🤣','😊','😍','😘','😎','😢','😭','😡','😱','🤩','🥳','👍','👎','🙏','🎉','💗','🔥'];
emojis.forEach(e => {
  const s = document.createElement('span');
  s.textContent = e;
  s.onclick = () => addEmoji(e);
  emojiPanel.appendChild(s);
});

emojiBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  emojiPanel.classList.toggle('show');
});
document.addEventListener('click', () => emojiPanel.classList.remove('show'));

function addEmoji(e) {
  chatInput.value += e + " ";
  chatInput.focus();
}

chatInput.addEventListener('keydown', ev => {
  if (ev.key === 'Enter') sendMessage();
});
