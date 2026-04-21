let huidigeR = 128;
let huidigeG = 128;
let huidigeB = 128;

const STORAGE_KEY = "webdev1.colorpickerpro.v1";

const byId = (id) => document.getElementById(id);
const clamp = (waarde) => Math.max(0, Math.min(255, Number(waarde)));

const naarHex = (getal) => {
    const hex = clamp(getal).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const updateLegeMeldingEnTeller = () => {
    const aantal = byId("bewaard-lijst").children.length;
    byId("lege-melding").style.display = aantal > 0 ? "none" : "block";
    byId("tel-badge").textContent = String(aantal);
};

const updateUI = () => {
    byId("sliderR").value = huidigeR;
    byId("sliderG").value = huidigeG;
    byId("sliderB").value = huidigeB;

    byId("waardR").textContent = String(huidigeR);
    byId("waardG").textContent = String(huidigeG);
    byId("waardB").textContent = String(huidigeB);

    byId("swatch").style.backgroundColor = `rgb(${huidigeR}, ${huidigeG}, ${huidigeB})`;
    byId("hex-waarde").textContent = (`#${naarHex(huidigeR)}${naarHex(huidigeG)}${naarHex(huidigeB)}`).toUpperCase();
};

const leesFavorietenUitDom = () => {
    const items = byId("bewaard-lijst").querySelectorAll(".bewaard-item");
    const favorieten = [];

    for (let i = 0; i < items.length; i++) {
        favorieten.push({
            r: Number(items[i].dataset.r),
            g: Number(items[i].dataset.g),
            b: Number(items[i].dataset.b)
        });
    }

    return favorieten;
};

const bewaarNaarStorage = () => {
    const data = {
        sliders: { r: huidigeR, g: huidigeG, b: huidigeB },
        favorieten: leesFavorietenUitDom()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const laadKleur = (event) => {
    const item = event.currentTarget.parentElement;
    huidigeR = clamp(item.dataset.r);
    huidigeG = clamp(item.dataset.g);
    huidigeB = clamp(item.dataset.b);

    updateUI();
    bewaarNaarStorage();
};

const verwijderKleur = (event) => {
    event.currentTarget.parentElement.remove();
    event.stopPropagation();

    updateLegeMeldingEnTeller();
    bewaarNaarStorage();
};

const voegFavorietToe = (r, g, b) => {
    const item = document.createElement("div");
    item.className = "bewaard-item";
    item.dataset.r = String(r);
    item.dataset.g = String(g);
    item.dataset.b = String(b);

    const kleur = document.createElement("div");
    kleur.className = "bewaard-swatch";
    kleur.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    kleur.addEventListener("click", laadKleur);

    const verwijderKnop = document.createElement("button");
    verwijderKnop.className = "bewaard-delete";
    verwijderKnop.textContent = "X";
    verwijderKnop.addEventListener("click", verwijderKleur);

    item.appendChild(kleur);
    item.appendChild(verwijderKnop);
    byId("bewaard-lijst").appendChild(item);

    updateLegeMeldingEnTeller();
};

const sliderVeranderd = (event) => {
    const waarde = clamp(event.currentTarget.value);

    if (event.currentTarget.id === "sliderR") huidigeR = waarde;
    if (event.currentTarget.id === "sliderG") huidigeG = waarde;
    if (event.currentTarget.id === "sliderB") huidigeB = waarde;

    updateUI();
    bewaarNaarStorage();
};

const slaKleurOp = () => {
    voegFavorietToe(huidigeR, huidigeG, huidigeB);
    bewaarNaarStorage();
};

const herstelVanStorage = () => {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (!jsonData) {
        updateUI();
        updateLegeMeldingEnTeller();
        return;
    }

    try {
        const data = JSON.parse(jsonData);

        if (data.sliders) {
            huidigeR = clamp(data.sliders.r);
            huidigeG = clamp(data.sliders.g);
            huidigeB = clamp(data.sliders.b);
        }

        byId("bewaard-lijst").innerHTML = "";

        if (Array.isArray(data.favorieten)) {
            for (let i = 0; i < data.favorieten.length; i++) {
                voegFavorietToe(
                    clamp(data.favorieten[i].r),
                    clamp(data.favorieten[i].g),
                    clamp(data.favorieten[i].b)
                );
            }
        }
    } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
    }

    updateUI();
    updateLegeMeldingEnTeller();
};

const setup = () => {
    byId("sliderR").addEventListener("input", sliderVeranderd);
    byId("sliderG").addEventListener("input", sliderVeranderd);
    byId("sliderB").addEventListener("input", sliderVeranderd);
    byId("btnSave").addEventListener("click", slaKleurOp);

    herstelVanStorage();
};

window.addEventListener("load", setup);