const checkPostcode = () => {
    const veld = document.getElementById('postcode');
    const input = veld.value;
    const nummer = parseInt(input); // Zet tekst om naar een getal

    // exact 4 lang EN tussen 1000 en 9999
    if (input.length === 4 && nummer >= 1000 && nummer <= 9999) {
        veld.style.backgroundColor = "lightgreen";
    } else {
        veld.style.backgroundColor = "red"; // Foute invoer
    }
};

document.getElementById('postcode').addEventListener('change', checkPostcode);