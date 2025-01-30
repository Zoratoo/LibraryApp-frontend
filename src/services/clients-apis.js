const API_URL = 'http://localhost:8080/apis/client';

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
