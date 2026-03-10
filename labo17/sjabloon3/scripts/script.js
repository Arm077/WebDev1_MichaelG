const vraagGemeentenOp = () => {
    const gemeenten = [];
    let invoer = prompt("Geef een gemeente in");

    // De invoer stopt als de gebruiker annuleert (null) of "stop" typt
    while (invoer !== null && invoer.trim().toLowerCase() !== "stop") {
        if (invoer.trim() !== "") {
            gemeenten.push(invoer.trim());
        }
        invoer = prompt("Geef een gemeente in");
    }

    const compare = (a, b) => {
        return a.localeCompare(b);
    };
    gemeenten.sort(compare);

    toonInKeuzelijst(gemeenten);
};

const toonInKeuzelijst = (lijst) => {
    const select = document.createElement("select");

    for (let i = 0; i < lijst.length; i++) {
        const option = document.createElement("option");
        option.value = lijst[i];

        // Tekst toevoegen via createTextNode ipv innerHTML
        const tekstNode = document.createTextNode(lijst[i]);
        option.appendChild(tekstNode);

        select.appendChild(option);
    }

    // de keuzelijst in de body
    document.querySelector("body").appendChild(select);
};

const setup = () => {
    vraagGemeentenOp();
};

window.addEventListener("load", setup);