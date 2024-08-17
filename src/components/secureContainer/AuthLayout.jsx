import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { quantum } from 'ldrs';
import { useSelector } from 'react-redux';

export default function AuthLayout({children, authentication = false}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    quantum.register();

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate('/login');
        } else if (!authentication && authStatus) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <div
            className='flex justify-center items-center h-full p-[45%]'
        >
            <l-quantum
                size="57"
                speed="1.75" 
                color="#E412F3"
            >

            </l-quantum>
        </div>
    ) : (<>{children}</>);
}