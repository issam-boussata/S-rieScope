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
    try {
        
        const res = await api.post('/series', serie);
        console.log(res);
    } catch (error) {
        return error ;
        
    }   
    
}

// delete serie
export async function deleteSerie(){
    return await api.delete(`/series/${43}`)
}
