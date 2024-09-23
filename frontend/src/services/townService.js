import { API_CONFIG } from '../config/apiConfig';

// Get all towns
export const getTowns = async () => {
    try {
        const response = await fetch(API_CONFIG.towns);
        if (!response.ok){
            throw new Error('Failed to fetch all towns');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching towns:', error);
        throw error
    }
};

export const getTownById = async (id) => {
    try {
        const response = await fetch(`${API_CONFIG.towns}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch town with ID ${id}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching town with ID ${id}:`, error)
        throw error;
    }
};