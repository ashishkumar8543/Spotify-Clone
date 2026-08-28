const songs = [
  {
    title: "Sample Song 1",
    artist: "Artist A",
    cover: "https://picsum.photos/id/10/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Sample Song 2",
    artist: "Artist B",
    cover: "https://picsum.photos/id/20/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Sample Song 3",
    artist: "Artist C",
    cover: "https://picsum.photos/id/30/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

let currentIndex = 0;
const audio = new Audio();

const songListContainer = document.getElementById("songList");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const currentCover = document.getElementById("currentCover");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Render songs list
songs.forEach((song, index) => {
  const card = document.createElement("div");
  card.classList.add("song-card");
  card.innerHTML = `
    <div class="song-info">
      <img src="${song.cover}" alt="${song.title}">
      <div>
        <div class="track-title">${song.title}</div>
        <div class="track-artist">${song.artist}</div>
      </div>
    </div>
    <i class="fa-solid fa-play"></i>
  `;
  card.addEventListener("click", () => playSong(index));
  songListContainer.appendChild(card);
});

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  currentTitle.textContent = song.title;
  currentArtist.textContent = song.artist;
  currentCover.src = song.cover;
}

function playSong(index) {
  if (index !== undefined) {
    currentIndex = index;
    loadSong(currentIndex);
  }
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}

playBtn.addEventListener("click", () => {
  if (!audio.src) {
    loadSong(0);
  }
  audio.paused ? playSong() : pauseSong();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progressBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

volumeBar.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}