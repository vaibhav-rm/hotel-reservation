import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-black">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-gold">Le Grande</Link>
          <ul className="flex space-x-6">
            {['Home', 'Menu', 'About', 'Reservations', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="hover:text-gold transition duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}