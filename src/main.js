import { getSeries, getSeriesFilter } from './services/serieService.js';
import { Remplir_options_select, Filtrer_rechercher } from "./ui/filters.js";
import { Afficher } from "./ui/cards.js";

let series = [];

// ================ Afficher series =================
async function AfficherSeries() {
    try {
        const res = await getSeries();

        series = res.data;

        // afficher les series
        Afficher(series);

        // Remplir les option des select des filter dynamique
        Remplir_options_select((series.map(data => data.genres).flat()), document.getElementById('select_Genre'));
        Remplir_options_select((series.map(data => data.language)), document.getElementById('select_Langue'));


    } catch (error) {
        console.error(error);
    }
}

AfficherSeries();



// ================ filtrer et rechrcher les series =================

document.getElementById("select_Genre").addEventListener("change", (e) => { Afficher(Filtrer_rechercher(series)) });
document.getElementById("select_Langue").addEventListener("change", () => { Afficher(Filtrer_rechercher(series)) });
document.getElementById("Recherche").addEventListener("input", () => { Afficher(Filtrer_rechercher(series)) });
document.getElementById("Réinitialiser").addEventListener("click", () => {
    document.getElementById("filter_form").reset();
    Afficher(series)
});




// ================ Ajouter une serie =================
function ValiderChamps() {
    const nom = document.getElementById("nom");
    const Genre = document.getElementById("input_Genre");
    const Description = document.getElementById("Description");

    const discription_message = document.getElementById("discription_message");
    const genre_message = document.getElementById("genre_message");
    const nom_message = document.getElementById("nom_message");

    // valider nom
    if (!nom.value.trim()) {
        nom_message.removeAttribute("hidden");
        nom_message.textContent = "entrer le nom de serie";
    } else {
        nom_message.setAttribute("hidden", "");
    }
    // valider Genre
    if (!Genre.value.trim()) {
        genre_message.removeAttribute("hidden");
        genre_message.textContent = "entrer le genre(s) de serie";
    } else {
        genre_message.setAttribute("hidden", "");
    }
    // valider discription
    if (Description.value.trim() === "") {
        discription_message.removeAttribute("hidden");
        discription_message.textContent = "entrer la discription d'une serie";
    } else {
        discription_message.setAttribute("hidden", "");
    }

    if (!nom.value.trim() || !Genre.value.trim() || Description.value.trim() === "") return false;


    return { name: nom.value.trim(), genres: Genre.value.trim().split(","), summary: Description.value.trim() };
}

// Ajouter apres du valider les champs
document.getElementById("form_ajouter").addEventListener("submit", (e) => {
    e.preventDefault();
    if (ValiderChamps()) {
        const serie_data = ValiderChamps();
        series.push(serie_data);
        console.log(serie_data);
        Afficher(series);

        const nom = document.getElementById("nom");
        const Genre = document.getElementById("input_Genre");
        const Description = document.getElementById("Description");
        Vidage_champs([nom, Genre, Description]);
        document.getElementById("ajouter_message").removeAttribute("hidden")
        setTimeout(() => {
            document.getElementById("ajouter_message").setAttribute("hidden", "")
        }, 2000)
    }



})


// ================ Afficher Detail d'une serie =================

function AfficherDetail(serie) {

    console.log(serie);

    document.getElementById("detail").removeAttribute("hidden");
    document.getElementById("AfficherFilms").setAttribute("hidden", "");
    document.getElementById("section_ajouter").setAttribute("hidden", "");
    document.getElementById("section_hero").setAttribute("hidden", "");

    document.getElementById("image_serie").src = serie.image.original;
    document.getElementById("name_serie").textContent = serie.name;
    serie.genres.forEach(g => {
        const genre = document.createElement("p");
        genre.textContent = g;
        document.getElementById("div_genre").append(genre);
    })
    document.getElementById("discription").innerHTML = serie.summary;



}