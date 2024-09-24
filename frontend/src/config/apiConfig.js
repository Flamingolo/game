const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:5173/api';

export const API_CONFIG = {
    towns: `${API_BASE_URL}/town/`,
    dungeons: `${API_BASE_URL}/dungeon/`,
    character: `${API_BASE_URL}/character/`,
    items: `${API_BASE_URL}/item/`,
    mobs: `${API_BASE_URL}/mob/`,
}
