import React, { useState } from 'react';
import Page from '../../templates/page';
import '../../css/components/forms.css';
import ErrorModal from '../../modals/error';
import { maskPublicationYear, maskQuantity, maskPrice } from '../../utilities/masks';
import { postBook } from '../../services/books-apis';

export default function BookForm(props) {
    const emptyBook = { title: '', author: '', genre: '', publisher: '', publication_year: '', quantity: 0, price: 'R$', image_url: '' };
    const [formData, setFormData] = useState(emptyBook);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const currentYear = new Date().getFullYear();

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let maskedValue = value;
        let unmaskedValue = value;

        if (name === 'publication_year') {
            maskedValue = maskPublicationYear(value);
        } else if (name === 'quantity') {
            maskedValue = maskQuantity(value);
        } else if (name === 'price') {
            maskedValue = maskPrice(value);
            unmaskedValue = value.replace(/[^\d]/g, '');
            unmaskedValue = (parseInt(unmaskedValue, 10) / 100).toFixed(2);
        }

        if (name === 'publication_year' || name === 'quantity' || name === 'price') {
            if (parseFloat(maskedValue) < 0) {
                maskedValue = '';
                unmaskedValue = '';
            }
        }

        setFormData({ ...formData, [name]: name === 'price' ? unmaskedValue : maskedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.title && formData.author && formData.genre && formData.publisher && formData.publication_year <= currentYear
            && formData.quantity > 0 && formData.price && formData.image_url) {
            try {
                await postBook(formData);
                setFormData(emptyBook);
            } catch (error) {
                setErrorMessage('Error creating book. Please try again.');
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
                <h1 className="text-center mb-4 custom-title">Book Form</h1>
                <div className="shadow-lg border-0 rounded-4 p-4 form-card" style={{ backgroundColor: '#f8f9fa' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="title">Title (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="author">Author (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-5 mb-3">
                                <label htmlFor="publisher">Publisher (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="publisher"
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-3 mb-3">
                                <label htmlFor="genre">Genre (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="genre"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-2 mb-3">
                                <label htmlFor="publication_year">Year (*):</label>
                                <input
                                    type="number"
                                    className="form-control custom-input"
                                    id="publication_year"
                                    name="publication_year"
                                    value={formData.publication_year}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-2 mb-3">
                                <label htmlFor="quantity">Quantity (*):</label>
                                <input
                                    type="number"
                                    className="form-control custom-input"
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">

                            <div className="form-group col-md-9 mb-3">
                                <label htmlFor="image_url">Image URL (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="image_url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-3 mb-3">
                                <label htmlFor="price">Price (*):</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="price"
                                    name="price"
                                    value={maskPrice(formData.price)}
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