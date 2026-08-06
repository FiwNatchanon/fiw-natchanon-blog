

export function HeroSection() {
    return (
      <main className="max-w-9xl mx-auto px-6 md:px-12 mt-16 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Left: Headline */}
            <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
              <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 text-[#222]">
                Stay<br /> Informed,<br />Stay Inspired
              </h1>
              <p className="text-gray-500 max-w-75 text-lg font-medium leading-relaxed">
                Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
              </p>
            </div>
  
            {/* Center: Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-85 h-120 rounded-4xl overflow-hidden shadow-sm">
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
              <h2 className="text-3xl font-bold mb-4 text-[#222]">Natchano Y.</h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-4">
                I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
              </p>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
              </p>
            </div>
          </div>       
        </main>
    )
}