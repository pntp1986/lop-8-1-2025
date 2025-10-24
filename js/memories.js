let currentIndex = 0;
let images = [];
let slideshowInterval = null;
let isPlaying = false;
let isMusicOn = false;

const music = document.getElementById("bgMusic");
const musicTitle = document.getElementById("musicTitle");

// Danh sách nhạc
const playlist = [
  { title: "Kỷ Niệm Xưa", src: "https://zingmp3.vn/bai-hat/Mong-Uoc-Ky-Niem-Xua-Tam-Ca-3A/ZWZCOEZB.html" },
  { title: "Nhớ Mãi Tuổi Học Trò", src: "https://zingmp3.vn/bai-hat/Mai-Mai-Tuoi-Hoc-Tro-Nguyen-Duyen-Quynh/ZW7U7UCA.html" },
  { title: "Tình Bạn Diệu Kỳ", src: "https://zingmp3.vn/bai-hat/Tinh-Ban-Dieu-Ky-Vote-For-5ive-NAKAMA/Z60D6BZD.html" }
];
let currentSong = 0;

window.addEventListener("DOMContentLoaded", () => {
  images = Array.from(document.querySelectorAll(".gallery-item img"));
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });
  loadMusic(currentSong);

  // Khi nhạc kết thúc -> tự chuyển bài
  music.addEventListener("ended", () => {
    nextMusic();
  });
});

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  document.getElementById("lightbox").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "auto";
  stopSlideshow();
}

function updateLightbox() {
  const img = images[currentIndex];
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("lightboxCaption").textContent = img.parentElement.dataset.caption;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

// ===== Slideshow =====
function toggleSlideshow() {
  const btn = document.getElementById("slideshowToggle");
  if (isPlaying) {
    stopSlideshow();
    btn.textContent = "▶️ Tự động";
  } else {
    startSlideshow();
    btn.textContent = "⏸️ Dừng";
  }
}
function startSlideshow() {
  isPlaying = true;
  slideshowInterval = setInterval(nextImage, 4000);
}
function stopSlideshow() {
  isPlaying = false;
  clearInterval(slideshowInterval);
}

// ===== Nhạc =====
function loadMusic(index) {
  music.src = playlist[index].src;
  musicTitle.textContent = "🎵 " + playlist[index].title;
}

function toggleMusic() {
  const btn = document.getElementById("musicToggle");
  if (isMusicOn) {
    music.pause();
    isMusicOn = false;
    btn.textContent = "🔇 Phát nhạc";
  } else {
    music.play();
    isMusicOn = true;
    btn.textContent = "🔊 Dừng nhạc";
  }
}

function nextMusic() {
  currentSong = (currentSong + 1) % playlist.length;
  loadMusic(currentSong);
  if (isMusicOn) music.play();
}

// Vuốt trái/phải trên mobile
let touchStartX = 0;
let touchEndX = 0;
document.getElementById("lightbox").addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});
document.getElementById("lightbox").addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 50) prevImage();
  else if (touchStartX - touchEndX > 50) nextImage();
});

// Click nền để đóng
document.getElementById("lightbox").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeLightbox();
});
