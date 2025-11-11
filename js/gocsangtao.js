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

loadClip("loadClipBtn", "videoContainer2", "videos/cliptruyen.mp4", "funPoster");


// ================== ÂM NHẠC TRẺ TRUNG ==================
const videoList = [
 {
    url: "videos/co-oi.mp4",
    title: "Cô ơi - Candy Ngọc Hà",
    poster: "images/poster/co-oi.png"
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

// ================== PHÁT NHẠC + HIỆN LỜI BÀI HÁT ==================
const playBtn = document.getElementById("playMusicBtn");
const container1 = document.getElementById("videoContainer1");
const lyricsDisplay = document.getElementById("lyricsDisplay");

let audioPlayer = null;
let lyricsData = [];

let lastLyricKey = null;   // theo dõi đoạn lyrics hiện tại
let charTimers = [];       // lưu các timer chạy từng chữ
function clearCharTimers() {
  if (charTimers.length) {
    charTimers.forEach(id => clearTimeout(id));
    charTimers = [];
  }
}


async function loadLyrics(url) {
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split(/\r?\n/);

  const lyrics = [];

  for (let line of lines) {
    if (line.startsWith("Dialogue:")) {
  const parts = line.split(",");
  const start = timeToSeconds(parts[1]);
  const end = timeToSeconds(parts[2]);
  const textPart = parts.slice(9).join(","); // ✅ cắt chuẩn
  const textClean = textPart
    .replace(/{.*?}/g, "")   // bỏ mã màu và style
    .replace(/\\N/g, "\n")   // xuống dòng
    .trim();

  lyrics.push({ start, end, text: textClean });
}

  }
  return lyrics;
}


function timeToSeconds(t) {
  const [h, m, s] = t.split(":");
  const [sec, ms] = s.split(".");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + (parseInt(ms || 0) / 100);
}

playBtn.addEventListener("click", async () => {
  // Nếu chưa có audio thì tạo
 if (!audioPlayer) {
  const audioSrc = playBtn.dataset.src; // lấy đúng bài từ HTML
  audioPlayer = new Audio(audioSrc);
  audioPlayer.controls = true;
  audioPlayer.style.width = "100%";
  container1.appendChild(audioPlayer);

  lyricsData = await loadLyrics("music/loibaihat.ass");
}


  // Ẩn nút, hiện vùng lời
  playBtn.style.display = "none";
  lyricsDisplay.style.display = "block";

  audioPlayer.play();

  // Cập nhật lời
  audioPlayer.addEventListener("timeupdate", () => {
  const t = audioPlayer.currentTime;
  const current = lyricsData.find(l => t >= l.start && t <= l.end);

  // Tạo một key duy nhất cho đoạn hiện tại (để phát animation chỉ khi mới đổi đoạn)
  const key = current ? `${current.start}-${current.end}-${current.text}` : null;

  // Nếu vẫn cùng đoạn với lần trước -> không khởi animation lại
  if (key && key === lastLyricKey) {
    return;
  }

  // Nếu đổi đoạn (hoặc không còn đoạn) → reset mọi thứ trước khi render
  lastLyricKey = key;

  // Clear mọi timer cũ
  if (charTimers.length) {
    charTimers.forEach(id => clearTimeout(id));
    charTimers = [];
  }

  // Nếu có đoạn lyrics hiện tại -> render
  if (current) {
    const lines = current.text.split("\n");

    lyricsDisplay.innerHTML = lines
      .map((line, i) => {
        if (i === 1) { // dòng thứ 3 -> tách ký tự
          // escape HTML minimal: thay < và > để tránh lỗi nếu có tag
          const safe = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return `<div class="lyric-line lyric-second" data-line="${i + 1}">
            ${[...safe].map(ch => `<span class="char">${ch === " " ? "&nbsp;" : ch}</span>`).join("")}
          </div>`;
        } else {
          const safe = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return `<div class="lyric-line" data-line="${i + 1}">${safe}</div>`;
        }
      })
      .join("");

    // Áp effect cho từng dòng (như trước)
    const linesEls = lyricsDisplay.querySelectorAll(".lyric-line");
    linesEls.forEach((el, i) => {
      el.classList.remove("lyric-active", "highlight-run");
      setTimeout(() => el.classList.add("lyric-active"), i * 300);
    });

    // Bắt đầu animation chữ cho dòng 3: reset class rồi bật visible từng ký tự
    const secondLine = lyricsDisplay.querySelector(".lyric-second");
if (secondLine) {
  const chars = secondLine.querySelectorAll(".char");

      chars.forEach((ch, idx) => {
        ch.classList.remove("visible");
        // tạo timer và lưu để có thể clear khi đổi đoạn
        const timer = setTimeout(() => {
          ch.classList.add("visible");
        }, idx * 80); // 80ms mỗi chữ => chỉnh tùy ý
        charTimers.push(timer);
      });
    }

  } else {
    // Không có đoạn nào đang phát -> ẩn vùng lời
    lyricsDisplay.innerHTML = "";
    // reset lastKey để khi sau này xuất hiện đoạn mới sẽ khởi animation
    lastLyricKey = null;
  }
});


// ví dụ khi dừng / tua / ended:
audioPlayer.addEventListener("pause", () => {
  // tuỳ ý: nếu pause ở đầu thì hiện poster... (giữ như cũ)
  clearCharTimers();
});

audioPlayer.addEventListener("ended", () => {
  clearCharTimers();
  playBtn.style.display = "inline-block";
  lyricsDisplay.style.display = "none";
  lyricsDisplay.innerHTML = "";
  audioPlayer.currentTime = 0;
  lastLyricKey = null;
});

});

// 💫 Nhấn vào khung để phóng to / thu nhỏ
document.querySelectorAll('.video-frame').forEach(frame => {
  frame.addEventListener('click', () => {
    frame.classList.toggle('enlarged');
  });
});


// ================== XEM THIỆP 20/11 ==================
const thiepPoster = document.getElementById("thiepPoster");
const prevThiep = document.getElementById("prevThiep");
const nextThiep = document.getElementById("nextThiep");

const thiepImages = [
  "images/memories/thiep1.jpg",
  "images/memories/thiep2.jpg",
  "images/memories/thiep3.jpg"
];

let thiepIndex = 0;

function showThiep(index) {
  thiepIndex = (index + thiepImages.length) % thiepImages.length; // vòng lặp
  thiepPoster.src = thiepImages[thiepIndex];
}

// Nút Prev
prevThiep.addEventListener("click", (e) => {
  e.stopPropagation();
  showThiep(thiepIndex - 1);
});

// Nút Next
nextThiep.addEventListener("click", (e) => {
  e.stopPropagation();
  showThiep(thiepIndex + 1);
});

