const setup = () => {
    let knoppen = document.getElementsByTagName("button");
    for (let i = 0; i < knoppen.length; i++) {
        knoppen[i].addEventListener("click", toggleKleur);
    }
}

const toggleKleur = (event) => {
    let knop = event.target;

    // Controleer de huidige kleur en wissel
    if (knop.style.backgroundColor === "blue") {
        knop.style.backgroundColor = "white";
    } else {
        knop.style.backgroundColor = "blue";
    }
}
window.addEventListener("load", setup);