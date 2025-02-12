import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../templates/page.jsx';
import { fetchClientCpf, fetchRentalsCpf } from '../../services/clients-apis.js';
import RentalCard from '../rental/rental-card.jsx';
import ClientCard from './client-card.jsx';
import SearchInput from '../components/search-client-input.jsx';
import ErrorModal from '../../modals/error.jsx';
import { maskCpf } from '../../utilities/masks';
import ButtonAdd from '../components/button-add.jsx';
import ConfirmPaymentModal from '../../modals/confirm-payment.jsx';

export default function Clients() {
    const [cpf, setCpf] = useState('123.456.789-01');
    const [clienteData, setClienteData] = useState(null);
    const [rentalsClient, setRentalsClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRentals, setExpandedRentals] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModalConfirmPayment, setShowModalConfirmPayment] = useState(false);
    const [currentRentalId, setCurrentRentalId] = useState(null);

    const navigate = useNavigate();

    const handleOpenModal = (id) => {
        setCurrentRentalId(id);
        setShowModalConfirmPayment(true);
    };

    const handleCloseModalPayment = () => {
        setShowModalConfirmPayment(false);
        setCurrentRentalId(null);
    };

    const handleUpdateRentalStatus = (id, status) => {
        setRentalsClient((prevRentals) =>
            prevRentals.map((rental) =>
                rental.id === id ? { ...rental, status } : rental
            )
        );
    };

    const handleCloseModal = () => {
        setShowErrorModal(false);
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
                    <ButtonAdd
                        handleButton={handleNewRental}
                        text="New Rental"
                    />
                )}

                <div className="mt-4">
                    {rentalsClient && rentalsClient.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                        .map((rental) => (
                            <RentalCard
                                key={rental.id}
                                rental={rental}
                                expandedRentals={expandedRentals}
                                toggleExpand={(id) => setExpandedRentals((prev) => ({ ...prev, [id]: !prev[id] }))}
                                handleOpenModal={handleOpenModal}
                            />
                        ))}
                </div>
                <ErrorModal
                    show={showErrorModal}
                    message={errorMessage}
                    onClose={handleCloseModal}
                />
                <ConfirmPaymentModal
                    show={showModalConfirmPayment}
                    onClose={handleCloseModalPayment}
                    rentalId={currentRentalId}
                    onUpdateRentalStatus={handleUpdateRentalStatus}
                />
            </div>
        </Page>
    );
}