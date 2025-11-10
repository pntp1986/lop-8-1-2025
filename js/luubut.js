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
