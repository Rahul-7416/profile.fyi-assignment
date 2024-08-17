import React, { useEffect, useState } from 'react';
import { FaCartShopping, FaShopify } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../constants/constants.js';

function Navbar({ isLoggedIn = true}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(null);
  const allItems = useSelector(state => state.cartItems.allItems);

  useEffect(() => {
    if (allItems.length === 0) setTotalItems(null);
    else setTotalItems(allItems.length);
  }, [allItems]);

  const handleLogoutBtn = async () => {
    try {
      const url = `${BASE_URL}/api/v1/users/logout`;
  
      // Sending the request with credentials (cookies)
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include' // This will include cookies with the request
      });
  
      if (!response.ok) {
        console.log('Response Status:', response.status); // Debugging line
        console.log('Response Data:', await response.text()); // Debugging line
  
        // Manually remove the cookies from the frontend
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
        dispatch(logout());
  
        setTimeout(() => {
          toast.success('Logged out successfully', {
            position: "bottom-center"
          });
        }, 1000);
  
        navigate('/login');
        return;
      }
  
      // If the response is successful, log out and show a success message
      dispatch(logout());
      toast.success('Logged out successfully', {
        position: "bottom-center"
      });
  
    } catch (error) {
      console.log('Logout Error: ', error);
      toast.error('Logout failed. Please try again.', {
        position: "bottom-center"
      });
    }
  };
  
  

  return (
    <>
      <div className='flex justify-between items-center p-4 bg-blue-600 sticky top-0 z-50'>
        {/* Logo */}
        <Link to={'/'}>
          <div className='flex items-center gap-2 cursor-pointer'>
            <FaShopify className='w-6 h-6 text-white' />
            <p className='text-white text-xl font-semibold'>ShopNow</p>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <form className='hidden sm:flex flex-grow max-w-lg ml-10 rounded-md overflow-hidden'>
          <input
            className='flex-grow px-4 py-2 text-black outline-none'
            type='text'
            placeholder='Search your desired product...'
          />
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 px-4'>
            <IoMdSearch className='w-6 h-6 text-white' />
          </button>
        </form>

        {/* Mobile Search Icon */}
        <div className='flex sm:hidden items-center cursor-pointer' onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <IoMdSearch className='w-6 h-6 text-white' />
        </div>

        {/* Cart and Logout */}
        <div className='flex items-center gap-6 ml-4'>
          <Link to={'/cart'}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <div className='relative'>
                <FaCartShopping className='w-6 h-6 text-white' />
                {totalItems && (
                  <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5'>
                    {totalItems}
                  </span>
                )}
              </div>
              <p className='text-white hidden sm:block'>Cart</p>
            </div>
          </Link>
          {isLoggedIn && (
            <button onClick={handleLogoutBtn} className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>
              Logout
            </button>
          )}
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <form className='flex sm:hidden justify-between items-center px-4 py-2 bg-white w-full mt-4 absolute left-0 top-full'>
            <input
              className='flex-grow px-2 py-1 text-black outline-none'
              type='text'
              placeholder='Search...'
            />
            <button type='submit'>
              <IoMdSearch className='w-6 h-6 text-blue-500' />
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Navbar;
