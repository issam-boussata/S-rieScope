let series = [];
async function getFilms() {
    try {
        const res = await fetch(`https://api.tvmaze.com/shows?limit=10`);
        const data = await res.json();

        series = data.slice(0, 20);
        Afficher(series);
        RemplirGenres(series);
        // data.map(data =>console.log(data) )

    } catch (error) {
        console.error(error.message);

    }
}

getFilms();

// ================ Afficher series =================
function Afficher(data_series) {
    // let num_series = data_series.length ;
    const cards_films = document.getElementById("cards_films");
    cards_films.innerHTML = "";
    document.getElementById("num_series").removeAttribute("hidden");
    document.getElementById("num_series").textContent = data_series.length + " séries affichées";

    data_series.forEach(film => {
        //creer les elements html
        const containner = document.createElement("article");
        const image_film = document.createElement("img");
        const nom_film = document.createElement("h3");
        const div_genres = document.createElement("div");
        const discription = document.createElement("p");

        // creer span pour chaque genre de filme
        film.genres.forEach(genre => {

            const span_genre = document.createElement("sapn");
            span_genre.textContent = genre;
            span_genre.className = "p-2 bg-[#292929] rounded-[20px] mr-3"
            div_genres.append(span_genre);
        });

        // remplir data
        image_film.src = typeof (film.image) === "object" ? film.image.original : `https://static1.srcdn.com/wordpress/wp-content/uploads/2023/01/shrinking-new-tv-poster.jpg`;
        image_film.alt = film.name;
        nom_film.textContent = film.name;
        discription.innerHTML = film.summary;

        // style par tailwind css 
        containner.className = "bg-[#393939] rounded-lg border border-[#5c5959] cursor-pointer";
        nom_film.className = "font-bold text-lg mx-3 my-3";
        div_genres.className = "mx-3 "
        image_film.className = "w-[100%] h-60 rounded-t-lg lg:h-100";
        discription.className = "text-[#BABABA] mx-3 my-3 line-clamp-2";

        containner.addEventListener("click", () => { detail() })
        // append 
        containner.append(image_film, nom_film, div_genres, discription);
        cards_films.append(containner);

    });

}

// remplir select du genre 

function RemplirGenres(series) {
    if (!series) return;
    let tableauGenres = [];
    const select = document.getElementById("select_Genre");


    series.forEach(serie => {
        serie.genres.forEach(genre => {
            if (!tableauGenres.some(g => g === genre || !tableauGenres.length)) {
                const option = document.createElement("option");
                option.textContent = genre;
                option.value = genre;

                select.append(option);

            }
            tableauGenres.push(genre);


        })
    })
}

// decharger les champs du form 
function Vidage_champs(champs) {

    champs.forEach(champ => {
        champ.value = "";
    })
}
// ================ filtrer et rechrcher les series =================


// filtrer les series par les genres et rechercher par nom
function Filtrer_rechercher() {
    const genre = document.getElementById("select_Genre").value;
    const nom = document.getElementById("Recherche").value;
    let series_filter = series.filter(S => {
        return ((S.genres.some(g => g === genre) || genre === "") && (S.name.toLowerCase().includes(nom.trim().toLowerCase())));
    })

    Afficher(series_filter);

}

// Réinitialiser filter et recherche
function Réinitialiser() {
   const genre = document.getElementById("select_Genre");
    const recherche = document.getElementById("Recherche");
    Vidage_champs([genre ,recherche ])
    Filtrer_rechercher();
}

document.getElementById("select_Genre").addEventListener("change", () => { Filtrer_rechercher() });
document.getElementById("Recherche").addEventListener("input", () => { Filtrer_rechercher() });
document.getElementById("Réinitialiser").addEventListener("click", () => { Réinitialiser() });


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
        Vidage_champs([nom , Genre , Description]) ;
    }



})
