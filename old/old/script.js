"use strict"

const nav = document.querySelector("nav");

// Funkcija onemogoča nezaželene klike, mora preteči dovolj časa med dogodki za nadaljevanje (throttling).
// func - nadaljna funkcija
// delay - milisekunde
const throttleFunction = (func, delay, keepLastEvent) => {
    let timer;
    // Čas, ko je bila funkcija poklicana prejšnjič.
    let prev = 0;

    return () => {
        // Trenutni čas.
        let now = new Date().getTime();

        // Če je razlika med prejšnjim časom in trenutnim časom dovolj velika potem nadaljuj.
        if (now - prev > delay) {
            // "prev" nastavljen na trenutni čas, za naslednjič.
            prev = now;
            return func();
        }
        // Drugače, če je omogočen "keepLastEvent" potem nadaljuj po določenem času, če v tem času ni bila še enkrat poklicana ta funkcija.
        else if (keepLastEvent) {
            const newDelay = delay - (now - prev);
            timer = setTimeout(() => {
                return func();
            }, newDelay);
        }
    };
};

let scrollHandler;
let initializeImageChange;
let imageChangeLoading;
let imageChangeStart;

const landingPage = () => {
    if (document.querySelector("body").id === "landingPage") {

        const newWindow = document.querySelector("#newWindow");
        document.querySelector("#rezervirajTermin").addEventListener("click", () => {
            newWindow.classList.add("opened");
        });

        newWindow.addEventListener("click", (event) => {
            console.log(event.target)
            if ([...event.target.classList].indexOf("close") !== -1 || event.target.id === "newWindow") {
                newWindow.classList.remove("opened");
            }
        });



        console.log("in");
        // Doda class, ki spremeni "nav" glede na trenutni položaj spletne strani (scroll position)
        scrollHandler = () => {
            const y = window.pageYOffset;
            if (y > 40) {
                nav.classList.add("scroll");
            } else {
                nav.classList.remove("scroll");
            }
        };

        // Poslušalec dogodka za pomikanje z drsnikom.
        window.addEventListener("scroll", throttleFunction(() => {
            scrollHandler();
        }, 300, true));

        const images = [];
        images[0] = ["images/boy-side.png", "images/boy-front.png"];
        images[1] = ["images/man-back.png", "images/man-side.png"];
        images[2] = ["images/woman2-front.png", "images/woman2-back.png"];
        images[3] = ["images/girl-side.png", "images/girl-back.png"];

        const headerImgImg = document.querySelector(".headerImgImg");
        const headerImgSpinner = document.querySelector(".headerImgSpinner");

        let i = 3;
        let imageRotation = 0;
        let img = new Image;
        let imageTransition = "slide";
        let timeoutSlider;
        let timeoutChangeImg;

        initializeImageChange = (direction) => {

            clearTimeout(timeoutChangeImg);
            headerImgImg.classList.add("changing");
            setTimeout(() => {
                headerImgImg.classList.remove("changing");
            }, 1000);

            // Nastavi indeks za "images", vrsto tranzicije in rotacijo slike (indeks za notranji array).
            switch (direction) {
                case "forward":
                    i < images.length - 1 ? i++ : i = 0;
                    imageTransition = "slide";
                    break;
                case "back":
                    i === 0 ? i = images.length - 1 : i--;
                    imageTransition = "slide";
                    break;
                case "rotate":
                    imageRotation = imageRotation === 0 ? 1 : 0;
                    imageTransition = "rotate";
                    break;
                default:
                    i < images.length - 1 ? i++ : i = 0;
                    imageTransition = "slide";
            }

            img.src = images[i][imageRotation];

            // Če je slika že naložena v spominu preskoči nalaganje in začni spreminjati sliko,
            if (img.complete) {
                console.log("already")
                imageChangeStart(imageTransition);
            }

            // drugače začni nalagati sliko.
            else {
                imageChangeLoading(imageTransition);
            };
        };

        imageChangeLoading = (transition) => {
            // Za čas, ko se slika nalaga je dodan class, da uporabnik ve da se nekaj dogaja.
            headerImgImg.classList.add("loading");
            headerImgSpinner.classList.add("loading");

            // ko je mala slika naložena začni spreminjati sliko.
            img.onload = () => {
                imageChangeStart(transition);
            };
        };

        imageChangeStart = (transition) => {
            headerImgImg.classList.remove("loading");
            headerImgSpinner.classList.remove("loading");
            headerImgImg.classList.add(transition);
            img.onload = () => {
                console.log("start")
            };

            // Po določenem času iztočasno izbriši class in spremeni naloženo sliko.
            clearTimeout(timeoutChangeImg);
            timeoutChangeImg = setTimeout(() => {
                headerImgImg.classList.remove("slide");
                headerImgImg.classList.remove("rotate");
                if (img.complete) {
                    document.slide.src = img.src;
                } else {
                    document.slide.src = img.src;
                    headerImgSpinner.classList.add("loading");
                }
            }, 490);

            // Ponastavi časovnik, ki avtomatično pokliče "initializeImageChange" po določenem času.
            clearTimeout(timeoutSlider);
            timeoutSlider = setTimeout(() => initializeImageChange(), 10000);
        };

        // Doda poslušalca dogodkov na gumbe za upravljanje diaprojekcije.
        document.querySelector(".sliderOptions").addEventListener("click", (event) => {
            if ([...headerImgImg.classList].indexOf("changing") === -1) {
                switch (event.target.id) {
                    case "sliderBackwards":
                        initializeImageChange("back");
                        break;
                    case "rotateImage":
                        initializeImageChange("rotate");
                        break;
                    case "sliderForward":
                        initializeImageChange("forward");
                        break;
                    default: return;
                }
            };
        });

        scrollHandler();
        initializeImageChange();
    };
};

const scrollTo = (item) => {
    const scrollTo = document.querySelector("." + item);
    let num = 100;
    if (item === "frizerskiSalonMaja" || item === "cenik" || item === "MajaVidner" || item == "sectionWrapper") {
        num = 50;
    }
    window.scroll({
        top: scrollTo.offsetTop - num,
        behavior: "smooth"
    });
};

window.onload = () => {
    const item = sessionStorage.getItem("scrollTo");
    if (item !== null) {
        scrollTo(item);
    }
    sessionStorage.clear();
    landingPage();
    console.log("loaded");
};

// Odpiranje, zapiranje navigacije na manjših zaslonih
const handleHamburgerClick = () => {
    if ([...nav.classList].indexOf("active") !== -1) {
        nav.classList.remove("active");
    } else {
        nav.classList.add("active");
    }
};


// Klik na 3 črte v navigaciji
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", throttleFunction(() => {
    handleHamburgerClick();
}, 300));

document.querySelector(".readMore").addEventListener("click", () => {
    scrollTo("sectionWrapper");
});

document.querySelector(".footerLinks").addEventListener("click", (event) => {
    if (event.target.id) {
        sessionStorage.setItem("scrollTo", event.target.id);
    }
});