import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Client, Databases } from 'appwrite';

const appwriteClient = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Set your Appwrite endpoint
  .setProject('672e05b7001bd6a46b34'); // Set your project ID

const databases = new Databases(appwriteClient);

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure both date and time are selected
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your reservation.');
      return;
    }
  
    // Format the date to 'YYYY-MM-DD'
    const formattedDate = selectedDate.toISOString().split('T')[0]; // e.g., '2024-11-10'
    
    // Format the time to 'HH:mm'
    const formattedTime = selectedTime.toISOString().split('T')[1].slice(0, 5); // e.g., '18:30'
    
    // Combine both to form the dateTime string (e.g., '2024-11-10 18:30')
    const dateTime = `${formattedDate} ${formattedTime}`;
  
    // Convert guests to a number
    const guests = parseInt(formData.guests, 10);
  
    // Log the full reservation data to debug
    const reservation = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: guests,      // Ensure guests is a number
      specialRequests: formData.specialRequests,
      dateTime: dateTime,  // Combined date and time in one field
    };
  
    // Log the reservation object before submission
    console.log('Reservation Data:', reservation);
  
    try {
      // Create a new reservation in Appwrite
      const response = await databases.createDocument(
        '672e06430023b0353f74',
        '672e064a002426795cf4', // Name of the collection in Appwrite
        'unique()',      // Unique document ID (you can replace with a custom ID if needed)
        reservation      // Document data
      );
  
      // Log the successful response from Appwrite
      console.log('Reservation submitted successfully:', response);
      alert('Reservation submitted successfully!');
  
      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        specialRequests: '',
      });
    } catch (error) {
      // Log the error if something goes wrong
      console.error('Error creating reservation:', error);
      alert('There was an error submitting your reservation. Please try again.');
    }
  };
      
  

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Make a Reservation</h1>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="mb-6">
  <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="MMMM d, yyyy"
    minDate={new Date()}
    className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
  />
</div>

<div className="mb-6">
  <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
  <DatePicker
    selected={selectedTime}
    onChange={(time) => setSelectedTime(time)}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={30}
    timeCaption="Time"
    dateFormat="h:mm aa"
    className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
  />
</div>


            <div className="mb-6">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-400 mb-2">Number of Guests</label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                min="1"
                max="20"
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-400 mb-2">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-gold text-black px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition duration-300">
              Submit Reservation
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}