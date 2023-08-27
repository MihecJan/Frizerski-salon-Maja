"use strict"

let btnOpen;
let btnClose;
let kontaktOkno;
let kontaktOknoDim;

window.addEventListener("DOMContentLoaded", () => {
    btnOpen = document.querySelectorAll(".open");
    btnClose = document.querySelector(".kontaktOkno .close");

    kontaktOkno = document.querySelector(".kontaktOkno");
    kontaktOknoDim = document.querySelector(".kontaktOknoDim");

    if (btnOpen) {
        for (let i = 0; i < btnOpen.length; i++) {
            btnOpen[i].addEventListener("click", () => openKontaktOkno());
        }
    }
    
    if (btnClose) {
        btnClose.addEventListener("click", () => closeKontaktOkno());
    }
    
    window.addEventListener("hashchange", () => scrollHandler());
});

const scrollHandler = () => {
    window.scrollTo(window.scrollX, window.scrollY - 100);
    console.log("croll")
}

const openKontaktOkno = () => {
    kontaktOkno.classList.add("show");
    kontaktOknoDim.classList.add("show");
}

const closeKontaktOkno = () => {
    kontaktOkno.classList.remove("show");
    kontaktOknoDim.classList.remove("show");
}
