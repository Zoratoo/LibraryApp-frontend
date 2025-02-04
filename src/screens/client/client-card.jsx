import React from 'react';
import { MdOutlineLocalPhone, MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import '../../css/client/client-card.css';

const ClientCard = ({ clientData }) => {
    return (
        <div className="client-info-card mt-1 p-3" style={{ position: 'relative' }}>
            <div>
                <p className='text-center fw-bold fs-4'>{clientData.name}</p>
            </div>
            <hr className="divider-light" />
            <div className="d-flex flex-wrap justify-content-between" style={{ marginRight: '2%', marginLeft: '2%' }}>
                <p className='text-center flex-grow-1'><MdOutlineLocalPhone /> {clientData.phone}</p>
                <p className='text-center flex-grow-1'><MdOutlineMail /> {clientData.email}</p>
                <p className='text-center flex-grow-1'><MdOutlineLocationOn /> {clientData.address}</p>
            </div>
            <hr className="divider-light" />
        </div>
    );
};

export default ClientCard;