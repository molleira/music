import { barbara, waters } from "./tracks.js";

const audio = document.getElementById("audio");
const marquee = document.querySelectorAll(".marquee-text");
const title = document.querySelector(".title");
const info = document.querySelector(".info");
const cover = document.getElementById("cover");

let songIndex = 0;
let currentAlbum = waters;
loadSong(currentAlbum[songIndex]);

// Set track details
function loadSong(song) {
  audio.src = `${song.src}`;
  marquee.forEach(
    (title) => (title.innerText = `${song.artist} - ${song.name}`)
  );
  title.innerText = `${song.artist} - ${song.name}`;
  info.innerText = song.info;
  cover.src = `${song.cover}`;
}

// Play track
const player = document.getElementById("player");
const playBtn = document.getElementById("play");

function playSong() {
  player.classList.add("play");
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");

  audio.play();
}

// Pause track
function pauseSong() {
  player.classList.remove("play");
  playBtn.classList.add("fa-play");
  playBtn.classList.remove("fa-pause");

  audio.pause();
}

// Previous track
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = currentAlbum.length - 1;
  }
  loadSong(currentAlbum[songIndex]);

  playSong();
}

// Next track
function nextSong() {
  songIndex++;

  if (songIndex > currentAlbum.length - 1) {
    songIndex = 0;
  }
  loadSong(currentAlbum[songIndex]);

  playSong();
}

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth / 2; // because width is 50%
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change track
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Click on progress bar
player.addEventListener("click", setProgress);

// Track ends
audio.addEventListener("ended", nextSong);

// Handle album selection
const album1Btn = document.getElementById("album1-btn");
const album2Btn = document.getElementById("album2-btn");

album1Btn.addEventListener("click", () => {
  currentAlbum = waters; // Set album1 as the current album
  songIndex = 0; // Reset track to the first song
  loadSong(currentAlbum[songIndex]); // Load the first song of the album
  album1Btn.classList.add("active");
  album2Btn.classList.remove("active");
});

album2Btn.addEventListener("click", () => {
  currentAlbum = barbara; // Set album2 as the current album
  songIndex = 0; // Reset track to the first song
  loadSong(currentAlbum[songIndex]); // Load the first song of the album
  album2Btn.classList.add("active");
  album1Btn.classList.remove("active");
});
