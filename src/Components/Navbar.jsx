import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../utils/authSlice';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(signout());
        navigate('/');
    };

    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className="w-full">
            <div className="bg-white bg-opacity-65 font-Poppins flex justify-between items-center p-5 sticky top-0">
                <img src="/public/assets/ScienceBooks/logo.png" alt="eBook" className="w-14 h-14" />
                <ul className="hidden md:flex items-center gap-5 text-medium font-base cursor-pointer">
                    <Link to='/' className="hover:scale-110 duration-500 hover:text-red-500"><li> Home</li></Link>
                    <Link to='/browsebook' className="hover:scale-110 duration-500 hover:text-red-500"><li>Browse Book</li></Link>
                 

                    {user ? (
                        <>
                           <Link to="/addbooks" className="hover:scale-110 duration-500 hover:text-red-500"><li>Add books</li></Link>
                            <Link to="/myBooks" className="hover:scale-110 duration-500 hover:text-red-500">
                                <li>MyBooks</li>
                            </Link>
                            <li onClick={handleLogout} className="hover:scale-110 duration-500 hover:text-red-500 cursor-pointer">
                                Logout
                            </li>
                        </>
                    ) : (
                        <Link to="/login" className="hover:scale-110 duration-500 hover:text-red-500">
                            <li>Login</li>
                        </Link>
                    )}

                </ul>
                <div className="md:hidden">
                    <HiOutlineMenu className="w-8 h-8" onClick={() => setIsOpen(!isOpen)} />
                </div>

            </div>
            <div className="p-2">
                {
                    isOpen &&
                    <ul className="md:hidden flex flex-col justify-start gap-5 bg-black rounded-sm text-white w-full text-medium font-base cursor-pointer p-3">
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/browsebook'><li>Browse Book</li></Link>
                       
                        {user ? (
                            <>
                                 <Link to="/addbooks"><li>Add books</li></Link>
                                <Link to="/myBooks"><li>MyBooks</li></Link>
                                <li onClick={handleLogout}>Logout</li>
                            </>
                        ) : (
                            <Link to="/login"><li>Login</li></Link>
                        )}

                    </ul>
                }
            </div>
        </nav>
    )
}
export default Navbar;