import React from 'react';

const BookRentalCard = ({ book }) => {
    return (
        <div className="col">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-img-container">
                    <img
                        src={book.image_url}
                        className="card-img-top rounded-3 img-fluid"
                        alt={book.title}
                    />
                </div>
                <div className="card-body p-4">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">
                        <strong className="card-text" style={{ fontSize: "20px" }}>{book.author}</strong>
                        <br />
                        <p className="card-text2" style={{ opacity: "0.8", marginLeft: "2%" }}>{book.publisher}, {book.publication_year}</p>
                        <hr className="divider-light" />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <p className="card-text2" style={{ marginLeft: "2%", color: "rgb(50, 50, 50)" }}>{book.genre}</p>
                            {(book.available > 0 ? (
                                <span style={{
                                    backgroundColor: "#D4EDDA",
                                    color: "#155724",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    margin: "0 10px"
                                }}>
                                    Available
                                </span>)
                                : (
                                    <span style={{
                                        backgroundColor: "#F8D7DA",
                                        color: "#721C24",
                                        padding: "5px 10px",
                                        borderRadius: "10px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        margin: "0 10px"
                                    }}>
                                        Unavailable
                                    </span>)
                            )}
                            <b className="card-text2" style={{ marginRight: "2%", color: "rgb(50, 50, 50)" }}>{book.available}/{book.quantity}</b>
                        </div>
                        <hr className="divider-light" />
                        <strong style={{ marginLeft: "80%", fontSize: "20px" }}>R${book.price}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookRentalCard;