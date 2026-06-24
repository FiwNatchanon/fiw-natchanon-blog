import { FaLinkedin, FaGithub, FaGoogle } from 'react-icons/fa'; 

export function Footer() {
  return (
    <footer className="w-full bg-[#F4F4F4] py-8 px-6 md:px-12 mt-16 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-6">
        <span className="text-sm font-semibold text-gray-800">Get in touch</span>
        
        {/* ส่วนแสดง Icons */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors">
            <FaLinkedin size={15} />
          </a>
          <a href="https://github.com/FiwNatchanon" target='_blank' className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors">
            <FaGithub size={15} />
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors">
            <FaGoogle size={15} />
          </a>
        </div>
      </div>

      <div className="mt-6 md:mt-0">
        <a href="#" className="text-sm font-semibold text-gray-800 underline decoration-1 underline-offset-4 hover:text-black">
          Home page
        </a>
      </div>
    </footer>
  );
}