const API_URL = 'https://libraryapi-production-1f9b.up.railway.app/apis/client';

export const fetchClientCpf = async (cpf) => {
    try {
        const encodedCpf = encodeURIComponent(cpf);
        const response = await fetch(`${API_URL}/find-cpf?cpf=${encodedCpf}`, {
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
        console.error("Error to find client:", error);
        throw error;
    }
};

export const fetchRentalsCpf = async (cpf) => {
    try {
        const encodedCpf = encodeURIComponent(cpf);
        const response = await fetch(`${API_URL}/find-rentals-cpf?cpf=${encodedCpf}`, {
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
        console.error("Error to find rentals:", error);
        throw error;
    }
};

export const postClient = async (client) => {
    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
        });

        if (response.ok) {
            return true;
        } else {
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding client:", error);
        throw error;
    }
};

