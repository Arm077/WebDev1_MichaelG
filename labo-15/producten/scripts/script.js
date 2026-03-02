const setup = () => {
    let btn = document.getElementById("recalculate");
    btn.addEventListener("click", herbereken);
}

const herbereken = () => {
    let prijzen = document.getElementsByClassName("prijs");
    let aantallen = document.getElementsByClassName("aantal");
    let btws = document.getElementsByClassName("btw");
    let subtotalen = document.getElementsByClassName("subtotaal");
    let totaalVeld = document.getElementById("totaal");

    let totaalBedrag = 0;

    for (let i = 0; i < prijzen.length; i++) {
        // Gebruik parseFloat of parseInt om getallen uit de tekst te halen
        let prijs = parseFloat(prijzen[i].textContent);
        let aantal = parseFloat(aantallen[i].value);
        let btwTarief = parseFloat(btws[i].textContent) / 100;

        // Berekening: prijs * aantal inclusief BTW
        let sub = (prijs * aantal) * (1 + btwTarief);

        // Toon resultaat met 2 decimalen [cite: 191]
        subtotalen[i].textContent = sub.toFixed(2) + " Eur";
        totaalBedrag += sub;
    }

    totaalVeld.textContent = totaalBedrag.toFixed(2) + " Eur";
}

window.addEventListener("load", setup);