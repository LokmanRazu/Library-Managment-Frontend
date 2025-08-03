import { configureStore } from "@reduxjs/toolkit"
import bookSlice from "../utils/bookSlice"
import authSlice from "../utils/authSlice"
import liveBookSlice from "../utils/liveBookSlice"
const store = configureStore({
    reducer:{
        book:bookSlice,
        auth:authSlice,
        liveBook:liveBookSlice
    }
})

export default store;