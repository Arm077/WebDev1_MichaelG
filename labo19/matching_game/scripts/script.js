// ─── Globale variabelen ───────────────────────────────────────────────────────
let global = {
    AANTAL_KAARTEN: 6,           // aantal verschillende kaarten
    AANTAL_GELIJKE_KAARTEN: 2,   // hoeveel gelijke kaarten per soort (2 = paren, 3 = trio's …)
    VERTRAGING: 1000,            // ms wachttijd na een foute poging

    omgedraaid: [],              // momenteel omgedraaide, nog niet gematchte kaarten (DOM-elementen)
    isBusy: false,               // blokkeert klikken tijdens de wachttijd
    aantalGevonden: 0,           // aantal reeds gevonden groepen
    aantalPogingen: 0,           // totaal aantal klikpogingen

    // De emoji/symbolen die op de kaartvoorkanten staan
    SYMBOLEN: ["🦊", "🐧", "🌸", "🍀", "⭐", "🎮"],
    KLEUREN:  ["kleur-0", "kleur-1", "kleur-2", "kleur-3", "kleur-4", "kleur-5"]
};

// ─── Web Audio API – geluidseffecten ─────────────────────────────────────────
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const speelToon = (frequentie, duur, type = "sine", volume = 0.3) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode   = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequentie, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duur);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duur);
};

const geluidsFlip = () => speelToon(440, 0.1, "square", 0.15);

const geluidsGoed = () => {
    speelToon(523, 0.12);
    setTimeout(() => speelToon(659, 0.12), 100);
    setTimeout(() => speelToon(784, 0.2), 200);
};

const geluidsFout = () => {
    speelToon(300, 0.08, "sawtooth", 0.2);
    setTimeout(() => speelToon(250, 0.15, "sawtooth", 0.2), 80);
};

const geluidsWin = () => {
    [523, 587, 659, 698, 784].forEach((freq, i) => {
        setTimeout(() => speelToon(freq, 0.25), i * 100);
    });
};

// ─── Optimale grid-layout berekening ─────────────────────────────────────────
// Vindt de beste (kolommen, rijen)-combinatie voor N kaarten
// zodat alle rijen even vol zijn én de verhouding zo dicht mogelijk bij de
// breedte/hoogte-verhouding van het venster ligt.
const berekenGrid = (aantalKaarten) => {
    const vensterVerhouding = window.innerWidth / window.innerHeight;

    let besteKolommen = aantalKaarten;
    let besteRijen    = 1;
    let besteScore    = Infinity;

    // Loop over alle delers van aantalKaarten
    for (let kolommen = 1; kolommen <= aantalKaarten; kolommen++) {
        if (aantalKaarten % kolommen !== 0) continue; // sla delers over die een rest geven

        const rijen      = aantalKaarten / kolommen;
        const verhouding = kolommen / rijen;
        const score      = Math.abs(verhouding - vensterVerhouding);

        if (score < besteScore) {
            besteScore    = score;
            besteKolommen = kolommen;
            besteRijen    = rijen;
        }
    }

    return { kolommen: besteKolommen, rijen: besteRijen };
};

// ─── Kaarten schudden (Fisher-Yates) ─────────────────────────────────────────
const schud = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// ─── Kaartdeck aanmaken ───────────────────────────────────────────────────────
const maakDeck = () => {
    const deck = [];
    for (let kaartId = 0; kaartId < global.AANTAL_KAARTEN; kaartId++) {
        for (let kopie = 0; kopie < global.AANTAL_GELIJKE_KAARTEN; kopie++) {
            deck.push(kaartId);
        }
    }
    return schud(deck);
};

// ─── Speelveld opbouwen ───────────────────────────────────────────────────────
const bouwSpeelveld = (deck) => {
    const speelveld = document.getElementById("speelveld");
    speelveld.innerHTML = "";

    const totaalKaarten = deck.length;
    const { kolommen, rijen } = berekenGrid(totaalKaarten);

    // Stel de CSS-grid in via JS
    speelveld.style.gridTemplateColumns = `repeat(${kolommen}, 100px)`;
    speelveld.style.gridTemplateRows    = `repeat(${rijen}, 100px)`;

    deck.forEach((kaartId, index) => {
        // Buitenste div: de kaart zelf
        const kaart = document.createElement("div");
        kaart.classList.add("kaart");
        kaart.dataset.kaartId = kaartId;

        // Binnenkant (voor de flip-animatie)
        const binnenkant = document.createElement("div");
        binnenkant.classList.add("kaart-binnenkant");

        // Achterkant
        const achterkant = document.createElement("div");
        achterkant.classList.add("kaart-achterkant");
        achterkant.textContent = "?";

        // Voorkant
        const voorkant = document.createElement("div");
        voorkant.classList.add("kaart-voorkant", global.KLEUREN[kaartId]);
        voorkant.textContent = global.SYMBOLEN[kaartId];

        binnenkant.appendChild(achterkant);
        binnenkant.appendChild(voorkant);
        kaart.appendChild(binnenkant);

        kaart.addEventListener("click", () => kaartGeklikt(kaart));
        speelveld.appendChild(kaart);
    });
};

// ─── Klik op een kaart ───────────────────────────────────────────────────────
const kaartGeklikt = (kaart) => {
    // Negeer klik als: spel bezig met wachten, kaart al omgedraaid of al gevonden
    if (global.isBusy) return;
    if (kaart.classList.contains("omgedraaid")) return;
    if (kaart.classList.contains("verwijderd")) return;

    // Maximaal AANTAL_GELIJKE_KAARTEN kaarten tegelijk omgedraaid
    if (global.omgedraaid.length >= global.AANTAL_GELIJKE_KAARTEN) return;

    // Draai de kaart om
    geluidsFlip();
    kaart.classList.add("omgedraaid");
    global.omgedraaid.push(kaart);
    global.aantalPogingen++;
    document.getElementById("aantalPogingen").innerText = global.aantalPogingen;

    // Controleer pas als het vereiste aantal omgedraaid is
    if (global.omgedraaid.length === global.AANTAL_GELIJKE_KAARTEN) {
        controleerMatch();
    }
};

// ─── Controleer of omgedraaide kaarten overeenkomen ──────────────────────────
const controleerMatch = () => {
    const eersteId = global.omgedraaid[0].dataset.kaartId;
    const alleGelijk = global.omgedraaid.every(k => k.dataset.kaartId === eersteId);

    if (alleGelijk) {
        // Goed! Verwijder kaarten na korte vertraging
        geluidsGoed();
        toonStatus("✔ Goed!", "goed");
        global.omgedraaid.forEach(k => k.classList.add("goed"));

        setTimeout(() => {
            global.omgedraaid.forEach(k => k.classList.add("verwijderd"));
            global.omgedraaid = [];
            global.aantalGevonden++;

            document.getElementById("aantalGevonden").innerText = global.aantalGevonden;
            toonStatus("", "");

            if (global.aantalGevonden === global.AANTAL_KAARTEN) {
                geluidsWin();
                toonStatus("🎉 Gefeliciteerd! Je hebt gewonnen!", "goed");
                document.getElementById("btnStart").innerText = "Opnieuw spelen";
            }
        }, global.VERTRAGING);
    } else {
        // Fout: draai terug na wachttijd
        geluidsFout();
        toonStatus("✘ Niet gelijk", "fout");
        global.omgedraaid.forEach(k => k.classList.add("fout"));
        global.isBusy = true;

        setTimeout(() => {
            global.omgedraaid.forEach(k => {
                k.classList.remove("omgedraaid", "fout");
            });
            global.omgedraaid = [];
            global.isBusy = false;
            toonStatus("", "");
        }, global.VERTRAGING);
    }
};

// ─── Statusbericht tonen ──────────────────────────────────────────────────────
const toonStatus = (tekst, klasse) => {
    const el = document.getElementById("statusBericht");
    el.textContent = tekst;
    el.className = klasse;
};

// ─── Spel (her)starten ────────────────────────────────────────────────────────
const startSpel = () => {
    global.omgedraaid    = [];
    global.isBusy        = false;
    global.aantalGevonden = 0;
    global.aantalPogingen = 0;

    const totaalKaarten = global.AANTAL_KAARTEN * global.AANTAL_GELIJKE_KAARTEN;
    document.getElementById("aantalGevonden").innerText = 0;
    document.getElementById("aantalTotaal").innerText   = global.AANTAL_KAARTEN;
    document.getElementById("aantalPogingen").innerText = 0;
    document.getElementById("btnStart").innerText       = "Herstart";
    toonStatus("", "");

    const deck = maakDeck();
    bouwSpeelveld(deck);
};

// ─── Setup ────────────────────────────────────────────────────────────────────
const setup = () => {
    document.getElementById("aantalTotaal").innerText = global.AANTAL_KAARTEN;
    document.getElementById("btnStart").addEventListener("click", startSpel);
};

window.addEventListener("load", setup);
