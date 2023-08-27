const nav = document.querySelector("nav");
scrollHandler = () => {
    if (document.title == "Domov - Frizerski salon Maja") {
            const y = window.pageYOffset;
    if (y > 40) {
        nav.classList.add("scroll");
    } else {
        nav.classList.remove("scroll");
    }
    }

};

window.addEventListener("scroll", () => {
    scrollHandler();
});

document.querySelector(".header_video").load();

// prikazi/zapri dodatno okno, ko kliknes na gumb za naročanje
const rezerviraj_window = document.querySelector(".rezerviraj_window");
const rezerviraj_window_dim = document.querySelector(".rezerviraj_window_dim");
const btns_rezerviraj = document.querySelectorAll(".btn_rezerviraj");
for (let i = 0; i < btns_rezerviraj.length; i++) {
    btns_rezerviraj[i].addEventListener("click", () => {
        rezerviraj_window.classList.add("opened");
        rezerviraj_window_dim.classList.add("opened");
    })
}
document.querySelector(".close_window").addEventListener("click", () => {
    rezerviraj_window.classList.remove("opened");
    rezerviraj_window_dim.classList.remove("opened");
})

document.querySelector(".play").addEventListener("click", () => {
    toggleVideo();
})

const video = document.querySelector(".header_video");
let playing = false;
toggleVideo = () => {
    if (!playing) {
        video.classList.add("visible");
        setTimeout(playVideo, 500);
    }
    else {
        video.classList.remove("visible");
        setTimeout(pauseVideo, 1000);
    }
}

playVideo = () => {
    video.play();
    playing = true;
    video.addEventListener('ended', () => {
        videoEnded();
    })
}

pauseVideo = () => {
    video.pause();
    playing = false;
}

videoEnded = () => {
    toggleVideo();
}



