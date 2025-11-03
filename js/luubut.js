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