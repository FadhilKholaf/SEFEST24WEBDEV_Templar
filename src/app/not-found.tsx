import React from 'react';
import Navbar from './(main)/components/Navbar';
import Footer from './(main)/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="w-screen h-screen flex justify-center items-center">
        <h2 className='text-6xl font-bold text-white'>404 | <span className='text-4xl font-semibold'>Not Found</span></h2> 
      </main>
      <Footer />
    </>
  );
}
