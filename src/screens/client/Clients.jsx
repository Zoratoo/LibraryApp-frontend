import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../templates/page.jsx';
import { fetchClientCpf, fetchRentalsCpf } from '../../services/clients-apis.js';
import RentalCard from '../rental/rental-card.jsx';
import ClientCard from './client-card.jsx';
import SearchInput from '../components/search-client-input.jsx';
import ErrorModal from '../../modals/error.jsx';
import { FaCirclePlus } from "react-icons/fa6";
import '../../css/client/clients.css';
import { maskCpf } from '../../utilities/masks';

export default function Clients() {
    const [cpf, setCpf] = useState('');
    const [clienteData, setClienteData] = useState(null);
    const [rentalsClient, setRentalsClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRentals, setExpandedRentals] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    const toggleExpand = (rentalId) => {
        setExpandedRentals((prev) => ({
            ...prev,
            [rentalId]: !prev[rentalId]
        }));
    };

    const handleCpfChange = (e) => {
        const maskedValue = maskCpf(e.target.value.slice(0, 14));
        setCpf(maskedValue);
    };

    const handleSearch = async () => {
        if (!cpf) return;

        setIsLoading(true);

        try {
            const client = await fetchClientCpf(cpf);
            setClienteData(client);
            try {
                const rentals = await fetchRentalsCpf(cpf);
                setRentalsClient(rentals);
            } catch (error) {
                console.error('Dont found rentals or error: ', error);
            }
        } catch (error) {
            setErrorMessage('Client not found. Try again.');
            setShowErrorModal(true);
        }

        setIsLoading(false);
    };

    const handleNewRental = () => {
        navigate('/rentals', { state: { clientData: clienteData } });
    };

    return (
        <Page>
            <div className="container py-5">
                <h1 className="text-center mb-4 custom-title">Clients</h1>
                <SearchInput
                    cpf={cpf}
                    handleCpfChange={handleCpfChange}
                    handleSearch={handleSearch}
                    isLoading={isLoading}
                    showAddIcon={true}
                />

                {clienteData && <ClientCard clientData={clienteData} />}

                {rentalsClient && (
                    <div className="d-flex justify-content-center my-4">
                        <button
                            className="btn-new-rental fw-bold d-flex align-items-center gap-2 px-3 py-2 rounded-pill position-relative overflow-hidden justify-content-center"
                            onClick={handleNewRental}
                        >
                            <span className="btn-new-rental-bg position-absolute top-0 start-100 w-100 h-100" />
                            <FaCirclePlus className="btn-new-rental-icon" />
                            <span className="btn-new-rental-text">New Rental</span>
                        </button>
                    </div>
                )}

                <div className="mt-4">
                    {rentalsClient && rentalsClient.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                        .map((rental) => (
                            <RentalCard
                                key={rental.id}
                                rental={rental}
                                expandedRentals={expandedRentals}
                                toggleExpand={toggleExpand}
                            />
                        ))}
                </div>
                <ErrorModal
                    show={showErrorModal}
                    message={errorMessage}
                    onClose={handleCloseModal}
                />
            </div>
        </Page>
    );
}