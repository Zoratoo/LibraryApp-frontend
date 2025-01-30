const API_URL = 'http://localhost:8080/apis/book';

export const fetchBooks = async () => {
    try {
        const response = await fetch(`${API_URL}/find-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error to find books:", error);
        throw error;
    }
};

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${API_URL}/find-all-genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error to find genres:", error);
        throw error;
    }
};
