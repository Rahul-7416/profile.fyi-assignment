import React, { useEffect, useState } from 'react';
import { CartItem, EmptyCart, PriceDetail } from '../components/index.js';
import { useSelector } from 'react-redux';

function CartSection() {
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const cartItems = useSelector(state => state.cartItems.allItems);
    
    useEffect(() => {
        setIsCartEmpty(cartItems.length === 0);
    }, [cartItems]);

    return (
        <>
            {
                isCartEmpty ? (
                    <div className='h-full flex items-center justify-center bg-slate-50 p-4'>
                        <EmptyCart />
                    </div>
                ) : (
                    <div className='p-2 flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col gap-3 w-full md:w-[50%]'>
                            {
                                cartItems.map(item => (
                                    <CartItem key={item.id} product={item} />
                                ))
                            }
                        </div>
                        <div className='w-full md:w-[50%] mt-4 md:mt-0'>
                            <PriceDetail />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default CartSection;
