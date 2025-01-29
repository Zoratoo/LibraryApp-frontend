import React, { useEffect, useState } from 'react';
import Page from '../templates/page';
import '../css/books.css';
import { fetchBooks, fetchGenres } from '../services/books-apis';

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
                    <input
                        type="text"
                        name="title"
                        className="form-control me-2"
                        placeholder="Filter by Title"
                        value={filter.title}
                        onChange={handleFilterChange}
                        style={{ width: '60%' }}
                    />
                    <select
                        name="genre"
                        className="form-control ms-2"
                        value={filter.genre}
                        onChange={handleFilterChange}
                        style={{ width: '20%' }}
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
                                <div className="card shadow-sm border-light rounded-3">
                                    <img src={book.image_url} className="card-img-top" alt={book.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">
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