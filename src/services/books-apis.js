const API_URL = 'https://libraryapi-production-1f9b.up.railway.app/apis/book';

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

export const postBook = async (book) => {
    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        if (response.ok) {
            return true;
        } else {
            console.error(`Request error: ${response.status}`);
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};
