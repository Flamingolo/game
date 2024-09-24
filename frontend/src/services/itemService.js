import { API_CONFIG } from '../config/apiConfig';

// Fetch all items
export const getItems = async () => {
  try {
    const response = await fetch(API_CONFIG.items);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Fetch a single item by ID
export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_CONFIG.items}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch item with id ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
};
