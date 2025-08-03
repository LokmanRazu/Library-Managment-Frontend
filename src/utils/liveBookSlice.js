import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios'

export const getAllBook = createAsyncThunk('books/all', async (data, thunkAPI) => {
    try {
        const res = await api.get('books', {params:data});
        console.log('dattaata', res.data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'No Book');
    }
});

export const getBook = createAsyncThunk('books/:id', async (data, thunkAPI) => {
    try {
        const res = await api.get('book/:id', data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'No Book');
    }
});

export const createBook = createAsyncThunk('books', async (formData, thunkAPI) => {
    try {
        const res = await api.post('books', formData,{headers:{'Content-Type': 'multipart/form-data'}});
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Provide all data');
    }
});

export const deleteBook = createAsyncThunk('books/:id', async (data, thunkAPI) => {
    try {
        const res = await api.delete('book', data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'No Book');
    }
});

const liveBookSlice = createSlice({
    name: 'books',
    initialState: {
        books: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetBookStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBook.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload;
            })
            .addCase(getAllBook.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload.books; // <-- Append the new book
            })
    }
})

export const { resetBookStatus } = liveBookSlice.actions
export default liveBookSlice.reducer