import { API_CONFIG } from '../config/apiConfig';

// Fetch all characters
export const getCharacters = async () => {
  try {
    const response = await fetch(API_CONFIG.characters);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

// Fetch a single character by ID
export const getCharacterById = async (id) => {
  try {
    const response = await fetch(`${API_CONFIG.characters}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch character with id ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    throw error;
  }
};
