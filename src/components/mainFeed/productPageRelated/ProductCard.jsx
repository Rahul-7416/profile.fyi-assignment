import React, { useState } from 'react';
import { FaCartPlus, FaCartShopping } from 'react-icons/fa6';
import { RiStarSFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { modifyItems } from '../../../store/cartItemsSlice.js';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../constants/constants.js';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const addedToCart = useSelector(state => state.cartItems.addedToCart[product.id]);
    const currentAllItems = useSelector(state => state.cartItems.allItems);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCartClick = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(`${BASE_URL}/api/v1/products/add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    category: product.category,
                    price: product.price,
                    discount: Number(discount),
                    quantity: 1,
                    rating: product.rating.rate,
                }),
                credentials: 'include'
            });
    
            if (response.ok) {
                const data = await response.json();
                const updatedItems = [...currentAllItems, data.data];
                dispatch(modifyItems({ allItems: updatedItems, itemId: product.id }));
                toast("Product added to the cart", {
                    position: "bottom-center"
                });
            } else {
                const errorData = await response.json();
                console.error("Error adding product to cart:", errorData.message);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error.message);
        }
    };
    

    const randomDiscount = (product.price * ((((Math.random() + 1) * 20) / 100) - (((Math.random() + 1) * 3) / 100)));
    const discount = randomDiscount.toFixed(2);

    return (
        <div
            className={`relative w-[300px] h-[450px] border-2 bg-white p-2 sm:hover:shadow-xl rounded-lg cursor-pointer overflow-hidden transition-all duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='p-1 h-[250px]'>
                <img src={product.image} className='block h-full w-full object-contain mx-auto' />
                <div
                    className='mt-6 px-8 py-2 flex flex-col gap-2'
                >
                    <p className="font-semibold">{product.title.substring(0,35)}...</p>
                <div className='flex items-center gap-3'>
                    <p className='text-green-500 font-bold'>₹{(product.price - discount).toFixed(2)}</p>
                    <p className='text-red-500 line-through'>₹{product.price}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p>Discount:&#160;</p>
                    <p className='text-green-500 font-semibold'>₹{discount}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p>{product.rating.rate}</p>
                    <RiStarSFill className='w-5 h-5' />
                </div>
                
            </div>
            </div>
            <div
                className={`absolute bottom-0 left-0 w-full bg-white px-8 py-2 flex flex-col items-start gap-1 transition-transform duration-300 
                            ${isHovered ? 'translate-y-0' : 'translate-y-0 sm:translate-y-full'}`}
            >

                <p className="font-semibold">{product.title}</p>
                <div className='flex items-center gap-3'>
                    <p className='text-green-500 font-bold'>₹{(product.price - discount).toFixed(2)}</p>
                    <p className='text-red-500 line-through'>₹{product.price}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p>Discount:&#160;</p>
                    <p className='text-green-500 font-semibold'>₹{discount}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p>{product.rating.rate}</p>
                    <RiStarSFill className='w-5 h-5' />
                </div>
                {
                    addedToCart ? (
                        <Link to={'/cart'}>
                            <button className='p-2 rounded-md self-center flex gap-1 items-center mt-2 ml-14 bg-red-400 border-2 border-red-400 sm:hover:bg-red-100'>
                                <FaCartShopping className='w-5 h-5' />
                                <p>Go to Cart</p>
                            </button>
                        </Link>
                    ) : (
                        <button onClick={handleAddToCartClick} className='p-2 rounded-md self-center flex gap-1 items-center mt-2 bg-red-400 border-2 border-red-400 sm:hover:bg-red-100'>
                            <FaCartPlus className='w-5 h-5' />
                            <p>Add to Cart</p>
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default ProductCard;
