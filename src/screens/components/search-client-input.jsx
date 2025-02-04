import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ cpf, handleCpfChange, handleSearch, isLoading, showAddIcon }) => {
    const navigate = useNavigate();

    const handleAddClient = () => {
        navigate('/clients/form');
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="input-group" style={{ width: '40%' }}>
                    <span className="input-group-text" style={{ border: '2px solid #ced4da', backgroundColor: '#fff' }}>
                        <IoIosSearch style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                    </span>
                    <input
                        value={cpf}
                        onChange={handleCpfChange}
                        className="form-control"
                        id="cpf"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Type a client CPF"
                        style={{
                            border: '2px solid #ced4da',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </div>
                {showAddIcon && (
                    <span
                        className="input-group-text"
                        style={{
                            border: '2px solid #ced4da',
                            backgroundColor: '#fff',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer'
                        }}
                        onClick={handleAddClient}
                    >
                        <MdPersonAddAlt1 style={{ width: '20px', height: '20px', color: 'black' }} />
                    </span>
                )}
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
        </div>
    );
};

export default SearchInput;