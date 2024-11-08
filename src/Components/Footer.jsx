import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-4">Le Grande</h3>
            <p className="text-gray-400">Experience culinary excellence in every bite.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About', 'Reservations', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-gold transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition duration-300">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition duration-300">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Le Grande. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}