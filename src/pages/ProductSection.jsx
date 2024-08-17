import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/index.js';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'GET'
        });
        const responseArr = await response.json();

        if (response.status === 200) {
          setAllProducts(responseArr);
        }
      } catch (error) {
        console.log('Error in fetching all products: ', error);
      }
    }
    getAllProducts();
  }, []);

  useEffect(() => {
    if (location.state?.showLoggedInMessage) {
      toast.success('Logged in successfully', {
        position: "bottom-center"
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <div className='p-2 flex gap-2 bg-slate-50'>
        <div className={`fixed z-50 top-0 left-0 bg-white h-full w-[70%] transition-transform duration-300 sm:w-[30%] ${isAsideOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className='flex justify-between p-4 border-b'>
            <p>Aside Section Content</p>
            <FaTimes className="cursor-pointer" onClick={() => setIsAsideOpen(false)} />
          </div>
          {/* Add other aside content */}
        </div>

        <div className='hidden sm:flex p-3 bg-white h-full min-h-96 w-[30%]'>
          {/* Static Aside content for larger screens */}
          Aside Section Content
        </div>

        <div className='bg-white h-full p-2 flex flex-wrap justify-center gap-2 sm:w-[70%]'>
          {/* Render multiple ProductCard components */}
          {
            allProducts.map((item) => (
              <ProductCard key={item.id} product={item} setIsLoading />
            ))
          }
        </div>

        {/* Mobile view menu icon */}
        <FaBars className={`${isAsideOpen ? 'hidden' : 'block'} sm:hidden fixed top-4 left-4 z-50`} onClick={() => setIsAsideOpen(true)} />
      </div>
    </>
  );
}

export default ProductSection;