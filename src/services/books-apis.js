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
            throw new Error(`Erro na requisição: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
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
            throw new Error(`Erro na requisição: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
        throw error;
    }
};
