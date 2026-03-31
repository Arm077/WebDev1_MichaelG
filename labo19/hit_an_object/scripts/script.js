let global = {
    IMAGE_COUNT: 5,               // aantal figuren (0.png t.e.m. 4.png)
    IMAGE_SIZE: 48,               // grootte van de figuur in pixels
    IMAGE_PATH_PREFIX: "images/", // map van de figuren
    IMAGE_PATH_SUFFIX: ".png",    // extensie van de figuren
    MOVE_DELAY: 3000,             // aantal ms voor een nieuwe afbeelding verschijnt
    BOMB_INDEX: 4,                // index van de bom-afbeelding
    score: 0,                     // aantal hits
    timeoutId: 0,                 // id van de timeout timer, zodat we kunnen annuleren
    huidigIndex: -1,              // index van de momenteel getoonde afbeelding
    spelBezig: false              // is het spel actief?
};

// Geeft een willekeurig geheel getal terug in [min, max[
const willekeurigGetal = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
};

// Verplaatst het target naar een willekeurige positie in het speelveld
const verplaatsTarget = () => {
    const playField = document.getElementById("playField");
    const target = document.getElementById("target");

    const maxX = playField.offsetWidth - global.IMAGE_SIZE;
    const maxY = playField.offsetHeight - global.IMAGE_SIZE;

    target.style.left = willekeurigGetal(0, maxX) + "px";
    target.style.top  = willekeurigGetal(0, maxY) + "px";
};

// Kiest een willekeurige afbeelding en toont ze op een nieuwe positie
const toonNieuweAfbeelding = () => {
    const target = document.getElementById("target");

    // Sla de index op in global zodat we betrouwbaar kunnen controleren of het een bom is
    global.huidigIndex = willekeurigGetal(0, global.IMAGE_COUNT);
    target.src = global.IMAGE_PATH_PREFIX + global.huidigIndex + global.IMAGE_PATH_SUFFIX;

    verplaatsTarget();
    target.classList.remove("verborgen");

    // Plan de volgende wissel
    global.timeoutId = setTimeout(toonNieuweAfbeelding, global.MOVE_DELAY);
};

// Verwerkt een klik op het target
const verwerkKlik = () => {
    if (!global.spelBezig) return;

    if (global.huidigIndex === global.BOMB_INDEX) {
        // Bom aangeklikt → spel afgelopen
        stopSpel();
    } else {
        // Gewone figuur → punt toekenden en meteen een nieuwe afbeelding tonen
        global.score++;
        document.getElementById("score").innerText = global.score;

        clearTimeout(global.timeoutId);
        toonNieuweAfbeelding();
    }
};

// Start (of herstart) het spel
const startSpel = () => {
    global.score = 0;
    global.spelBezig = true;

    document.getElementById("score").innerText = 0;
    document.getElementById("gameOver").classList.add("verborgen");
    document.getElementById("btnStart").innerText = "Herstart";

    clearTimeout(global.timeoutId);
    toonNieuweAfbeelding();
};

// Stopt het spel na een bom
const stopSpel = () => {
    global.spelBezig = false;
    clearTimeout(global.timeoutId);

    document.getElementById("target").classList.add("verborgen");
    document.getElementById("eindScore").innerText = global.score;
    document.getElementById("gameOver").classList.remove("verborgen");
    document.getElementById("btnStart").innerText = "Opnieuw spelen";
};

const setup = () => {
    document.getElementById("btnStart").addEventListener("click", startSpel);
    document.getElementById("target").addEventListener("click", verwerkKlik);
};

window.addEventListener("load", setup);
