const music = document.getElementById("bgMusic");
const overlay = document.getElementById("loadingOverlay");

// Hàm bật nhạc
function startMusic() {
  music.play().catch(err => console.log("Autoplay bị chặn:", err));
  overlay.style.display = "none"; // ẩn overlay
  localStorage.removeItem("autoPlayLoingo"); // xóa key
}

// 1️⃣ Nếu người dùng tap vào bất kỳ đâu trên màn hình
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

// 2️⃣ Nếu localStorage có key, tự động chờ 5 giây rồi bật nhạc
if (localStorage.getItem("autoPlayLoingo") === "true") {
  setTimeout(() => {
    startMusic();
  }, 5000);
}
