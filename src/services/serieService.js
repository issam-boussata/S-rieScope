import api from './api.js';

// get series
export async function getAllSeries() {
    return await api.get('/series');
}

// get series filtrés 
export async function getSeriesFilter(Params) {
    return await api.get('/series', { params: Params })
}


// create serie
export async function AddSerie(serie) {
    return await api.post('/series', serie);

}

// delete serie
export async function deleteSerie(IdSerie){
    return await api.delete(`/series/${IdSerie}`)
}