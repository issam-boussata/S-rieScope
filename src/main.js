import { getAllSeries, getSeriesFilter, AddSerie, deleteSerie } from './services/serieService.js';
import { Remplir_options_select } from "./ui/filters.js";
import { Afficher } from "./ui/cards.js";
import { ValiderChamps, AjouterSerie } from './ui/form.js';
import { message_ajouter_error, message_delete_serie } from "./ui/notify.js";

let series = [];


// ================ Afficher series =================
async function AfficherSeries(filter_values = false) {
    try {
        if (!filter_values) {
            const res = await getAllSeries();
            series = res.data;

            // Remplir les option des select des filter dynamique
            Remplir_options_select((series.map(data => data.genres).flat()), document.getElementById('options_genre'));
            Remplir_options_select((series.map(data => data.language)), document.getElementById('options_langues'));

        } else {
            const res = await getSeriesFilter(filter_values);
            series = res.data;
        }

        // afficher les series
        Afficher(series);
        

    } catch (error) {
        const cards_films = document.getElementById("cards_films");
        cards_films.innerHTML = "";
        document.getElementById("message-aucun-serie").removeAttribute("hidden");
        document.getElementById("message_series").textContent = error;
    }
}

AfficherSeries();



// ================ filtrer et rechrcher les series =================
function filtrer() {
    const genre = document.getElementById("select_Genre").value;
    const langue = document.getElementById("select_Langue").value;
    const nom = document.getElementById("Recherche").value;

    AfficherSeries({ name: nom, genre: genre, language: langue })

}

document.getElementById("select_Genre").addEventListener("change", (e) => { filtrer() });
document.getElementById("select_Langue").addEventListener("change", () => { filtrer() });
document.getElementById("Recherche").addEventListener("input", () => { filtrer() });
document.getElementById("Réinitialiser").addEventListener("click", () => { document.getElementById("filter_form").reset(); AfficherSeries() });


// ================ Ajouter une serie =================


// Ajouter apres du valider les champs
document.getElementById("form_ajouter").addEventListener("submit", async(e) => {
    e.preventDefault();
    const serie_data = ValiderChamps();
    if (serie_data) {
        const serie_ajouter = await AjouterSerie(serie_data);
        console.log(serie_ajouter);

        if (serie_ajouter) {

            series.push(serie_data);
            AfficherSeries();
            document.getElementById("form_ajouter").reset();
            message_ajouter_error(true)
        }
        message_ajouter_error(false)
    }
})
// ================ Supprimer une serie =================

async function SupprimerSerie(IdSerie) {
    try {
        const res = await deleteSerie(IdSerie);
        series = series.filter(S => S.id !== IdSerie);
        Afficher(series);
        message_delete_serie(true)
    } catch (error) {
        console.log("serie matshatch ! ");
        message_delete_serie(false)

    }
}

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