let currentIndex = 0;
let galleryImages = [];

const lightboxEl = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");


// ===== Sự kiện =====
const events = [
  {
    name: "Hình tập thể Lớp 8/1",
    images: [
      { src: "images/memories/tapthe1.jpg", caption: "Những năm tháng thanh xuân rực rỡ dưới mái trường! Cùng nhau đứng dưới bầu trời này, khoảnh khắc này sẽ mãi là một trang ký ức đẹp đẽ nhất của tuổi học trò" },
      { src: "images/memories/tapthe2.jpg", caption: "Khoảnh khắc đáng nhớ của thầy và trò - nơi tri thức được vun đắp và tình cảm thầy trò luôn đong đầy. Mỗi nụ cười rạng rỡ đều là minh chứng cho một hành trình học tập đầy ý nghĩa!" },
      
    ]
  },
   {
    name: "Kỷ niệm 20/11",
    images: [
      { src: "images/memories/thiep2011.jpg", caption: "Yêu mãi lớp 8/1" },
      { src: "images/memories/giaykhen.jpg", caption: "Giấy khen" },
      { src: "videos/tangqua.mp4", caption: "Bất giờ dành cho cô" },
      { src: "videos/congboketqua.mp4", caption: "Tổng kết" }
      
    ]
  },
  {
    name: "Hình tập văn nghệ",
    images: [
          { src: "images/memories/vannghe1.jpg", caption: "Hình tập văn nghệ" },
      { src: "images/memories/vannghe2.jpg", caption: "Hình tập văn nghệ" },
      { src: "images/memories/vannghe3.jpg", caption: "Hình tập văn nghệ" }
    ]
  },
  {
    name: "Tham gia thiết kế sản phẩm stem",
    images: [
          { src: "images/memories/stem3.jpg", caption: "Sản phầm để đời :)" },
      { src: "images/memories/stem4.jpg", caption: "Sản phầm để đời :)" },
      { src: "images/memories/stem5.jpg", caption: "Sản phầm để đời :)" },
      { src: "images/memories/stem6.jpg", caption: "Lớp cùng vui và mệt với stem" }
    ]
  },
  {
    name: "Tuyên truyền pháp luật",
    images: [
      { src: "images/memories/pl1.jpg", caption: "Tham gia tuyên truyền pháp luật - Ảnh 1" },
      { src: "images/memories/pl2.jpg", caption: "Tham gia tuyên truyền pháp luật - Ảnh 2" }
    ]
  },
  {
    name: "Trung thu 2025",
    images: [
       { src: "images/memories/longden1.jpg", caption: "Hội thi lồng đèn - Ảnh 1" },
      { src: "images/memories/longden2.jpg", caption: "Hội thi lồng đèn - Ảnh 2" },
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

  const lightboxVideo = document.getElementById("lightboxVideo");

  // Ẩn cả 2 trước khi cập nhật
  lightboxImg.style.display = 'none';
  lightboxImg.style.opacity = 0;
  lightboxVideo.style.display = 'none';
  lightboxVideo.pause();

  // Caption luôn cập nhật
  lightboxCaption.textContent = imgData.caption;

  // Hiển thị video hoặc ảnh
  if (imgData.src.endsWith('.mp4')) {
    lightboxVideo.src = imgData.src;
    lightboxVideo.style.display = 'block';
    lightboxVideo.play();
  } else {
    lightboxImg.src = imgData.src;
    lightboxImg.style.display = 'block';
    setTimeout(() => lightboxImg.style.opacity = 1, 50);
  }
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

// ===== GẮN SỰ KIỆN SAU KHI DOM LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  // Gắn sự kiện khi click vào từng ảnh sự kiện
  document.querySelectorAll('.event-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => openEventGallery(i));
  });

  // Gắn nút điều hướng trong lightbox
  lightboxEl.querySelector('.next').addEventListener('click', nextImage);
  lightboxEl.querySelector('.prev').addEventListener('click', prevImage);
  lightboxEl.querySelector('.close').addEventListener('click', closeLightbox);
});

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
