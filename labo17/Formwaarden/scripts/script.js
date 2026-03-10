const toonResultaat = () => {
    // 1.  roker
    const isRoker = document.getElementById("isRoker");
    if (isRoker.checked) {
        console.log("is roker");
    } else {
        console.log("is geen roker");
    }

    // 2. Moedertaal
    const talen = document.getElementsByName("moedertaal");
    let geselecteerdeTaal = "";
    for (let i = 0; i < talen.length; i++) {
        if (talen[i].checked) {
            geselecteerdeTaal = talen[i].value;
        }
    }
    console.log("moedertaal is " + geselecteerdeTaal);

    // 3
    const buurlandSelect = document.getElementById("buurland");
    const geselecteerdBuurland = buurlandSelect.options[buurlandSelect.selectedIndex].value;
    console.log("favoriete buurland is " + geselecteerdBuurland);

    // 4. Bestelling
    const bestellingSelect = document.getElementById("bestelling");
    let bestellingTekst = "bestelling bestaat uit";

    // alle options in de multiple select
    for (let i = 0; i < bestellingSelect.options.length; i++) {
        if (bestellingSelect.options[i].selected) {
            bestellingTekst += " " + bestellingSelect.options[i].value;
        }
    }
    console.log(bestellingTekst);
};

const setup = () => {
    const btn = document.getElementById("btnToonResultaat");
    btn.addEventListener("click", toonResultaat);
};

window.addEventListener("load", setup);