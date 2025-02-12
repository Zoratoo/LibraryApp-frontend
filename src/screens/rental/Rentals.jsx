import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../templates/page.jsx';
import { fetchClientCpf } from '../../services/clients-apis.js';
import ErrorModal from '../../modals/error.jsx';
import SearchInput from '../components/search-client-input.jsx';
import ClientCard from '../client/client-card.jsx';
import { maskCpf } from '../../utilities/masks';

export default function Rentals(props) {
    const location = useLocation();
    const [clienteData, setClienteData] = useState(null);
    const [cpf, setCpf] = useState('123.456.789-01');
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.clientData) {
            setClienteData(location.state.clientData);
        }
    }, [location.state]);

    const handleCpfChange = (e) => {
        const maskedValue = maskCpf(e.target.value.slice(0, 14));
        setCpf(maskedValue);
    };

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    const handleSearch = async () => {
        if (!cpf) return;

        setIsLoading(true);

        try {
            const client = await fetchClientCpf(cpf);
            setClienteData(client);
        } catch (error) {
            setErrorMessage('Client not found. Try again.');
            setShowErrorModal(true);
        }

        setIsLoading(false);
    };

    return (
        <Page>
            <div className="container py-5">
                <h1 className="text-center mb-4 custom-title">Rentals</h1>
                {!clienteData && (
                    <SearchInput
                        cpf={cpf}
                        handleCpfChange={handleCpfChange}
                        handleSearch={handleSearch}
                        isLoading={isLoading}
                        showAddIcon={false}
                    />
                )}
                {clienteData && <ClientCard clientData={clienteData} />}
                <ErrorModal
                    show={showErrorModal}
                    message={errorMessage}
                    onClose={handleCloseModal}
                />
            </div>
        </Page>
    );
}