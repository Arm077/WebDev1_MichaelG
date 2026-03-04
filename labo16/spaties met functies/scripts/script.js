
const maakMetSpaties = (inputText) => {
    let result = "";


    for (let i = 0; i < inputText.length; i++) {
        let karakter = inputText[i];


        if (karakter !== " ") {
            result += karakter + " ";
        }
    }

    return result.trim();
};

const toonResultaat = () => {
    const inputTekst = document.getElementById('txtInput').value;

    const uitkomst = maakMetSpaties(inputTekst);
    console.log(uitkomst);
};

document.getElementById('btnSpaties').addEventListener('click', toonResultaat);