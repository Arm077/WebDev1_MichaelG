const setup = () => {
    let familie = ["Jan", "Piet", "Joris", "Korneel", "Bart"]; // Minimaal 5 [cite: 239]
    console.log("Aantal elementen: " + familie.length); [cite: 241]
    console.log("Eerste: " + familie[0] + ", Derde: " + familie[2] + ", Vijfde: " + familie[4]); [cite: 242]

    voegNaamToe(familie);
    console.log("Array als string: " + familie.join(", ")); [cite: 246]
}

const voegNaamToe = (leden) => {
    let extraNaam = prompt("Wie wil je toevoegen?"); [cite: 243]
    leden.push(extraNaam); // Pass-by-reference: de originele array verandert
}

window.addEventListener("load", setup);