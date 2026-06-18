import React from 'react';

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5 px-8 md:px-16 border-b border-gray-200 bg-white">
        <div className="text-3xl font-bold tracking-tighter">
          hh<span className="text-green-500">.</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
            Log in
          </button>
          <button className="px-6 py-2.5 rounded-full bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black transition-colors">
            Sign up
          </button>
        </div>
      </nav>
  )
}

function HeroSection() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 mt-16 lg:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left: Headline */}
          <div className="flex flex-col items-end text-right">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-[#222]">
              Stay<br />Informed,<br />Stay Inspired
            </h1>
            <p className="text-gray-500 max-w-[260px] text-sm leading-relaxed">
              Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
            </p>
          </div>

          {/* Center: Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-[340px] h-[480px] rounded-4xl overflow-hidden shadow-sm">
              {/* ใส่ URL รูปภาพของคุณแทนที่ src ด้านล่างนี้ได้เลย */}
              <img 
                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Author with cat in autumn forest" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Author Info */}
          <div className="flex flex-col items-start pr-4 lg:pr-12">
            <span className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase mb-1">
              -Author
            </span>
            <h2 className="text-2xl font-bold mb-4 text-[#222]">Thompson P.</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>

        {/* Latest Articles Section */}
        <div className="mt-28">
          <h3 className="text-2xl font-bold text-[#222] mb-6">Latest articles</h3>
          
          {/* Filter & Search Bar Container */}
          <div className="bg-[#F4F4F4] rounded-2xl p-3 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Tabs */}
            <div className="flex space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              <button className="px-6 py-2 bg-[#E2E2E2] text-gray-800 rounded-xl text-sm font-semibold whitespace-nowrap">
                Highlight
              </button>
              <button className="px-6 py-2 text-gray-500 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                Cat
              </button>
              <button className="px-6 py-2 text-gray-500 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                Inspiration
              </button>
              <button className="px-6 py-2 text-gray-500 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                General
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-[300px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-5 pr-12 py-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm shadow-sm"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 pb-20">
      {/* Navigation Bar */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
    </div>
  );
}

export default App;
