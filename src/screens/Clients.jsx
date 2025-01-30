import React, { useState } from 'react';
import Page from '../templates/page.jsx';
import { fetchClientCpf } from '../services/clients-apis';
import { IoIosSearch } from "react-icons/io";

export default function Clients(props) {
    const [cpf, setCpf] = useState('');
    const [clienteData, setClienteData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCpfChange = (e) => {
        setCpf(e.target.value);
    };

    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!cpf) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchClientCpf(cpf);
            setClienteData(data);
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
                            placeholder="Digite o CPF"
                            style={{
                                border: '2px solid #ced4da',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button
                        onClick={handleSearch}
                        className="btn btn-primary"
                        disabled={isLoading || !cpf}
                    >
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>


                {error && <p className="text-danger">{error}</p>} {/* Mensagem de erro */}
                {clienteData && (
                    <div className="mt-4">
                        <h3>Dados do Cliente:</h3>
                        <p><strong>Nome:</strong> {clienteData.name}</p>
                        <p><strong>Email:</strong> {clienteData.email}</p>
                        <p><strong>Telefone:</strong> {clienteData.telefone}</p>
                    </div>
                )}
            </div>
        </Page>
    );
}
