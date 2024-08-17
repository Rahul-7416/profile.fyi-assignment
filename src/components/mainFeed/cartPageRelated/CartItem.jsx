import React, { useState } from 'react';
import { RiStarSFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../../../store/cartItemsSlice.js';
import { BASE_URL } from '../../../constants/constants.js';

function CartItem({ product }) {
    const [counter, setCounter] = useState(product.quantity || 1); // Initialize with product quantity -> intially it will be 1
    const dispatch = useDispatch();

    const handleSubClick = async (event) => {
        event.preventDefault();
        if (counter > 1) {
            const newCounter = counter - 1;
            setCounter(newCounter);

            try {
                const response = await fetch(`${BASE_URL}/api/v1/products/update-product`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: product.id, quantity: newCounter }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to update product quantity');
                }

                const data = await response.json();
                dispatch(updateQuantity({ itemId: product.id, quantity: newCounter }));
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            alert('Cannot reduce below 1');
        }
    };

    const handleAddClick = async (event) => {
        event.preventDefault();
        if (counter < 10) {
            const newCounter = counter + 1;
            setCounter(newCounter);

            try {
                const response = await fetch(`${BASE_URL}/api/v1/products/update-product`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: product.id, quantity: newCounter }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to update product quantity');
                }

                const data = await response.json();
                dispatch(updateQuantity({ itemId: product.id, quantity: newCounter }));
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            alert('Maximum quantity reached');
        }
    };

    const handleRemoveClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/v1/products/remove-product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: product.id }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }

            const data = await response.json();
            dispatch(removeItem({ itemId: product.id }));
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    return (
        <div className='p-2 flex flex-col md:flex-row gap-2 items-center border-b border-gray-200'>
            <img
                src={product.image}
                className='h-[120px] w-[120px] object-contain'
                alt={product.title}
            />
            <div className='flex flex-col gap-2 w-full'>
                <p className='text-sm md:text-base'>{product.title}</p>
                <div className='flex gap-2 text-sm md:text-base'>
                    <p className='line-through text-gray-500'>${product.price.toFixed(2)}</p>
                    <p>${(product.price - product.discount).toFixed(2)}</p>
                </div>
                <p className='text-sm md:text-base text-green-600'>${product.discount} saved</p>
                <div className='flex gap-1 items-center'>
                    <p className='text-sm md:text-base'>{product.rating.rate}</p>
                    <RiStarSFill className='w-5 h-5 text-yellow-500' />
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <div className='flex items-center gap-1'>
                        <button
                            className='rounded-full border-2 w-6 h-6 flex items-center justify-center cursor-pointer'
                            onClick={handleSubClick}
                        >
                            -
                        </button>
                        <input
                            className='w-10 text-center border-2 rounded-sm'
                            value={counter}
                            readOnly
                        />
                        <button
                            className='rounded-full border-2 w-6 h-6 flex items-center justify-center cursor-pointer'
                            onClick={handleAddClick}
                        >
                            +
                        </button>
                    </div>
                    <div 
                        className='text-red-500 cursor-pointer'
                        onClick={handleRemoveClick}
                    >
                        REMOVE
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
