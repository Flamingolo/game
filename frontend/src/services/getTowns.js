export const getTowns = async () => {
    const API = ''
    try {
        const response = await fetch(API);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch towns: ', error);
        throw error;
    }
};