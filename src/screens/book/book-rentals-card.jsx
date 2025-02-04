import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="card mb-2" style={{ maxWidth: "90%", margin: "0 auto" }}>
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
    );
};

export default BookCard;