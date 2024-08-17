import { Outlet } from 'react-router-dom';
import './App.css';
import {
  Navbar,
  NavbarMenu,
  ProductCard,

  Footer
} from './components/index.js';


function App() {
  return (
    <div className='main-container'>
      <div className='item item-1'>
        <Navbar/>
        <NavbarMenu/>
      </div>

      <div className='item item-2'>
        <Outlet/>
      </div>

      <div className='item item-3'>
        <Footer/>
      </div>
    </div>
  )
}

export default App
