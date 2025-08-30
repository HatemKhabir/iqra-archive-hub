import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/mosque";

export const fetchRegisteredMosques = async (
  country?: string,
  city?: string
) => {
  try {
    const params = new URLSearchParams();
    if (country) {
      params.append("country", country);
    }
    if (city) {
      params.append("city", city);
    }
    const url = `${API_BASE_URL}?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching mosques:", error);
    throw error;
  }
};

export const registerMosque = async (mosqueData: {
  country: string;
  city: string;
  address: string;
  mosqueName: string;
  adminEmail: string;
  adminPhone: string;
}) => {
  try {
    const response = await axios.post(API_BASE_URL, mosqueData);
    return response.data;
  } catch (error) {
    console.error("Error registering mosque:", error);
    throw error;
  }
};
