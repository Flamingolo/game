import { API_CONFIG } from '../config/apiConfig';

// Fetch all dungeons
export const getDungeons = async () => {
  try {
    const response = await fetch(API_CONFIG.dungeons);
    if (!response.ok) {
      throw new Error('Failed to fetch dungeons');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dungeons:", error);
    throw error;
  }
};

// Fetch a single dungeon by ID
export const getDungeonById = async (id) => {
  try {
    const response = await fetch(`${API_CONFIG.dungeons}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dungeon with id ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching dungeon with id ${id}:`, error);
    throw error;
  }
};
