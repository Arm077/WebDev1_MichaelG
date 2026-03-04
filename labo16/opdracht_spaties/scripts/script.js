const maakMetSpaties = (inputText) => {
    let resultaat = "";

    for (let i = 0; i < inputText.length; i++) {
        let karakter = inputText[i];

        if (karakter !== " ") {
            resultaat += karakter + " ";
        }
    }
    return resultaat.trim();
};

const toonSpaties = () => {
    const input = document.getElementById('txtInput').value;
    const uitkomst = maakMetSpaties(input);
    console.log(uitkomst);
};

document.getElementById('btnSpaties').addEventListener('click', toonSpaties);