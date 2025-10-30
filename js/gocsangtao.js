// ================== XỬ LÝ VIDEO CLIP ==================
const btn = document.getElementById("loadClipBtn");
const container = document.getElementById("videoContainer");

btn.addEventListener("click", () => {
  const video = document.createElement("video");
  video.src = "videos/demo.mp4"; // 🔹 Đường dẫn clip của bạn
  video.controls = true;
  video.autoplay = true;
  video.loop = true; // ✅ Cho phép clip tự phát lại
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "contain";
video.style.backgroundColor = "#000"; // để nền đen viền ngoài đẹp hơn
  video.style.borderRadius = "12px";
  video.style.opacity = 0;
  video.style.transition = "opacity 0.6s";

  btn.style.display = "none";
  container.appendChild(video);

  // Hiệu ứng fade-in
  requestAnimationFrame(() => (video.style.opacity = 1));
});

// ================== XỬ LÝ NHẠC NỀN ==================
const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    bgMusic.play();
    musicBtn.textContent = "🔈 Tắt nhạc";
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🔊 Nhạc nền";
  }
  musicPlaying = !musicPlaying;
});
