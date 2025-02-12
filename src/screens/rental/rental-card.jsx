import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { LuCalendarArrowUp, LuCalendarArrowDown } from "react-icons/lu";
import BookRentalCard from '../book/book-rentals-card.jsx';
import { FaCashRegister } from "react-icons/fa6";

const RentalCard = ({ rental, expandedRentals, toggleExpand, handleOpenModal }) => {
    return (
        <motion.div
            key={rental.id}
            className="card mb-3 mx-auto"
            style={{ maxWidth: "80%", overflow: "hidden" }}
            initial={{ height: "auto" }}
            animate={{ height: expandedRentals[rental.id] ? "auto" : "fit-content" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div className="card-rental modern-card d-flex align-items-center p-3">
                <div className="text-left">
                    <p className="card-date">
                        <b><LuCalendarArrowUp /> {rental.start_date}</b>
                    </p>
                    <p className="card-date">
                        <b><LuCalendarArrowDown /> {rental.end_date}</b>
                    </p>
                </div>
                <div className="text-center status-container">
                    <span className={`status ${rental.status}`}>
                        {rental.status === 'f' ? 'Finished' : rental.status === 'n' ? 'Not payed' : 'In Progress'}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: "1rem" }} >
                    {rental.status !== 'f' && (
                        <button className="btn btn-light">
                            <FaCashRegister onClick={() => handleOpenModal(rental.id)} />
                        </button>
                    )}
                    <button className="btn btn-light" onClick={() => toggleExpand(rental.id)}>
                        {expandedRentals[rental.id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {expandedRentals[rental.id] && rental.book && (
                    <motion.div
                        className="p-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {rental.book.map((book) => (
                            <BookRentalCard key={book.id} book={book} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
};

export default RentalCard;