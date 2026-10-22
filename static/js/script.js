
// =============================================
// BIRTHDAY WEBSITE - FOR LUQMAN
// =============================================


// =============================================
// 1. SCROLL REVEAL ANIMATION
// =============================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }

    );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


// =============================================
// 2. SECRET ENDING MESSAGE
// =============================================

const revealButton = document.getElementById(
    "revealButton"
);

const secretMessage = document.getElementById(
    "secretMessage"
);

if (revealButton && secretMessage) {

    revealButton.addEventListener("click", () => {

        secretMessage.hidden = false;

        revealButton.setAttribute(
            "aria-expanded",
            "true"
        );

        revealButton.style.display = "none";

        secretMessage.scrollIntoView({

            behavior: "smooth",
            block: "nearest"

        });

    });

}


// =============================================
// 3. SMOOTH NAVIGATION
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(

    (link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    }

);


// =============================================
// 4. MUSIC PLAYER VARIABLES
// =============================================

const audio = document.getElementById(
    "backgroundMusic"
);

const musicToggle = document.getElementById(
    "musicToggle"
);

const musicIcon = document.getElementById(
    "musicIcon"
);

const musicStatus = document.getElementById(
    "musicStatus"
);

const songButtons = Array.from(
    document.querySelectorAll(".playlist-play")
);

const openLetterButton = document.getElementById(
    "openLetterButton"
);


// =============================================
// 5. MUSIC PLAYER SETTINGS
// =============================================

let currentSongIndex = -1;

let playRequestId = 0;

// Volume awal 45%
audio.volume = 0.45;


// =============================================
// 6. UPDATE BUTTON APPEARANCE
// =============================================

function updateMusicButtons() {

    const isPlaying = !audio.paused;

    // Floating music button
    musicToggle.classList.toggle(
        "playing",
        isPlaying
    );

    musicIcon.textContent = isPlaying
        ? "Ⅱ"
        : "♫";

    musicStatus.textContent = isPlaying
        ? "PAUSE MUSIC"
        : "PLAY MUSIC";

    musicToggle.setAttribute(
        "aria-label",
        isPlaying ? "Pause music" : "Play music"
    );


    // Playlist buttons
    songButtons.forEach((button, index) => {

        const icon = button.querySelector(
            ".playlist-play-icon"
        );

        const isCurrentSong = (
            index === currentSongIndex
        );

        const buttonIsPlaying = (
            isCurrentSong && isPlaying
        );

        icon.textContent = buttonIsPlaying
            ? "Ⅱ"
            : "▶";

        button.setAttribute(
            "aria-label",
            (
                buttonIsPlaying ? "Pause " : "Play "
            ) + button.dataset.title
        );

        button.classList.toggle(
            "active",
            buttonIsPlaying
        );

        const songItem = button.closest(".song-item");

        if (songItem) {

            songItem.classList.toggle(
                "is-playing",
                buttonIsPlaying
            );

        }

    });

}


// =============================================
// 7. PLAY SELECTED SONG
// =============================================

async function playSong(index) {

    if (
        index < 0 ||
        index >= songButtons.length
    ) {
        return;
    }

    const button = songButtons[index];

    const selectedSource = button.dataset.src;

    const requestId = ++playRequestId;

    // Kalau memilih lagu yang berbeda
    if (currentSongIndex !== index) {

        audio.pause();

        audio.src = selectedSource;

        audio.load();

        currentSongIndex = index;

    }

    updateMusicButtons();

    try {

        await audio.play();

    } catch (error) {

        // Abaikan error ketika request lagu lama
        // dibatalkan karena user memilih lagu baru.
        if (requestId === playRequestId) {

            console.error(
                "Unable to play song:",
                error
            );

        }

    }

    updateMusicButtons();

}


// =============================================
// 8. PAUSE MUSIC
// =============================================

function pauseMusic() {

    ++playRequestId;

    audio.pause();

    updateMusicButtons();

}


// =============================================
// 9. PLAY / PAUSE SELECTED SONG
// =============================================

function toggleSong(index) {

    // Kalau lagu yang sama sedang diputar
    if (
        currentSongIndex === index &&
        !audio.paused
    ) {

        pauseMusic();

    } else {

        playSong(index);

    }

}


// =============================================
// 10. PLAYLIST BUTTON EVENTS
// =============================================

songButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        toggleSong(index);

    });

});


// =============================================
// 11. FLOATING MUSIC BUTTON
// =============================================

if (musicToggle) {

    musicToggle.addEventListener("click", () => {

        // Kalau sedang diputar, pause
        if (!audio.paused) {

            pauseMusic();

            return;

        }

        // Kalau sebelumnya sudah memilih lagu
        if (currentSongIndex >= 0) {

            playSong(currentSongIndex);

        } else if (songButtons.length > 0) {

            // Default lagu pertama
            playSong(0);

        }

    });

}


// =============================================
// 12. START MUSIC WHEN LETTER OPENS
// =============================================

if (openLetterButton) {

    openLetterButton.addEventListener("click", () => {

        // Musik hanya dimulai otomatis
        // jika belum pernah memilih lagu
        if (
            currentSongIndex === -1 &&
            songButtons.length > 0
        ) {

            playSong(0);

        }

    });

}


// =============================================
// 13. AUTOMATIC NEXT SONG
// =============================================

audio.addEventListener("ended", () => {

    if (songButtons.length === 0) {
        return;
    }

    const nextIndex = (
        currentSongIndex + 1
    ) % songButtons.length;

    playSong(nextIndex);

});


// =============================================
// 14. AUDIO ERROR HANDLING
// =============================================

audio.addEventListener("error", () => {

    if (!audio.error) return;

    console.error(
        "Audio loading error:",
        audio.error.message
    );

    updateMusicButtons();

});


// =============================================
// 15. KEEP BUTTONS SYNCHRONIZED
// =============================================

audio.addEventListener(
    "play",
    updateMusicButtons
);

audio.addEventListener(
    "pause",
    updateMusicButtons
);

audio.addEventListener(
    "loadedmetadata",
    updateMusicButtons
);


// =============================================
// 16. INITIALIZE PLAYER
// =============================================

updateMusicButtons();

console.log(
    "Birthday music player initialized."
);

console.log(
    "Total songs:",
    songButtons.length
);
