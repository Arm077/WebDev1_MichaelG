const setup = () => {
    const paragrafen = document.querySelectorAll("p");
    if (paragrafen.length > 0) {
        paragrafen[0].textContent = "Goed gedaan!";
    }
};

window.addEventListener("load", setup);