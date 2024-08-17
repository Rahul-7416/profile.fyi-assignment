import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../constants/constants.js';

function Signup() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
    fullname: ""
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
    const url = `${BASE_URL}/api/v1/users/register`;

    if (!formDetails.email || !formDetails.password || !formDetails.fullname) {
      toast.error("Please provide all the details", {
        position: "bottom-center"
      });
      return;
    }

    try {
      console.log('Requesting:', url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formDetails), 
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message || "Registration failed");
      }

      const responseObj = await response.json();
      if (responseObj.statusCode === 200) {
        setTimeout(() => {
          navigate('/login', {
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

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="fullname">
                Full Name*
              </label>
              <input
                type="text"
                id="fullname"
                name='fullname'
                onChange={handleChange}
                required
                placeholder='Rahul Kumar'
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name='email'
                onChange={handleChange}
                required
                placeholder='example@mail.com'
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
                required
                placeholder='set a password'
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
              >
                Sign Up
              </button>
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
