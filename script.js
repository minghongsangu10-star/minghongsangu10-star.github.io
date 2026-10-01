document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const progressBar = document.getElementById("progressBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const volumeSlider = document.getElementById("volumeSlider");
  const muteBtn = document.getElementById("muteBtn");
  const volIcon = document.getElementById("volIcon");
  const muteIcon = document.getElementById("muteIcon");
  const loopBtn = document.getElementById("loopBtn");

  // 時間のフォーマット化 (秒 -> MM:SS)
  function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  // メタデータ読み込み時
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  // 再生・一時停止の切り替え
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    } else {
      audio.pause();
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
    }
  });

  // プログレスバーの更新
  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.value = pct;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  // プログレスバーのシーク操作
  progressBar.addEventListener("input", (e) => {
    if (!isNaN(audio.duration)) {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    }
  });

  // 音量調整
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = parseFloat(e.target.value);
    audio.muted = audio.volume === 0;
    updateMuteState();
  });

  // 消音 (ミュート) 切り替え
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    updateMuteState();
  });

  function updateMuteState() {
    if (audio.muted || audio.volume === 0) {
      volIcon.classList.add("hidden");
      muteIcon.classList.remove("hidden");
    } else {
      volIcon.classList.remove("hidden");
      muteIcon.classList.add("hidden");
    }
  }

  // リピート切り替え
  loopBtn.addEventListener("click", () => {
    audio.loop = !audio.loop;
    loopBtn.classList.toggle("text-amber-400", audio.loop);
    loopBtn.classList.toggle("text-slate-400", !audio.loop);
  });

  // 曲終了時
  audio.addEventListener("ended", () => {
    if (!audio.loop) {
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
      progressBar.value = 0;
      currentTimeEl.textContent = "00:00";
    }
  });
});
