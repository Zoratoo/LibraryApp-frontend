import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Page from '../../templates/page.jsx';
import { fetchClientCpf, fetchRentalsCpf } from '../../services/clients-apis.js';
import { IoIosSearch } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { LuCalendarArrowDown, LuCalendarArrowUp } from "react-icons/lu";
import { MdOutlineMail, MdOutlineLocalPhone, MdOutlineLocationOn, MdPersonAddAlt1 } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import '../../css/clients.css';

export default function Clients() {
    const [cpf, setCpf] = useState('');
    const [clienteData, setClienteData] = useState(null);
    const [rentalsClient, setRentalsClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRentals, setExpandedRentals] = useState({});

    const toggleExpand = (rentalId) => {
        setExpandedRentals((prev) => ({
            ...prev,
            [rentalId]: !prev[rentalId]
        }));
    };

    const handleCpfChange = (e) => {
        setCpf(e.target.value);
    };

    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!cpf) return;

        setIsLoading(true);
        setError(null);

        try {
            const client = await fetchClientCpf(cpf);
            setClienteData(client);
            try {
                const rentals = await fetchRentalsCpf(cpf);
                setRentalsClient(rentals);
            } catch (error) {
                console.error('Erro ao buscar aluguéis:', error);
                setError('Erro ao buscar aluguéis, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            setError('Erro ao buscar cliente, tente novamente.');
        }

        setIsLoading(false);
    };

    return (
        <Page>
            <div className="container py-5">
                <h1 className="text-center mb-4 custom-title">Clients</h1>
                <div className="d-flex mb-4 justify-content-center">
                    <div className="input-group" style={{ width: '40%' }}>
                        <span className="input-group-text" style={{ border: '2px solid #ced4da', backgroundColor: '#fff' }}>
                            <IoIosSearch style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                        </span>
                        <input
                            value={cpf}
                            onChange={handleCpfChange}
                            className="form-control"
                            id="cpf"
                            placeholder="Type a client CPF"
                            style={{
                                border: '2px solid #ced4da',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                    <span className="input-group-text" style={{
                        border: '2px solid #ced4da', backgroundColor: '#fff',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer'}}>
                        <MdPersonAddAlt1 style={{ width: '20px', height: '20px', color: 'black' }} />
                    </span>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button
                        onClick={handleSearch}
                        className="btn btn-primary"
                        disabled={isLoading || !cpf}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {error && <p className="text-danger">{error}</p>}

                {clienteData && (
                    <div className="client-info-card mt-1 p-3" style={{ position: 'relative' }}>
                        <div>
                            <p className='text-center fw-bold fs-4'>{clienteData.name}</p>
                        </div>
                        <hr className="divider-light" />
                        <div className="d-flex justify-content-between" style={{ marginRight: '2%', marginLeft: '2%' }}>
                            <p className='text-center'><MdOutlineLocalPhone /> {clienteData.phone}</p>
                            <p className='text-center'><MdOutlineMail /> {clienteData.email}</p>
                            <p className='text-center'><MdOutlineLocationOn /> {clienteData.address}</p>
                        </div>
                        <hr className="divider-light" />
                        <div className="d-flex justify-content-center" style={{ marginRight: '2%', marginLeft: '2%', gap: '2%' }}>
                            <HiPencilAlt style={{ cursor: 'pointer' }} />
                            <FaTrash style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                )}

                <div className="mt-4">
                    {rentalsClient && rentalsClient.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                        .map((rental) => (
                            <motion.div
                                key={rental.id}
                                className="card mb-3 mx-auto"
                                style={{ maxWidth: "80%", overflow: "hidden" }}
                                initial={{ height: "auto" }}
                                animate={{ height: expandedRentals[rental.id] ? "auto" : "fit-content" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <div className="card-rental modern-card d-flex align-items-center p-3">
                                    <div className="text-left">
                                        <p className="card-date">
                                            <b><LuCalendarArrowUp /> {rental.start_date}</b>
                                        </p>
                                        <p className="card-date">
                                            <b><LuCalendarArrowDown /> {rental.end_date}</b>
                                        </p>
                                    </div>
                                    <div className="text-center status-container">
                                        <span className={`status ${rental.status}`}>
                                            {rental.status === 'f' ? 'Finished' : rental.status === 'n' ? 'Not payed' : 'In Progress'}
                                        </span>
                                    </div>
                                    <button className="btn btn-light" onClick={() => toggleExpand(rental.id)}>
                                        {expandedRentals[rental.id] ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {expandedRentals[rental.id] && rental.book && (
                                        <motion.div
                                            className="p-3"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {rental.book.map((book) => (
                                                <div key={book.id} className="card mb-2" style={{ maxWidth: "90%", margin: "0 auto" }}>
                                                    <div className="d-flex align-items-stretch">
                                                        <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center">
                                                            <h6 className="card-title">{book.title}</h6>
                                                            <p className="card-text">{book.author}</p>
                                                        </div>
                                                        <img
                                                            src={book.image_url}
                                                            alt={book.title}
                                                            className="card-img-top rounded-3 img-fluid"
                                                            style={{ width: "200px", height: "100px" }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                </div>
            </div>
        </Page>
    );
}