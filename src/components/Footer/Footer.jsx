import React from "react";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="w-full bg-[#181818] text-white py-8 border-t border-[#5E5E5E]   selection:bg-red-500 selection:text-black" >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        
        <div className="flex items-center text-2xl font-semibold">
          <p className="font-[Pavanam] tracking-wide">Ghost</p>
          <p className="font-[Pattaya] hover:text-[#D82934]">Type</p>
        </div>

        <div className="flex gap-6 text-sm mt-4 md:mt-0">
          <Link to="/about" className="hover:text-[#D82934] transition selection:bg-red-500  p-4  selection:bg-red-500 selection:text-black">
            About
          </Link>
          <a href="#" className="hover:text-[#D82934] transition selection:bg-red-500  p-4  selection:bg-red-500 selection:text-black">
            Contribute
          </a>
          <a href="https://github.com/swamimalode07/GhostType" className="hover:text-[#D82934] transition selection:bg-red-500 selection:text-black p-4">
            GitHub
          </a>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0  selection:bg-red-500 selection:text-black">
        <a href="https://x.com/SwamiMalode" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#D82934] transition">
          <i className="fab fa-twitter"></i>
        </a>

          <a href="/discord" className="text-xl hover:text-[#D82934] transition">
            <i className="fab fa-discord"></i>
          </a>
          <a href="https://github.com/swamimalode07" className="text-xl hover:text-[#D82934] transition">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-6  selection:bg-red-500 selection:text-black">
        © 2025 GhostType. Built with ❤️ by 
        <a href="https://swamimalode.online/" className="text-white hover:text-[#D82934] transition">
          &nbsp; @swamimalode
        </a>
      </div>
    </footer>
  );
};

export default Footer;
