import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-green-500">ResuMatch</span>
      </div>


      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        {/* <button className="text-gray-700 font-medium hover:underline">Sign in</button> */}
        <Link
          to="/upload"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#e6f0fa]">
      <Navbar />

      <main className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            AI Resume Screening
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-4">
            Welcome! This app helps you quickly rank resumes based on a job description.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
            <Link
              to="/upload"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              Get Started
            </Link>
            {/* <button className="border border-gray-400 text-gray-800 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
              Learn More
            </button> */}
          </div>

          {/* Logos */}
          {/* <div className="mt-10 text-gray-500 text-sm">
            <p>Loved by recruiters at</p>
            <div className="flex gap-6 justify-center lg:justify-start mt-2 opacity-70 text-sm">
              <span>Google</span>
              <span>Facebook</span>
              <span>Amazon</span>
              <span>Tesla</span>
              <span>Spotify</span>
            </div>
          </div> */}
        </div>

        {/* Right Image */}
        <div className="relative mt-12 lg:mt-0">
          <div className="w-[300px] sm:w-[350px] md:w-[400px] transform hover:scale-105 transition duration-500">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWiAdVVmixbQ81emwWOiPTJi7BlCwoWPxcvw&s"
              alt="Sample Resume"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;