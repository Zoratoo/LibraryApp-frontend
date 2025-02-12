import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { confirmPayment } from '../services/rental-apis.js';
import ModalError from './error.jsx';

const ConfirmPaymentModal = ({ show, onClose, rentalId, onUpdateRentalStatus }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const handleConfirm = async () => {
        try {
            const response = await confirmPayment(rentalId);
            if (response.status === 200) {
                onUpdateRentalStatus(rentalId, 'f');
                onClose();
            } 
            else {
                setErrorMessage('Error confirming payment');
            }
        } catch (error) {
            setErrorMessage('Error confirming payment');
        }
        onClose();
    };

    return (
        <>
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span style={{ color: 'black' }}><FaMoneyCheckDollar /></span> Confirm Payment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to confirm that the payment was made?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            {errorMessage &&
                <ModalError
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            }
        </>
    );
};

export default ConfirmPaymentModal;
