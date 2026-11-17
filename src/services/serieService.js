import api from './api.js' ;

// get series
export async function getSeries() {
     
    return await api.get('/series') ;
}