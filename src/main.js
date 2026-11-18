import { getAllSeries, getSeriesFilter, AddSerie, deleteSerie } from './services/serieService.js';
import { Remplir_options_select } from "./ui/filters.js";
import { Afficher } from "./ui/cards.js";

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


