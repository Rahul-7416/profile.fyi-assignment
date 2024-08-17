import React, { useState } from 'react';
import { FaCartPlus, FaCartShopping } from 'react-icons/fa6';
import { RiStarSFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { modifyItems } from '../../../store/cartItemsSlice.js';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../constants/constants.js';

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const addedToCart = useSelector(state => state.cartItems.addedToCart[product.id]);
    const currentAllItems = useSelector(state => state.cartItems.allItems);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCartClick = async (event) => {
        event.preventDefault();
    
        try {
            // Send a POST request to the backend to add the product to the cart
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
    
            // Check if the response is okay (status 201)
            if (response.ok) {
                const data = await response.json();
    
                // Update the Redux store with the new product added to the cart
                const updatedItems = [...currentAllItems, data.data];
                dispatch(modifyItems({ allItems: updatedItems, itemId: product.id }));
                console.log(updatedItems);
            } else {
                // Handle errors
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
            className={`w-[250px] bg-white p-2 sm:hover:shadow-xl rounded-lg cursor-pointer overflow-hidden transition-all duration-300
                ${isHovered ? 'h-auto' : 'h-[350px]'} sm:w-[220px] md:w-[180px] lg:w-[250px]`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='p-1 h-[250px]'>
                <img src={product.image} className='block h-full w-full object-contain mx-auto' />
            </div>
            <div className={`px-8 py-2 flex flex-col items-start gap-1 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                <p className="">{product.title}</p>
                <div
                    className='flex items-center gap-3'
                >
                    <p className='text-green-500 font-bold'>${(product.price - discount).toFixed(2)}</p>
                    <p className='text-red-500 line-through'>${product.price}</p>
                </div>
                <div
                    className='flex items-center gap-3'
                >
                    <p className=''>Discount:&#160;</p>
                    <p className='text-green-500 font-semibold'>${discount}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p>{product.rating.rate}</p>
                    <RiStarSFill className='w-5 h-5' />
                </div>
                {
                    addedToCart ? (
                        <Link to={'/cart'}>
                            <button className='p-2 rounded-md self-center flex gap-1 items-center mt-2 bg-red-400 border-2 border-red-400 sm:hover:bg-red-100'>
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
