import React from 'react';
import { useSelector } from 'react-redux';

function PriceDetail() {
    const allItems = useSelector(state => state.cartItems.allItems);

    let totalItems = 0;
    let totalCost = 0;
    let totalDiscount = 0;

    allItems.forEach(item => {
        totalItems += item.quantity;
        totalCost += (item.price)*(item.quantity);
        totalDiscount += (item.discount)*(item.quantity);
    });

    return (
        <div className='p-4 flex flex-col gap-4 border-2 bg-white'>
            <div className='text-xl font-semibold border-b-2 text-gray-600'>
                PRICE DETAILS
            </div>
            <div className='flex justify-between text-lg'>
                <span>Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span>₹{totalCost.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-lg'>
                <span>Discount</span>
                <span className='text-green-600'>- ₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-lg font-semibold border-t-2 border-b-2 border-dashed py-2'>
                <span>Total Amount</span>
                <span>₹{(totalCost - totalDiscount).toFixed(2)}</span>
            </div>
            <div className='text-lg font-semibold text-green-600'>
                <p>You will save ₹{totalDiscount.toFixed(2)} on this order</p>
            </div>
            <button
                className='p-3 w-full rounded-sm bg-yellow-400'
            >
                Place Order
            </button>
        </div>
    );
}

export default PriceDetail;
