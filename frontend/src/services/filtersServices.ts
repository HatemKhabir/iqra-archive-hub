import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081/api/khotbas'

export const fetchKhotbasLanguages=async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/languages`);
        return response.data;
    } catch (error) {
        console.error('Error fetching languages:', error);
        throw error;
    }
}

export const fetchKhotbasTypes=async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/type`);
        return response.data;
    } catch (error) {
        console.error('Error fetching types:', error);
        throw error;
    }
}

