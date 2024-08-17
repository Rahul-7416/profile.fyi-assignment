import React from 'react';
import { Link } from 'react-router-dom';

function EmptyCart() {
    return (
        <div className='p-4 flex flex-col items-center justify-center gap-4 w-full bg-white'>
            <img
                className='w-44 h-40 mb-4'
                src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90'
                alt='Empty Cart'
            />
            <p className='font-semibold text-2xl text-center'>
                Your Cart is empty!
            </p>
            <p className='text-sm text-center'>
                Add items to it now.
            </p>
            <Link to={'/'}>
                <button className='w-48 p-2 bg-blue-500 text-white rounded-sm text-center'>
                    Shop Now
                </button>
            </Link>
        </div>
    );
}

export default EmptyCart;
