import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h2 className="font-semibold text-lg mb-4">About Us</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-yellow-400">Company Info</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-yellow-400">Careers</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-yellow-400">Press Releases</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Help</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">Customer Service</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">Returns</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">FAQs</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Follow Us</h2>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-yellow-400">Facebook</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">Twitter</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-gray-500 text-sm">
          © 2024 ShopNow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
