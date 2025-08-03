import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBook, resetBookStatus } from '../../utils/liveBookSlice';

const AddBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status, user } = useSelector((state) => state.auth);
  const { status: bookStatus, error: bookError } = useSelector((state) => state.liveBook);

  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [ratting, setRatting] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!author.trim()) errors.author = 'Author is required';
    if (!type.trim()) errors.type = 'Book type is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!ratting.trim()) errors.ratting = 'Rating is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      console.error('User not logged in or user.id missing');
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({}); // clear previous errors

    const formData = new FormData();
    formData.append('img', img);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('ratting', ratting);
    formData.append('user', user.id);

    dispatch(createBook(formData));
  };

  useEffect(() => {
    if (status === 'succeeded' && !user) {
      navigate('/login');
    }
  }, [status, user, navigate]);

  useEffect(() => {
    if (bookStatus === 'succeeded') {
      navigate('/');
      dispatch(resetBookStatus());
    }
  }, [bookStatus, navigate]);

  return (
    <form className='md:w-1/2 w-full font-Poppins p-12 mx-auto' onSubmit={handleSubmit}>
      <h2 className='font-semibold text-2xl mb-4 text-center'>Add new Book</h2>

      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Title</label>
        <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter a Title of Book' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
        {formErrors.title && <p className='text-red-500 text-sm mt-1'>{formErrors.title}</p>}
      </div>

      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Author</label>
        <input type="text" name='author' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Enter an Author' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
        {formErrors.author && <p className='text-red-500 text-sm mt-1'>{formErrors.author}</p>}
      </div>

      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Book Type</label>
        <input type="text" name='type' value={type} onChange={(e) => setType(e.target.value)} placeholder='e.g. Fantasy, Non-Fiction' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
        {formErrors.type && <p className='text-red-500 text-sm mt-1'>{formErrors.type}</p>}
      </div>

      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Description</label>
        <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter a description' className='w-full pl-2 pr-5 border-2 border-black outline-none' rows='5'></textarea>
        {formErrors.description && <p className='text-red-500 text-sm mt-1'>{formErrors.description}</p>}
      </div>

      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Rating</label>
        <input type="text" name='ratting' value={ratting} onChange={(e) => setRatting(e.target.value)} placeholder='Enter a rating' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
        {formErrors.ratting && <p className='text-red-500 text-sm mt-1'>{formErrors.ratting}</p>}
      </div>

      <div className='mb-4 flex gap-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Upload an Image (Optional)</label>
        <input type="file" name='img' accept='image/*' onChange={(e) => setImg(e.target.files[0])} className='outline-none' />
      </div>

      {error && <p className='font-medium text-red-500 text-base mb-4'>{error}</p>}
      {bookError && <p className='font-medium text-red-500 text-base mb-4'>{bookError}</p>}

      <button type='submit' disabled={!user} className='px-6 py-2 bg-black text-white font-semibold'>Add book</button>
    </form>
  );
};

export default AddBooks;
