import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./utils/authSlice";
function App() {
  const dispatch = useDispatch();
 useEffect(() => {
    dispatch(fetchCurrentUser()); // 🔄 Load user from cookie on app start
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
} 

export default App
