import axios from 'axios';

const fetchAddress = async (cep, setFormData) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
        if (response.data) {
            setFormData((prevData) => ({
                ...prevData,
                address: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`
            }));
        }
    } catch (error) {
        console.error('Error fetching address:', error);
    }
};

export default fetchAddress;