import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">About Le Grande</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Le Grande Restaurant" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-6 text-gold">Our Story</h2>
              <p className="text-gray-400 mb-6">
                Founded in 1985 by renowned chef Pierre Leclair, Le Grande has been at the forefront of fine dining for over three decades. Our commitment to culinary excellence and impeccable service has earned us numerous accolades, including three Michelin stars.
              </p>
              <p className="text-gray-400 mb-6">
                At Le Grande, we believe that dining is not just about food, but about creating unforgettable experiences. Our team of passionate chefs, led by Executive Chef Marie Dubois, crafts each dish with precision and creativity, using only the finest locally-sourced and seasonal ingredients.
              </p>
              <p className="text-gray-400">
                From our elegant dining room to our expert sommelier's carefully curated wine list, every aspect of Le Grande is designed to take you on a gastronomic journey that delights all your senses.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gold">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Marie Dubois", role: "Executive Chef", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                { name: "Jean-Luc Bouvier", role: "Sommelier", image: "https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                { name: "Sophie Moreau", role: "Pastry Chef", image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}