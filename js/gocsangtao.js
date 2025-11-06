// ================== XỬ LÝ VIDEO CLIP (có poster) ==================
function loadClip(buttonId, containerId, videoSrc, posterId) {
  const btn = document.getElementById(buttonId);
  const container = document.getElementById(containerId);
  const poster = posterId ? document.getElementById(posterId) : null;

  if (!btn || !container) return;

  btn.addEventListener("click", () => {
    // Dừng tất cả video khác trước khi phát clip mới
document.querySelectorAll("video").forEach(v => {
  v.pause();
  v.currentTime = 0;
});

    const video = document.createElement("video");
    video.src = videoSrc;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.borderRadius = "12px";
    video.style.objectFit = "contain";
    video.style.backgroundColor = "#000";
    video.style.opacity = 0;
    video.style.transition = "opacity 0.6s";

    // Ẩn poster và nút
    btn.style.display = "none";
    if (poster) poster.classList.add("hidden");

    container.appendChild(video);
    requestAnimationFrame(() => (video.style.opacity = 1));
    // 🔹 Khi clip được phát lại → dừng các video khác
video.addEventListener("play", () => {
  document.querySelectorAll("video").forEach(v => {
    if (v !== video) {
      v.pause();
      v.currentTime = 0;
    }
  });
});

  });
}

loadClip("loadClipBtn", "videoContainer", "videos/demo.mp4", "funPoster");


// ================== ÂM NHẠC TRẺ TRUNG ==================
const videoList = [
  {
    url: "videos/lop81.mp4",
    title: "ỘT ĐƯỜNG NỞ HOA (一路生花)",
    poster: "images/poster/luubut.jpg"
  },
  {
    url: "videos/chuatron20.mp4",
    title: "J'ai Pas Vingt Ans – Tôi chưa tròn hai mươi",
    poster: "images/poster/not20.png"
  },
  {
    url: "videos/Nothing_s_Gonna_Change_My_Love_for_You.mp4",
    title: "Tình yêu anh mãi không đổi thay",
    poster: "images/poster/nothings.png"
  },
  {
    url: "videos/congioAlize.mp4",
    title: "L'Alizé – Cơn gió Alizé",
    poster: "images/poster/alizee.png"
  },
  {
    url: "videos/nguocdong.mp4",
    title: "À contre-courant – Đi ngược dòng chảy",
    poster: "images/poster/nguocdong.png"
  }
];

let current = 0;
const mainVideo = document.getElementById("mainVideo");
const titleEl = document.getElementById("videoTitle");
const prevVideo = document.getElementById("prevVideo");
const nextVideo = document.getElementById("nextVideo");
const posterEl = document.getElementById("videoPoster");

// Hiện video
function showVideo(index) {
  if (index < 0) index = videoList.length - 1;
  if (index >= videoList.length) index = 0;
  current = index;

  const { url, title, poster } = videoList[current];
  const frameBox = mainVideo.parentElement;
  frameBox.style.opacity = 0;

  setTimeout(() => {
    // Dừng tất cả video khác
document.querySelectorAll("video").forEach(v => {
  v.pause();
  v.currentTime = 0;
});

    mainVideo.src = url;
    posterEl.src = poster || "";
    mainVideo.load();
    mainVideo.pause();
    titleEl.textContent = title;
    posterEl.classList.remove("hidden");
    frameBox.style.opacity = 1;
  }, 400);
}

prevVideo.addEventListener("click", () => showVideo(current - 1));
nextVideo.addEventListener("click", () => showVideo(current + 1));

// Khi click poster → play video
posterEl.addEventListener("click", () => {
  // Dừng tất cả video khác trước khi phát
document.querySelectorAll("video").forEach(v => {
  v.pause();
  v.currentTime = 0;
});

  posterEl.classList.add("hidden");
  mainVideo.play();
});

// Nếu người dùng dừng video ở đầu → hiện lại poster
mainVideo.addEventListener("pause", () => {
  if (mainVideo.currentTime === 0) {
    posterEl.classList.remove("hidden");
  }
});


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

