import React, { useEffect, useState } from 'react';
import Page from '../../templates/page.jsx';
import '../../css/books.css';
import { fetchBooks, fetchGenres } from '../../services/books-apis.js';
import ErrorModal from './../../modals/error.jsx';
import BookCard from './book-card.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css";
import SearchBook from '../components/serch-book-input.jsx';

export default function Books(props) {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ title: '', genre: '' });
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                setErrorMessage('Error to find books.');
                setShowErrorModal(true);
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
                book.title.toLowerCase().includes(filter.title.toLowerCase()) ||
                book.author.toLowerCase().includes(filter.title.toLowerCase())
            );

        if (filter.title === "" && filter.genre !== "")
            filtered = filtered.filter(book =>
                book.genre.toLowerCase().includes(filter.genre.toLowerCase())
            );

        if (filter.title !== "" && filter.genre !== "")
            filtered = filtered.filter(book =>
                (book.title.toLowerCase().includes(filter.title.toLowerCase()) ||
                    book.author.toLowerCase().includes(filter.title.toLowerCase())) &&
                book.genre.toLowerCase().includes(filter.genre.toLowerCase())
            );

        setFilteredBooks(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilter = { ...filter, [name]: value };
        setFilter(updatedFilter);
    };

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    return (
        <Page>
            <div className="container py-5">
                <h1 className="text-center mb-4 custom-title">Books</h1>

                <SearchBook filter={filter} handleFilterChange={handleFilterChange} genres={genres} />

                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        Loading...
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredBooks.map((book, index) => (
                            <BookCard key={index} book={book} />
                        ))}
                    </div>
                )}

                <ErrorModal
                    show={showErrorModal}
                    message={errorMessage}
                    onClose={handleCloseModal}
                />
            </div>
        </Page>
    );
}
