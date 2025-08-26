import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081/api/mosque'


export const fetchRegisteredMosques=async (country?:string,city?:string) => {
try{
    const params=new URLSearchParams();
    if(country){
        params.append('country',country);
    }
    if(city){
        params.append('city',city);
    }
    const url=`${API_BASE_URL}?${params.toString()}`;
    console.log('Fetching mosques with URL:', url);
    const response = await axios.get(url);
    console.log('Fetched mosques:', response.data);
    return response.data;

}catch(error){
    console.error('Error fetching mosques:', error);
    throw error;
}
}