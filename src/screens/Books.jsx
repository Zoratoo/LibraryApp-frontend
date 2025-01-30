import React, { useEffect, useState } from 'react';
import Page from '../templates/page';
import '../css/books.css';
import { fetchBooks, fetchGenres } from '../services/books-apis';
import { IoIosSearch } from "react-icons/io";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Books(props) {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ title: '', genre: '' });

    useEffect(() => {
        const loadData = async () => {
            try {
                const booksData = await fetchBooks();
                setBooks(booksData);
                setFilteredBooks(booksData);

                const genresData = await fetchGenres();
                setGenres(genresData);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        filterBooks();
    }, [filter]);

    const filterBooks = () => {
        let filtered = books;

        if (filter.title === "" && filter.genre === "")
            setFilteredBooks(books);

        if (filter.title !== "" && filter.genre === "")
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(filter.title.toLowerCase())
            );

        if (filter.title === "" && filter.genre !== "")
            filtered = filtered.filter(book =>
                book.genre.toLowerCase().includes(filter.genre.toLowerCase())
            );

        if (filter.title !== "" && filter.genre !== "")
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
                book.genre.toLowerCase().includes(filter.genre.toLowerCase())
            );

        setFilteredBooks(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilter = { ...filter, [name]: value };
        setFilter(updatedFilter);
    };

    return (
        <Page>
            <div className="container py-5">
                <h1 className="text-center mb-4 custom-title">Books</h1>

                <div className="d-flex mb-4 justify-content-center">
                    <div className="input-group" style={{ width: '60%' }}>
                        <span className="input-group-text" style={{ border: '2px solid #ced4da', backgroundColor: '#fff' }}>
                            <IoIosSearch style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                        </span>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter the title of the book you are looking for..."
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

                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        Loading...
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredBooks.map((book, index) => (
                            <div key={index} className="col">
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
                                            <strong>Author:</strong> {book.author}
                                            <br />
                                            <strong>Publisher:</strong> {book.publisher}
                                            <br />
                                            <strong>Publication Year:</strong> {book.publication_year}
                                            <br />
                                            <strong>Genre:</strong> {book.genre}
                                            <br />
                                            <strong>Quantity:</strong> {book.quantity}
                                            <br />
                                            <strong>Quantity available:</strong> {book.available}
                                            <br />
                                            <strong>Price:</strong> R${book.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Page>
    );
};