let currentIndex = 0;
let galleryImages = [];
let slideshowInterval = null;
let isPlaying = false;
let isMusicOn = false;

const music = document.getElementById("bgMusic");
const musicTitle = document.getElementById("musicTitle");

// ===== Dữ liệu sự kiện =====
const events = [
  {
    name: "Trung thu 2025",
    images: [
      { src: "images/memories/kn1.jpg", caption: "Trung thu 2025 - Ảnh 1" },
      { src: "images/memories/kn2.jpg", caption: "Trung thu 2025 - Ảnh 2" },
      { src: "images/memories/kn3.jpg", caption: "Trung thu 2025 - Ảnh 3" },
      { src: "images/memories/kn4.jpg", caption: "Trung thu 2025 - Ảnh 4" },
      { src: "images/memories/kn5.jpg", caption: "Trung thu 2025 - Ảnh 5" },
      { src: "images/memories/kn6.jpg", caption: "Trung thu 2025 - Ảnh 6" },
      { src: "images/memories/kn7.jpg", caption: "Trung thu 2025 - Ảnh 7" }
    ]
  },
  {
    name: "Lớp học Tin học",
    images: [
      { src: "images/memories/tinhoc1.jpg", caption: "Lớp học Tin học - Ảnh 1" }
    ]
  }
];

// ===== Danh sách nhạc =====
const playlist = [
  { title: "Kỷ Niệm Xưa", src: "music/kynyemxua.mp3" },
  { title: "Nhớ Mãi Tuổi Học Trò", src: "music/nmtht.mp3" },
  { title: "Tình Bạn Diệu Kỳ", src: "music/tbdk.mp3" }
];
let currentSong = 0;

// ===== LOAD MUSIC =====
function loadMusic(index) {
  music.src = playlist[index].src;
  music.load();
  musicTitle.textContent = "🎵 " + playlist[index].title;
}

function toggleMusic() {
  const btn = document.getElementById("musicToggle");
  if (isMusicOn) {
    music.pause();
    isMusicOn = false;
    btn.textContent = "🔊 Phát nhạc";
  } else {
    music.play().then(() => {
      isMusicOn = true;
      btn.textContent = "🔇 Dừng nhạc";
    }).catch(err => {
      alert("Nhấn vào nút để bật nhạc do trình duyệt chặn autoplay.");
    });
  }
}

function nextMusic() {
  currentSong = (currentSong + 1) % playlist.length;
  loadMusic(currentSong);
  if (isMusicOn) music.play().catch(() => {
    alert("Nhấn nút Phát nhạc để tiếp tục.");
  });
}

// ===== LIGHTBOX =====
function openEventGallery(eventIndex) {
  galleryImages = events[eventIndex].images;
  currentIndex = 0;
  updateLightbox();
  
  const lightboxEl = document.getElementById("lightbox");
  lightboxEl.style.display = "flex";

  // Hiện nút khi lightbox mở
  lightboxEl.querySelector(".close").style.display = "block";
  lightboxEl.querySelector(".prev").style.display = "block";
  lightboxEl.querySelector(".next").style.display = "block";

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightboxEl = document.getElementById("lightbox");
  lightboxEl.style.display = "none";

  // Ẩn nút khi đóng
  lightboxEl.querySelector(".close").style.display = "none";
  lightboxEl.querySelector(".prev").style.display = "none";
  lightboxEl.querySelector(".next").style.display = "none";

  document.body.style.overflow = "auto";
  stopSlideshow();
}

function updateLightbox() {
  const imgData = galleryImages[currentIndex];
  const imgEl = document.getElementById("lightboxImg");
  const captionEl = document.getElementById("lightboxCaption");

  // Chuyển ảnh mượt hơn
  imgEl.style.opacity = 0;
  setTimeout(() => {
    imgEl.src = imgData.src;
    captionEl.textContent = imgData.caption;
    imgEl.style.opacity = 1;
  }, 150);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

// ===== SLIDESHOW =====
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
  if (!galleryImages.length) return;
  isPlaying = true;
  slideshowInterval = setInterval(nextImage, 4000);
}

function stopSlideshow() {
  isPlaying = false;
  clearInterval(slideshowInterval);
}

// ===== TOUCH SWIPE =====
let touchStartX = 0;
let touchEndX = 0;
const lightboxEl = document.getElementById("lightbox");

lightboxEl.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

lightboxEl.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 50) prevImage();
  else if (touchStartX - touchEndX > 50) nextImage();
});

// Click nền để đóng (không flash)
lightboxEl.addEventListener("click", e => {
  if (e.target === e.currentTarget) closeLightbox();
});

// ===== INIT =====
window.addEventListener("DOMContentLoaded", () => {
  loadMusic(currentSong);

  // Gắn sự kiện click tự động cho tất cả thumb
  document.querySelectorAll('.event-thumb').forEach((thumb, index) => {
    thumb.addEventListener('click', () => openEventGallery(index));
  });

  music.addEventListener("ended", nextMusic);
});
