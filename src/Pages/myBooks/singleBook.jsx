
import React from 'react';
import { Link } from 'react-router-dom';

const SingleBook = ({ book }) => {
  return (
    <div className="p-2 border-2 border-gray-500 w-64 shadow-sm hover:scale-105 cursor-pointer h-fit transition-transform duration-200">
      <img
        src={book.img || 'https://via.placeholder.com/150'}
        alt={book.title || 'Book cover'}
        className="w-full h-40 object-cover"
      />
      
      <h3 className="font-semibold text-base font-Poppins mt-2">{book.title}</h3>
      
      <div className="flex gap-2 items-center mt-2 font-Poppins">
        <span className="bg-blue-50 border border-blue-200 px-1 text-xs text-blue-600">Author</span>
        <span className="text-gray-600 text-sm">{book.author}</span>
      </div>

      <p className="font-Poppins text-sm mt-1">
        {book.description?.length > 40
          ? book.description.substring(0, 50) + '...'
          : book.description || 'No description available'}
      </p>

      <p className="font-Poppins text-sm font-medium mt-1 text-orange-500">
        Ratings {book.rating}+
      </p>


    </div>
  );
};

export default SingleBook;
