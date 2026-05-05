const STORAGE_KEY = "webdev1.labo22.startpage.v1";

const COMMANDS = {
    g: {
        title: "Google",
        color: "#4285F4",
        textColor: "#ffffff",
        buildUrl: (zoekterm) => `https://www.google.com/search?q=${encodeQuery(zoekterm)}`
    },
    y: {
        title: "Youtube",
        color: "#FF0000",
        textColor: "#ffffff",
        buildUrl: (zoekterm) => `https://www.youtube.com/results?search_query=${encodeQuery(zoekterm)}`
    },
    x: {
        title: "X",
        color: "#1DA1F2",
        textColor: "#ffffff",
        buildUrl: (zoekterm) => `https://x.com/hashtag/${encodeURIComponent(zoekterm.replace(/\s+/g, ""))}`
    },
    i: {
        title: "Instagram",
        color: "#C13584",
        textColor: "#ffffff",
        buildUrl: (zoekterm) => `https://www.instagram.com/explore/tags/${encodeURIComponent(zoekterm.replace(/\s+/g, ""))}/`
    }
};

const VALID_TITLES = Object.values(COMMANDS).map((item) => item.title);

let geschiedenis = [];

const byId = (id) => document.getElementById(id);

const encodeQuery = (tekst) => encodeURIComponent(tekst).replace(/%20/g, "+");

const normaliseerCommand = (input) => input.trim();

const parseCommand = (input) => {
    const genormaliseerd = normaliseerCommand(input);
    const match = genormaliseerd.match(/^\/([a-zA-Z])\s+(.+)$/);

    if (!match) {
        return null;
    }

    const prefix = match[1].toLowerCase();
    const zoekterm = match[2].trim();

    if (!zoekterm) {
        return null;
    }

    return { prefix, zoekterm };
};

const krijgCommandConfig = (prefix) => COMMANDS[prefix] || null;

const bepaalTekstkleur = (hexKleur) => {
    const kleur = hexKleur.replace("#", "");
    const rood = parseInt(kleur.slice(0, 2), 16);
    const groen = parseInt(kleur.slice(2, 4), 16);
    const blauw = parseInt(kleur.slice(4, 6), 16);
    const helderheid = (rood * 299 + groen * 587 + blauw * 114) / 1000;

    return helderheid > 160 ? "#212529" : "#ffffff";
};

const leesGeschiedenisUitDom = () => geschiedenis.slice();

const bewaarNaarStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leesGeschiedenisUitDom()));
};

const updateLegeMeldingEnTeller = () => {
    const leeg = geschiedenis.length === 0;
    byId("lege-melding").style.display = leeg ? "block" : "none";
    byId("history-aantal").textContent = String(geschiedenis.length);
};

const maakCard = (item) => {
    const config = Object.values(COMMANDS).find((entry) => entry.title === item.title) || COMMANDS.g;
    const kolom = document.createElement("div");
    kolom.className = "col-12 col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card history-card h-100 shadow-sm";
    card.style.backgroundColor = config.color;
    card.style.color = config.textColor || bepaalTekstkleur(config.color);

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    const title = document.createElement("h3");
    title.className = "card-title h5 mb-2";
    title.textContent = item.title;

    const text = document.createElement("p");
    text.className = "card-text flex-grow-1 mb-3";
    text.textContent = item.text;

    const link = document.createElement("a");
    link.className = `btn btn-sm ${config.textColor === "#ffffff" ? "btn-light" : "btn-dark"}`;
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Go!";

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(link);
    card.appendChild(body);
    kolom.appendChild(card);

    return kolom;
};

const renderGeschiedenis = () => {
    const grid = byId("history-grid");
    grid.innerHTML = "";

    for (let i = 0; i < geschiedenis.length; i++) {
        grid.appendChild(maakCard(geschiedenis[i]));
    }

    updateLegeMeldingEnTeller();
};

const voegGeschiedenisToe = (item) => {
    geschiedenis.push(item);
    bewaarNaarStorage();
    renderGeschiedenis();
};

const openUrlInNieuwTabblad = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

const verwerkZoekopdracht = () => {
    const input = byId("zoekopdracht");
    const parsed = parseCommand(input.value);

    if (!parsed) {
        alert("Ongeldige zoekopdracht. Gebruik bijvoorbeeld /g webdesign.");
        return;
    }

    const config = krijgCommandConfig(parsed.prefix);

    if (!config) {
        alert(`Onbekend commando: /${parsed.prefix}`);
        return;
    }

    const url = config.buildUrl(parsed.zoekterm);
    const commando = {
        title: config.title,
        text: parsed.zoekterm,
        url: url
    };

    openUrlInNieuwTabblad(url);
    voegGeschiedenisToe(commando);

    input.value = "";
    input.focus();
};

const herstelVanStorage = () => {
    const opgeslagenData = localStorage.getItem(STORAGE_KEY);

    if (!opgeslagenData) {
        geschiedenis = [];
        renderGeschiedenis();
        return;
    }

    try {
        const parsed = JSON.parse(opgeslagenData);

        if (!Array.isArray(parsed)) {
            geschiedenis = [];
        } else {
            geschiedenis = parsed.filter((item) => {
                return item && typeof item.title === "string" && typeof item.text === "string" && typeof item.url === "string" && VALID_TITLES.includes(item.title);
            });
        }
    } catch (error) {
        geschiedenis = [];
        localStorage.removeItem(STORAGE_KEY);
    }

    renderGeschiedenis();
};

const setup = () => {
    byId("zoek-form").addEventListener("submit", (event) => {
        event.preventDefault();
        verwerkZoekopdracht();
    });

    herstelVanStorage();
};

window.addEventListener("load", setup);