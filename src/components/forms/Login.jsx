import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../store/authSlice.js';
import { modifyItems } from '../../store/cartItemsSlice.js';
import { BASE_URL } from "../../constants/constants.js";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${BASE_URL}/api/v1/users/login`;
    const productUrl = `${BASE_URL}/api/v1/products/`;

    if (!formDetails.email || !formDetails.password) {
        toast.error("Please provide all the details", {
            position: "bottom-center"
        });
        return;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(formDetails), 
            credentials: 'include'
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse?.message || "Login failed");
        }

        const responseObj = await response.json();

        if (responseObj.statusCode === 200) {
            const userData = responseObj?.data?.user;
            dispatch(login({userData}));

            const cartResponse = await fetch(productUrl, {
                method: 'GET',
                credentials: 'include'
            });

            const cartResponseObj = await cartResponse.json();
            if (cartResponseObj.statusCode === 200) {
                const allItems = cartResponseObj?.data?.allItems || [];
                dispatch(modifyItems({ allItems }));
            }

            setTimeout(() => {
                navigate('/', {
                    state: {
                      showLoggedInMessage: true
                    }
                  });
            }, 1000);
        } else {
            toast.error(`${responseObj?.data?.message}`, {
                position: "bottom-center"
            });
        }
    } catch (error) {
        console.log('Login Error: ', error);
        toast.error(error.message || "An error occurred during login", {
            position: "bottom-center"
        });
    }
};


  useEffect(() => {
    if (location.state?.showLoggedInMessage) {
      toast.success('Registered successfully, please login to continue...', {
        position: "bottom-center"
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name='email'
              onChange={handleChange}
              placeholder='example@mail.com'
              required
              className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password*
            </label>
            <input
              type="password"
              id="password"
              name='password'
              onChange={handleChange}
              placeholder='your password'
              required
              className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Login
            </button>
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
