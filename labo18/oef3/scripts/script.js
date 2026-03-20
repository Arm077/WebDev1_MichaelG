const setup = () => {
    // 1. Itereer door elk li-element en wijzig de class
    const listItems = document.querySelectorAll("li");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].className = "listitem";
    }

    const img = document.createElement("img");
    img.setAttribute("src", "Images/Screenshot 2026-01-16 142423.png");
    img.setAttribute("alt", "Profielfoto");

    document.querySelector("body").appendChild(img);
};

window.addEventListener("load", setup);