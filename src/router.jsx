import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from './Pages/Home/Home';
import Books from "./Pages/Browsebook/Books";
import AddBooks from "./Pages/Addbooks/AddBooks";
import BookDetail from "./Pages/Bookdetail/BookDetail";
import Login from "./Pages/sign/login";
import Error from "./Pages/Error/Error";
import BookPage from "./Components/BookPage";
import SignUp from "./Pages/sign/sginUp";
import MyBooks from "./Pages/myBooks/myBooks";
const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/browsebook',
                element:<Books />
            },{
                path:'/addbooks',
                element:<AddBooks />
            },{
                path:'/book/:id',
                element:<BookDetail />
            },{
                path:'/books/:catergory',
                element:<BookPage />
            },{
                path:'/login',
                element:<Login />
            },{
                path:'signup',
                element:<SignUp />
            },{
                path:'myBooks',
                element:<MyBooks />
            }

        ],
        errorElement:<Error />
    },
    
])

export default router;