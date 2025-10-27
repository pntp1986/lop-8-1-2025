let currentIndex = 0;
let galleryImages = [];

const lightboxEl = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let isMusicOn = false;

// ===== Sự kiện =====
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

// ===== OPEN EVENT =====
function openEventGallery(index) {
  galleryImages = events[index].images;
  currentIndex = 0;
  updateLightbox();
  lightboxEl.style.display = "flex";

  // Hiện nút
  lightboxEl.querySelector(".close").style.display = "block";
  lightboxEl.querySelector(".prev").style.display = "block";
  lightboxEl.querySelector(".next").style.display = "block";

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxEl.style.display = "none";
  lightboxEl.querySelector(".close").style.display = "none";
  lightboxEl.querySelector(".prev").style.display = "none";
  lightboxEl.querySelector(".next").style.display = "none";
  document.body.style.overflow = "auto";
}

// ===== UPDATE IMAGE =====
function updateLightbox() {
  const imgData = galleryImages[currentIndex];
  lightboxImg.style.opacity = 0;
  setTimeout(() => {
    lightboxImg.src = imgData.src;
    lightboxCaption.textContent = imgData.caption;
    lightboxImg.style.opacity = 1;
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

// ===== TOUCH SWIPE =====
let touchStartX = 0;
let touchEndX = 0;

lightboxEl.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
lightboxEl.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 50) prevImage();
  else if (touchStartX - touchEndX > 50) nextImage();
});

// ===== CLICK NỀN ĐỂ ĐÓNG =====
lightboxEl.addEventListener("click", e => { 
  if (e.target === e.currentTarget) closeLightbox();
});

// ===== GẮN THUMB CLICK =====
document.querySelectorAll('.event-thumb').forEach((thumb, i) => {
  thumb.addEventListener('click', () => openEventGallery(i));
});

// ===== GẮN NÚT NEXT / PREV / CLOSE =====
lightboxEl.querySelector('.next').addEventListener('click', nextImage);
lightboxEl.querySelector('.prev').addEventListener('click', prevImage);
lightboxEl.querySelector('.close').addEventListener('click', closeLightbox);

// ===== NHẠC NỀN 1 BÀI =====
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
