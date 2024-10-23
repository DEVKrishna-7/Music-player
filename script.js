const songs = [
    {
        id: 1,
        title: "Energetic Rhythm",
        artist: "SoundHelix",
        image: "image/music.jpg",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Mellow Tune",
        artist: "SoundHelix",
        image: "image/music.jpg",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Upbeat Groove",
        artist: "SoundHelix",
        image: "image/music.jpg",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

const musicCards = document.getElementById('musicCards');
let currentAudio = null;

function createMusicCard(song) {
    const card = document.createElement('div');
    card.className = 'music-card';
    card.innerHTML = `
        <img src="${song.image}" alt="${song.title}">
        <div class="music-info">
            <h2>${song.title}</h2>
            <p>${song.artist}</p>
            <div class="controls">
                <button class="play-pause" data-id="${song.id}">▶</button>
                <span class="time">0:00 / 0:00</span>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
    `;
    return card;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function setupAudioPlayer(song, card) {
    const audio = new Audio(song.audioSrc);
    const playPauseBtn = card.querySelector('.play-pause');
    const progressBar = card.querySelector('.progress');
    const timeDisplay = card.querySelector('.time');

    playPauseBtn.addEventListener('click', () => {
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            document.querySelector(`[data-id="${currentAudio.dataset.id}"]`).textContent = '▶';
        }

        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸';
            currentAudio = audio;
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶';
        progressBar.style.width = '0%';
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    audio.dataset.id = song.id;
}

songs.forEach(song => {
    const card = createMusicCard(song);
    musicCards.appendChild(card);
    setupAudioPlayer(song, card);
});