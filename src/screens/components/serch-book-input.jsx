import React from 'react';
import { IoIosSearch } from "react-icons/io";

const SearchBook = ({ filter, handleFilterChange, genres }) => {
    return (
        <div className="d-flex mb-4 justify-content-center">
            <div className="input-group" style={{ width: '60%' }}>
                <span className="input-group-text" style={{ border: '2px solid #ced4da', backgroundColor: '#fff' }}>
                    <IoIosSearch style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                </span>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter the title or author of the book you are looking for..."
                    value={filter.title}
                    onChange={handleFilterChange}
                    style={{
                        border: '2px solid #ced4da',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </div>
            <select
                name="genre"
                className="form-control ms-2"
                value={filter.genre}
                onChange={handleFilterChange}
                style={{
                    width: '20%',
                    border: '2px solid #ced4da',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <option value="">Select a Genre</option>
                {genres.length > 0 ? (
                    genres.map((genre, index) => (
                        <option key={index} value={genre}>
                            {genre}
                        </option>
                    ))
                ) : (
                    <option value="">No genre found</option>
                )}
            </select>
        </div>
    );
};

export default SearchBook;