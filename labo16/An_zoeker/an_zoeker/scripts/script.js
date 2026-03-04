const telSequentie = () => {
    const zin = "De man van An geeft geen hand aan ambetante verwanten";
    const tekst = zin.toLowerCase();
    const zoekterm = "an";

    let tellerIndex = 0;
    let indexPos = tekst.indexOf(zoekterm);

    while (indexPos !== -1) {
        tellerIndex++;
        indexPos = tekst.indexOf(zoekterm, indexPos + 1);
    }

    let tellerLast = 0;
    let lastPos = tekst.lastIndexOf(zoekterm);

    while (lastPos !== -1) {
        tellerLast++;
        lastPos = tekst.lastIndexOf(zoekterm, lastPos - 1);
    }

    document.getElementById('countIndex').innerText = tellerIndex;
    document.getElementById('countLast').innerText = tellerLast;

    console.log("Gevonden met indexOf: " + tellerIndex);
    console.log("Gevonden met lastIndexOf: " + tellerLast);
};

window.addEventListener('load', telSequentie);