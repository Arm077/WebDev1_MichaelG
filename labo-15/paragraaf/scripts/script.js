const setup = () => {
    // Vraag alle elementen uit de DOM-tree
    let belangrijkeElementen = document.getElementsByClassName("belangrijk");

    // Overloop de lijst van gevonden elementen
    for (let i = 0; i < belangrijkeElementen.length; i++) {
        belangrijkeElementen[i].className += " opvallend";
    }
}

window.addEventListener("load", setup);