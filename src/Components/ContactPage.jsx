import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gold">Get in Touch</h2>
              <p className="text-gray-400 mb-8">
                We'd love to hear from you. Whether you have a question about our menu, want to make a reservation, or are interested in private events, our team is here to assist you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-gold mr-4" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gold mr-4" />
                  <span>info@legrande.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gold mr-4" />
                  <span>Afzalpur Takke, Vijayapura, Karnataka 586102</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gold">Send Us a Message</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" required></textarea>
                </div>
                <button type="submit" className="w-full bg-gold text-black px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gold">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15275.988491211245!2d75.6784772455078!3d16.82649883243237!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6ffa88ab4206b%3A0x897c368901ce94!2sHotel%20Le%20Grande!5e0!3m2!1sen!2sin!4v1730908875010!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}