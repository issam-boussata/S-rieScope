// remplir select du genre 

export function Remplir_options_select(array, select) {
    select.innerHTML = "";


    let newArray = [];
    array.forEach(value => {
        if (!newArray.some(v => v === value)) {
            const option = document.createElement("option");
            option.textContent = value;
            option.value = value;
            select.append(option);
        }
        newArray.push(value);
    });

}


// filtrer les series par les genres et langue et rechercher par nom
// export function Filtrer_rechercher(series) {
// const genre = document.getElementById("select_Genre").value;
// const langue = document.getElementById("select_Langue").value;
// const nom = document.getElementById("Recherche").value;
//     let series_filter = series.filter(S => {
//         return ((S.genres.some(g => g === genre) || genre === "")&& ((S.language === langue) || (langue === "")) && (S.name.toLowerCase().includes(nom.trim().toLowerCase())));
//     })

//     return series_filter;

// }