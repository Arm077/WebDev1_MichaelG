const voegParagraafToe = () => {
    const div = document.getElementById("myDIV");

    const nieuweP = document.createElement("p");
    const tekst = document.createTextNode("Dit is een nieuwe paragraaf!");

    nieuweP.appendChild(tekst);
    div.appendChild(nieuweP);
};

const setup = () => {
    const btn = document.getElementById("btnVoegToe");
    btn.addEventListener("click", voegParagraafToe);
};

window.addEventListener("load", setup);