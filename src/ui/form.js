import { AddSerie } from "../services/serieService.js";


export function ValiderChamps() {
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



// Ajouter une serie
export async function AjouterSerie(serie) {
    try {
        const res = await AddSerie(serie) ;
        console.log(res);
        
        return res.data ;
    } catch (error) {
        console.log("3ndek mochkil f Ajouter !");
        return false ;
    }
    
}
