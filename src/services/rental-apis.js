const API_URL = 'http://localhost:8080/apis/rental';

export const confirmPayment = async (id) => {
    try {
        const response = await fetch(`${API_URL}/confirm-payment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
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