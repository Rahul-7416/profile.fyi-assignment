import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import {
  Login,
  Signup,
  AuthLayout,
} from './components/index.js';

import {
  CartSection,
  ProductSection
} from './pages/index.pages.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthLayout authentication={false} >
        <Login/>
      </AuthLayout>
    )
  },
  {
    path: '/signup',
    element: (
      <AuthLayout authentication={false} >
        <Signup/>
      </AuthLayout>
    )
  },
  {
    path: '/',
    element: (
      <AuthLayout authentication >
        <App/>
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: (
          <AuthLayout authentication >
            <ProductSection/>
          </AuthLayout>
        )
      },
      {
        path: '/cart',
        element: (
          <AuthLayout authentication >
            <CartSection/>
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer/>
    </Provider>
  </StrictMode>,
)
