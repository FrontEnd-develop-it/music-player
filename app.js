const playerImg = document.querySelector('.player__img img');
const playPause = document.querySelector('.track_play img');
const author = document.querySelector('.track-detail_author');
const songName = document.querySelector('.track-detail_name');
const previousSongBtn = document.querySelector('.previous-song');
const nextSongBtn = document.querySelector('.next-song');
const progress = document.querySelector('input[type="range"]');
const currentTime = document.querySelector('.current-time');
const musicTime = document.querySelector('.music-time');
const audio = document.querySelector('audio');

const tracks = [
   {src: "./music/lost-in-city-lights-145038.mp3", title: "Lost in the City Lights", author: "Cosmo Sheldrake", img: "./img/cover-1.png", duration: "1:12"},
   {src: "./music/forest-lullaby-110624.mp3", title: "Forest Lullaby", author: "Lesfm", img: "./img/cover-2.png", duration: "2:18"}
];

let currentIndexSong = 0;

function songPlay(songIndex) {
    const currentSong = tracks[songIndex]
    audio.src = currentSong.src;
    songName.textContent = currentSong.title;
    author.textContent = currentSong.author;
    playerImg.src = currentSong.img;
    musicTime.textContent = currentSong.duration;
    audio.load();
}

playPause.addEventListener('click', () => {
    if (audio.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
})

nextSongBtn.addEventListener('click', () => {
    currentIndexSong = (currentIndexSong + 1) % tracks.length;
    songPlay(currentIndexSong);
    playAudio();
})

previousSongBtn.addEventListener('click', () => {
    currentIndexSong = (currentIndexSong - 1 + tracks.length) % tracks.length;
    songPlay(currentIndexSong);
    playAudio();
});

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

audio.addEventListener('timeupdate', () => {
    const progressBar = (audio.currentTime / audio.duration) * 100;
    progress.value = progressBar || 0;

    progress.style.setProperty('--progress-width', `${progressBar}%`);

    currentTime.textContent = time(audio.currentTime);
})

function time(seconds) {
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);

    return `${minute}:${second < 10 ? '0' : ''}${second}`;
}

progress.addEventListener('input', (e) => {
    const time = (e.target.value / 100) * audio.duration;
    audio.currentTime = time;
});

songPlay(currentIndexSong);