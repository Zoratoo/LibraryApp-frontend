import React, { useState } from 'react';
import Page from '../../templates/page';
import { postClient } from '../../services/clients-apis';
import '../../css/components/forms.css';
import ErrorModal from '../../modals/error';
import validateCpf from '../../utilities/validations';
import { maskPhone, maskCep, maskCpf } from '../../utilities/masks';
import fetchAddress from '../../services/address-api';

export default function ClientForm(props) {
    const emptyClient = { name: '', email: '', phone: '', address: '', cep: '', cpf: '' };
    const [formData, setFormData] = useState(emptyClient);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let maskedValue = value;

        if (name === 'phone') {
            maskedValue = maskPhone(value.slice(0, 15));
        } else if (name === 'cep') {
            maskedValue = maskCep(value.slice(0, 9));
            if (maskedValue.length === 9) {
                fetchAddress(maskedValue, setFormData);
            }
        } else if (name === 'cpf') {
            maskedValue = maskCpf(value.slice(0, 14));
        }

        setFormData({
            ...formData,
            [name]: maskedValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name && formData.email && formData.phone && formData.address && formData.cep) {
            if (formData.cep.replace(/\D/g, '').length === 8) {
                if (validateCpf(formData.cpf)) {
                    try {
                        await postClient(formData);
                        setFormData(emptyClient);
                        setShowErrorModal(false);
                    }
                    catch (error) {
                        setErrorMessage('Error creating client. Please try again.');
                        setShowErrorModal(true);
                    }
                }
                else {
                    setErrorMessage('Invalid CPF.');
                    setShowErrorModal(true);
                }
            }
            else {
                setErrorMessage('Invalid CEP.');
                setShowErrorModal(true);
            }
        }
        else {
            setErrorMessage('Please fill out all required fields.');
            setShowErrorModal(true);
        }
    };

    return (
        <Page>
            <div className="container py-5">
                <h1 className="text-center mb-4 custom-title">Client Form</h1>
                <div className="shadow-lg border-0 rounded-4 p-4 form-card" style={{ backgroundColor: '#f8f9fa' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="form-group col-md-7 mb-3">
                                <label htmlFor="name">Name (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-5 mb-3">
                                <label htmlFor="email">CPF (*):</label>
                                <input
                                    type="cpf"
                                    className="form-control custom-input"
                                    id="cpf"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="phone">Phone Number (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="email">Email (*):</label>
                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4 mb-3">
                                <label htmlFor="cep">CEP (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="cep"
                                    name="cep"
                                    value={formData.cep}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-8 mb-3">
                                <label htmlFor="address">Address (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn-modern">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ErrorModal
                show={showErrorModal}
                message={errorMessage}
                onClose={handleCloseModal}
            />
        </Page>
    );
}