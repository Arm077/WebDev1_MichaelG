const toonTrigrams = () => {
    const woord = "onoorbaar";

    for (let i = 0; i <= woord.length - 3; i++) {
        let trigram = woord.slice(i, i + 3);
        console.log(trigram);
    }
}

const setup = () => {
    toonTrigrams();
}
window.addEventListener("load", setup);