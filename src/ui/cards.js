// import { SupprimerSerie } from "./main.js";

export function Afficher(data_series) {

    const cards_films = document.getElementById("cards_films");
    cards_films.innerHTML = "";
    document.getElementById("num_series").removeAttribute("hidden");
    document.getElementById("num_series").textContent = data_series.length + " séries affichées";

    if (!data_series.length){
        document.getElementById("message-aucun-serie").removeAttribute("hidden") ;
        return ;
    }

    document.getElementById("message-aucun-serie").setAttribute("hidden" , "")
    data_series.forEach(film => {
        //creer les elements html
        const containner = document.createElement("article");
        const image_film = document.createElement("img");
        const nom_film = document.createElement("h3");
        const div_genres = document.createElement("div");
        const discription = document.createElement("p");
        const div_btns = document.createElement("div");
        const btn_supprimer = document.createElement("button");
        const btn_Modifier = document.createElement("button");

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
        btn_Modifier.textContent = "Modifier ";
        btn_Modifier.type = "button";
        btn_supprimer.textContent = "Supprimer ";
        btn_supprimer.type = "button";
        

        // style par tailwind css 
        containner.className = "bg-[#393939] rounded-lg border border-[#5c5959] cursor-pointer";
        nom_film.className = "font-bold text-lg mx-3 my-3";
        div_genres.className = "mx-3 "
        image_film.className = "w-[100%] h-60 rounded-t-lg lg:h-100";
        discription.className = "text-[#BABABA] mx-3 my-3 line-clamp-2";
        btn_Modifier.className = "bg-green-400";
        btn_supprimer.className = "bg-red-300";
        div_btns.className = "mx-3 flex justify-around";

        btn_supprimer.addEventListener("click" , ()=>{SupprimerSerie(film.id)})
        containner.addEventListener("click", () => { AfficherDetail(film) })
        // append 
        div_btns.append(btn_Modifier, btn_supprimer)
        containner.append(image_film, nom_film, div_genres, discription, div_btns);
        cards_films.append(containner);

    });

}