import api from './api.js' ;

// get series
export async function getSeries() {
    return await api.get('/series') ;
}

// get series filtrés 
export async function getSeriesFilter(Params) {
    return await api.get('/series' , {params : Params})
}