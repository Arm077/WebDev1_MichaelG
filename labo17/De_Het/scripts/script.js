const vervangDeDoorHet = () => {
    let zin = "Gisteren zat de jongen op de stoep en at de helft van de appel";


    let index = zin.indexOf("de");

    while (index !== -1) {

        let charVoor = index === 0 ? " " : zin.slice(index - 1, index);
        let charNa = index + 2 === zin.length ? " " : zin.slice(index + 2, index + 3);

        if (charVoor === " " && charNa === " ") {
            zin = zin.slice(0, index) + "het" + zin.slice(index + 2);
            index = zin.indexOf("de", index + 3);
        } else {
            index = zin.indexOf("de", index + 1);
        }
    }

    console.log(zin);
};

const setup = () => {
    vervangDeDoorHet();
};

window.addEventListener("load", setup);