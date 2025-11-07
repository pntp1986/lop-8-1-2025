class FakeVideo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const imgSrc = this.getAttribute('img');
    const audioSrc = this.getAttribute('audio');
    const subsPath = this.getAttribute('subs');

    // 🔹 Tải phụ đề từ file .ass
    let subtitles = [];
    try {
      subtitles = await this.loadSubtitles(subsPath);
    } catch (e) {
      console.error("Không tải được phụ đề:", e);
    }

    // 🔹 Tạo giao diện bên trong thẻ
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/fakevideo.css">
      <div class="container">
        <img src="${imgSrc}" alt="Ảnh nền">
        <div class="subs"></div>
      </div>
      <audio controls src="${audioSrc}"></audio>
    `;

    const audio = this.shadowRoot.querySelector('audio');
    const subDiv = this.shadowRoot.querySelector('.subs');

    // 🔹 Cập nhật phụ đề theo thời gian nhạc
    audio.ontimeupdate = () => {
      const t = audio.currentTime;
      const sub = subtitles.find(s => t >= s.start && t <= s.end);
      subDiv.innerHTML = sub ? sub.text : "";
    };
  }

  // 🔹 Đọc và phân tích file ASS
  async loadSubtitles(url) {
    const res = await fetch(url);
    const text = await res.text();
    const lines = text.split(/\r?\n/);
    const subs = [];

    for (const line of lines) {
      if (line.trim().startsWith("Dialogue:")) {
        const parts = line.split(",");
        if (parts.length > 9) {
          const start = this.timeToSeconds(parts[1]);
          const end = this.timeToSeconds(parts[2]);
          const content = parts.slice(9).join(",");
          const clean = content
            .replace(/{.*?}/g, "")  // bỏ tag định dạng {…}
            .replace(/\\N/g, "<br>") // xuống dòng
            .trim();
          subs.push({ start, end, text: clean });
        }
      }
    }
    return subs;
  }

  // 🔹 Chuyển thời gian "0:01:23.45" → giây
  timeToSeconds(time) {
    const [h, m, s] = time.split(":");
    return parseFloat(h) * 3600 + parseFloat(m) * 60 + parseFloat(s);
  }
}

// Đăng ký thẻ HTML mới: <fake-video>
customElements.define('fake-video', FakeVideo);
