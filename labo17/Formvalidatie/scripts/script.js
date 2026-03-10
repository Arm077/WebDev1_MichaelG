
const isGetal = (tekst) => {
    return !isNaN(tekst);
};

const valideer = () => {
    let allesGeldig = true;

    // Naam
    const voornaamVeld = document.getElementById("voornaam");
    const errVoornaam = document.getElementById("err-voornaam");
    const voornaam = voornaamVeld.value.trim();

    if (voornaam.length > 30) {
        toonFout(voornaamVeld, errVoornaam, "max. 30 karakters");
        allesGeldig = false;
    } else {
        wisFout(voornaamVeld, errVoornaam);
    }

    //familie
    const familieVeld = document.getElementById("familienaam");
    const errFamilie = document.getElementById("err-familienaam");
    const familienaam = familieVeld.value.trim();

    if (familienaam === "") {
        toonFout(familieVeld, errFamilie, "verplicht veld");
        allesGeldig = false;
    } else if (familienaam.length > 50) {
        toonFout(familieVeld, errFamilie, "max 50 karakters");
        allesGeldig = false;
    } else {
        wisFout(familieVeld, errFamilie);
    }

    // geboorte
    const datumVeld = document.getElementById("geboortedatum");
    const errDatum = document.getElementById("err-geboortedatum");
    const datum = datumVeld.value.trim();

    if (datum === "") {
        toonFout(datumVeld, errDatum, "verplicht veld");
        allesGeldig = false;
    } else if (datum.length !== 10 || datum.charAt(4) !== '-' || datum.charAt(7) !== '-') {
        toonFout(datumVeld, errDatum, "formaat is niet jjjj-mm-dd");
        allesGeldig = false;
    } else {
        // delen effectief getallen zijn?
        let jaar = datum.slice(0, 4);
        let maand = datum.slice(5, 7);
        let dag = datum.slice(8, 10);

        if (!isGetal(jaar) || !isGetal(maand) || !isGetal(dag) ||
            parseInt(maand) < 1 || parseInt(dag) < 1) {
            toonFout(datumVeld, errDatum, "formaat is niet jjjj-mm-dd");
            allesGeldig = false;
        } else {
            wisFout(datumVeld, errDatum);
        }
    }

    // email
    const emailVeld = document.getElementById("email");
    const errEmail = document.getElementById("err-email");
    const email = emailVeld.value.trim();

    if (email === "") {
        toonFout(emailVeld, errEmail, "verplicht veld");
        allesGeldig = false;
    } else {
        let eersteApenstaart = email.indexOf('@');
        let laatsteApenstaart = email.lastIndexOf('@');

        // Er mag maar 1 @ zijn, en we hebben minstens 1 karakter voor en na nodig
        if (eersteApenstaart === -1 || eersteApenstaart !== laatsteApenstaart ||
            eersteApenstaart < 1 || eersteApenstaart > email.length - 2) {
            toonFout(emailVeld, errEmail, "geen geldig email adres");
            allesGeldig = false;
        } else {
            wisFout(emailVeld, errEmail);
        }
    }

    //kinderen
    const kinderenVeld = document.getElementById("kinderen");
    const errKinderen = document.getElementById("err-kinderen");
    const kinderen = kinderenVeld.value.trim();

    if (kinderen === "" || !isGetal(kinderen) || parseInt(kinderen) < 0) {
        toonFout(kinderenVeld, errKinderen, "is geen positief getal");
        allesGeldig = false;
    } else if (parseInt(kinderen) >= 99) {
        toonFout(kinderenVeld, errKinderen, "is te vruchtbaar");
        allesGeldig = false;
    } else {
        wisFout(kinderenVeld, errKinderen);
    }

    // controle
    if (allesGeldig) {
        window.alert("proficiat!");
    }
};

// toepassen fouten
const toonFout = (veld, span, melding) => {
    veld.className = "error-field";
    span.innerHTML = melding;
};

// fouten netjes te verwijderen bij correcte input
const wisFout = (veld, span) => {
    veld.className = "";
    span.innerHTML = "";
};

const setup = () => {
    const btn = document.getElementById("btnValideer");
    btn.addEventListener("click", valideer);
};

window.addEventListener("load", setup);