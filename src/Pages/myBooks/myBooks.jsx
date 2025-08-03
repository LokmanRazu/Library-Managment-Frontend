import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBook } from '../../utils/liveBookSlice';
import SingleBook from './singleBook';

const MyBooks = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.liveBook);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllBook());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div className="text-center mt-10">Loading books...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 mt-8">
      {books?.length > 0 ? (
        books.map((book) => (
          <SingleBook book={book} key={book._id || book.id} />
        ))
      ) : (
        <p className="text-center text-gray-500">No books found</p>
      )}
    </div>
  );
};

export default MyBooks;
