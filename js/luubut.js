// ===== NHẠC NỀN 1 BÀI =====
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let isMusicOn = false;

musicBtn.addEventListener('click', () => {
  if (isMusicOn) { 
    music.pause(); 
    isMusicOn = false; 
    musicBtn.textContent = "🔊 Nhạc nền"; 
  }
  else { 
    music.play(); 
    isMusicOn = true; 
    musicBtn.textContent = "🔇"; 
  }
});

// Lấy các phần tử cần dùng
const modal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const caption = document.getElementById("caption");

// Khi người dùng bấm vào ảnh
document.querySelectorAll(".clickable").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    fullImage.src = img.src;
    caption.innerText = img.alt;
  });
});

// Nút đóng
document.querySelector(".close").addEventListener("click", () => {
  modal.style.display = "none";
});

// Bấm ra ngoài ảnh cũng đóng lại
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// 🔹 Tự co chữ .fire-text vừa khung cha
function scaleFireText() {
  document.querySelectorAll('.fire-text').forEach(el => {
    let parentWidth = el.parentElement.clientWidth;   // chiều rộng khung cha
    let textWidth = el.scrollWidth;                  // chiều rộng chữ thật
    let scale = Math.min(1, parentWidth / textWidth); // tỷ lệ co
    el.style.transform = `scale(${scale})`;
  });
}

// Chạy lần đầu
scaleFireText();

// Chạy lại khi resize màn hình
window.addEventListener('resize', scaleFireText);

// Chọn tất cả các .clickable
document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('fullImage');
    const caption = document.getElementById('caption');

    if (el.classList.contains('story-text')) {
      // Hiển thị nội dung văn bản
      modalContent.style.display = 'none';
      caption.style.display = 'block';
      caption.innerHTML = el.innerHTML;  // đưa truyện vào modal
    } else {
      // Hiển thị ảnh
      modalContent.style.display = 'block';
      modalContent.src = el.src;
      caption.style.display = 'none';
    }

    modal.style.display = 'block';
  });
});

// Đóng modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('imageModal').style.display = 'none';
});

