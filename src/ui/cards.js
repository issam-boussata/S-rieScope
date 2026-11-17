export function Afficher(data_series) {
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

        containner.addEventListener("click", () => { AfficherDetail(film) })
        // append 
        containner.append(image_film, nom_film, div_genres, discription);
        cards_films.append(containner);

    });

}