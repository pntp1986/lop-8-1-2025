// ================== XỬ LÝ VIDEO CLIP ==================

// 🔹 Hàm dùng chung để tạo và hiển thị clip
function loadClip(buttonId, containerId, videoSrc) {
  const btn = document.getElementById(buttonId);
  const container = document.getElementById(containerId);

  // Nếu không tìm thấy phần tử thì bỏ qua (tránh lỗi)
  if (!btn || !container) return;

  btn.addEventListener("click", () => {
    const video = document.createElement("video");
    video.src = videoSrc;         // 🔸 Đường dẫn clip của bạn
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain";
    video.style.backgroundColor = "#000";
    video.style.borderRadius = "12px";
    video.style.opacity = 0;
    video.style.transition = "opacity 0.6s";

    // Ẩn nút, chèn clip, và tạo hiệu ứng fade-in
    btn.style.display = "none";
    container.appendChild(video);
    requestAnimationFrame(() => (video.style.opacity = 1));
  });
}

// ================== GỌI HÀM CHO TỪNG NHÓM CLIP ==================

// 💖 Clip vui nhộn
loadClip("loadClipBtn", "videoContainer", "videos/demo.mp4");

// 💖 Âm nhạc trẻ trung
loadClip("clip1Btn", "clip1Container", "https://www.youtube.com/watch?v=-1PkaJwJ1yA&list=RD-1PkaJwJ1yA&index=1");
loadClip("clip2Btn", "clip2Container", "https://www.youtube.com/watch?v=gRaRdAYO9II&list=RD-1PkaJwJ1yA&index=5");
loadClip("clip3Btn", "clip3Container", "https://www.youtube.com/watch?v=H3Ioxh3OTSU&list=RDH3Ioxh3OTSU&start_radio=1");

// 🆕 Nếu bạn muốn thêm nhóm khác, chỉ cần gọi thêm:
// loadClip("id_nut", "id_noidung", "videos/tenfile.mp4");


// // ================== XỬ LÝ NHẠC NỀN ==================
// const musicBtn = document.getElementById("musicToggle");
// const bgMusic = document.getElementById("bgMusic");

// let musicPlaying = false;

// musicBtn.addEventListener("click", () => {
//   if (!musicPlaying) {
//     bgMusic.play();
//     musicBtn.textContent = "🔈 Tắt nhạc";
//   } else {
//     bgMusic.pause();
//     musicBtn.textContent = "🔊 Nhạc nền";
//   }
//   musicPlaying = !musicPlaying;
// });
