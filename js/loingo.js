const music = document.getElementById("bgMusic");

// 🔹 Nếu vừa bấm từ menu chính
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("autoPlayLoingo") === "true") {
    localStorage.removeItem("autoPlayLoingo"); 
    music.play().catch(err => console.log("Autoplay bị chặn:", err));
  }
});
