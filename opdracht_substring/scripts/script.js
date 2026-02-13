const setup = () => {
    let btnSubstring = document.getElementById("btnSubstring");
    btnSubstring.addEventListener("click", toonSubstring);
}

const toonSubstring = () => {
    let tekst = document.getElementById("txtInput").value;
    let begin = parseInt(document.getElementById("txtBegin").value, 10);
    let einde = parseInt(document.getElementById("txtEinde").value, 10);
    let output = document.getElementById("txtOutput");

    output.innerHTML = "= " + tekst.substring(begin, einde); [cite: 350, 351]
}

window.addEventListener("load", setup);