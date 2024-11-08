import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MenuItem = ({ name, description, price }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gold mb-2">{name}</h3>
    <p className="text-gray-400 mb-1">{description}</p>
    <span className="text-gold">{price}</span>
  </div>
);

export default function MenuPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Our Menu</h1>
          
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-gold">Appetizers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <MenuItem 
                name="Foie Gras Terrine" 
                description="With fig compote and toasted brioche" 
                price="$24"
              />
              <MenuItem 
                name="Oysters Rockefeller" 
                description="Half dozen, spinach, Pernod, parmesan" 
                price="$22"
              />
              <MenuItem 
                name="Tuna Tartare" 
                description="Avocado, soy-lime dressing, wonton crisps" 
                price="$20"
              />
              <MenuItem 
                name="Escargots à la Bourguignonne" 
                description="Garlic-herb butter, puff pastry" 
                price="$18"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-gold">Main Courses</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <MenuItem 
                name="Beef Wellington" 
                description="Truffle duxelles, prosciutto, red wine reduction" 
                price="$48"
              />
              <MenuItem 
                name="Dover Sole Meunière" 
                description="Lemon-caper brown butter, haricots verts" 
                price="$52"
              />
              <MenuItem 
                name="Rack of Lamb" 
                description="Herb crust, ratatouille, rosemary jus" 
                price="$46"
              />
              <MenuItem 
                name="Lobster Thermidor" 
                description="Brandy cream sauce, gruyère, duchess potatoes" 
                price="$58"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-8 text-gold">Desserts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <MenuItem 
                name="Crème Brûlée" 
                description="Tahitian vanilla bean, fresh berries" 
                price="$14"
              />
              <MenuItem 
                name="Chocolate Soufflé" 
                description="Grand Marnier crème anglaise" 
                price="$16"
              />
              <MenuItem 
                name="Tarte Tatin" 
                description="Caramelized apples, vanilla ice cream" 
                price="$14"
              />
              <MenuItem 
                name="Cheese Plate" 
                description="Selection of artisanal cheeses, fruit, nuts" 
                price="$22"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}