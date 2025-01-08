import React, { useState } from 'react';
import { LuLeaf, LuMenu } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/userSlice';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const user=useSelector(state=>state.user);
  const token = localStorage.getItem('token');
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('donation');

      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <LuLeaf className="h-6 w-6 text-green-500" />
          <span className="text-lg">EcoBite</span>
        </a>
        <nav className="hidden gap-6 items-center md:flex">
          <p className="text-sm font-medium hover:underline underline-offset-4">
          {user.user?  `Welcome ${user.user.name}`: "Welcome"}
          </p>
          {
            user.user ? <button onClick={handleSubmit}  className="text-sm bg-green-500 hover:bg-green-400 rounded text-white py-2 px-2 font-medium underline-offset-4">
            Logout
          </button> :<Link to='/login' ><button className="text-sm bg-green-500 hover:bg-green-400 rounded text-white py-2 px-2 font-medium underline-offset-4">
            Join Now
          </button></Link>
          }
        </nav>
        <button className="md:hidden" onClick={toggleSheet}>
          <LuMenu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </button>
        {isSheetOpen && (
          <div className="absolute right-0 top-16 w-64 bg-white shadow-md ">
            <div className="grid gap-6 p-6">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={toggleSheet}>
                Welcome
              </a>
              <a href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={toggleSheet}>
                Map
              </a>
              <a href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={toggleSheet}>
                Chat
              </a>
              <a href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={toggleSheet}>
                Testimonials
              </a>
              <a href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={toggleSheet}>
                Join Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
