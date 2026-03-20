let huidigeR = 128;
let huidigeG = 128;
let huidigeB = 128;

const naarHex = (getal) => {
    let hex = getal.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const bouwHexString = (r, g, b) => {
    return "#" + naarHex(r) + naarHex(g) + naarHex(b);
};

const bouwRgbString = (r, g, b) => {
    return "rgb(" + r + ", " + g + ", " + b + ")";
};

const updateSwatch = () => {
    let swatch = document.getElementById("swatch");
    let hexLabel = document.getElementById("hex-waarde");
    let kleur = bouwRgbString(huidigeR, huidigeG, huidigeB);

    swatch.style.backgroundColor = kleur;
    hexLabel.textContent = bouwHexString(huidigeR, huidigeG, huidigeB).toUpperCase();
};

const sliderVeranderd = (event) => {
    let slider = event.currentTarget;
    let waarde = parseInt(slider.value);

    if (slider.id === "sliderR") {
        huidigeR = waarde;
        document.getElementById("waardR").textContent = waarde;
    } else if (slider.id === "sliderG") {
        huidigeG = waarde;
        document.getElementById("waardG").textContent = waarde;
    } else if (slider.id === "sliderB") {
        huidigeB = waarde;
        document.getElementById("waardB").textContent = waarde;
    }

    updateSwatch();
};

const slaKleurOp = () => {
    let r = huidigeR;
    let g = huidigeG;
    let b = huidigeB;
    let hexString = bouwHexString(r, g, b).toUpperCase();

    let item = document.createElement("div");
    item.className = "bewaard-item";
    item.setAttribute("data-r", r);
    item.setAttribute("data-g", g);
    item.setAttribute("data-b", b);
    item.setAttribute("data-hex", hexString);

    let bewaarSwatch = document.createElement("div");
    bewaarSwatch.className = "bewaard-swatch";
    bewaarSwatch.style.backgroundColor = bouwRgbString(r, g, b);
    bewaarSwatch.addEventListener("click", laadKleur);

    let deleteKnop = document.createElement("button");
    deleteKnop.className = "bewaard-delete";
    deleteKnop.textContent = "X";
    deleteKnop.addEventListener("click", verwijderKleur);

    item.appendChild(bewaarSwatch);
    item.appendChild(deleteKnop);

    let lijst = document.getElementById("bewaard-lijst");
    lijst.appendChild(item);

    updateLegeMelding();
    updateTelBadge();
};

const laadKleur = (event) => {
    let swatch = event.currentTarget;
    let parent = swatch.parentNode;

    let r = parseInt(parent.getAttribute("data-r"));
    let g = parseInt(parent.getAttribute("data-g"));
    let b = parseInt(parent.getAttribute("data-b"));

    document.getElementById("sliderR").value = r;
    document.getElementById("sliderG").value = g;
    document.getElementById("sliderB").value = b;

    document.getElementById("waardR").textContent = r;
    document.getElementById("waardG").textContent = g;
    document.getElementById("waardB").textContent = b;

    huidigeR = r;
    huidigeG = g;
    huidigeB = b;

    updateSwatch();
};

const verwijderKleur = (event) => {
    let deleteKnop = event.currentTarget;
    let item = deleteKnop.parentNode;
    let lijst = item.parentNode;

    lijst.removeChild(item);
    event.stopPropagation();

    updateLegeMelding();
    updateTelBadge();
};

const updateLegeMelding = () => {
    let lijst = document.getElementById("bewaard-lijst");
    let melding = document.getElementById("lege-melding");
    melding.style.display = lijst.children.length > 0 ? "none" : "block";
};

const updateTelBadge = () => {
    let lijst = document.getElementById("bewaard-lijst");
    let badge = document.getElementById("tel-badge");
    badge.textContent = lijst.children.length;
};

const setup = () => {
    document.getElementById("sliderR").addEventListener("input", sliderVeranderd);
    document.getElementById("sliderG").addEventListener("input", sliderVeranderd);
    document.getElementById("sliderB").addEventListener("input", sliderVeranderd);
    document.getElementById("btnSave").addEventListener("click", slaKleurOp);

    updateSwatch();
};

window.addEventListener("load", setup);