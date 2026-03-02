const setup = () => {
    let btnKopieer = document.getElementById("btnKopieer");
    btnKopieer.addEventListener("click", kopieer);
}

const kopieer = () => {
    let txtInput = document.getElementById("txtInput");
    let txtOutput = document.getElementById("txtOutput");

    // Pak de tekst uit het veld en zet het in de paragraaf
    let tekst = txtInput.value;
    txtOutput.innerHTML = tekst;
}

window.addEventListener("load", setup);