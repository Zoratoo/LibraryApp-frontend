import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, message, onClose }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span style={{ color: 'red' }}>❌</span> Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;
