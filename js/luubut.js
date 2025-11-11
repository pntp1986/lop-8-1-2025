const music = document.getElementById("bgMusic");
const overlay = document.getElementById("loadingOverlay");

// Bật nhạc khi click/tap
function startMusic() {
  music.play().catch(err => console.log("Autoplay bị chặn:", err));
  overlay.style.display = "none";
  localStorage.removeItem("autoPlayLoingo");
}
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

// Modal
const modal = document.getElementById('imageModal');
const modalContent = document.getElementById('fullImage');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

// Mở modal ảnh
document.querySelectorAll('.event-thumb img.clickable').forEach(img => {
  img.addEventListener('click', e => {
    e.stopPropagation();
    modalContent.style.display = 'block';
    modalContent.src = img.src;
    caption.style.display = 'none';
    modal.style.display = 'flex';
  });
});

// Mở modal text
document.querySelectorAll('.story-text.clickable').forEach(text => {
  text.addEventListener('click', e => {
    e.stopPropagation();
    modalContent.style.display = 'none';
    caption.style.display = 'block';
    caption.innerHTML = text.innerHTML;
    modal.scrollTop = 0;
    modal.style.display = 'flex';
  });
});

// Đóng modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

function scaleFireText() {
  document.querySelectorAll('.fire-text').forEach(el => {
    const parentWidth = el.parentElement.clientWidth - 20; // trừ padding
    const textWidth = el.scrollWidth;
    const scale = Math.min(1, parentWidth / textWidth);
    el.style.transform = `scale(${scale})`;
  });
}

// Chạy lần đầu
scaleFireText();

// Khi resize
window.addEventListener('resize', scaleFireText);

