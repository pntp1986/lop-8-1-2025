// ===== TỰ ĐỘNG PHÁT NHẠC =====
const music = document.getElementById("bgMusic");

// 🔹 Khi trang được mở, kiểm tra nếu vừa bấm từ menu chính
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("autoPlayLoingo") === "true") {
    localStorage.removeItem("autoPlayLoingo"); // Xóa cờ sau khi dùng
    music.play().catch(err => console.log("Autoplay bị chặn:", err));
  }
});
