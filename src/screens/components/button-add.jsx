import React from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import '../../css/components/button-add.css';

export default function ButtonAdd({ handleButton, text }) {
    return (
        <div className="d-flex justify-content-center my-4">
            <button
                className="btn-new-rental fw-bold d-flex align-items-center gap-2 px-3 py-2 rounded-pill position-relative overflow-hidden justify-content-center"
                onClick={handleButton}
            >
                <span className="btn-new-rental-bg position-absolute top-0 start-100 w-100 h-100" />
                <FaCirclePlus className="btn-new-rental-icon" />
                <span className="btn-new-rental-text">{text}</span>
            </button>
        </div>
    );
}
