import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  return (
    <header className="navbar flex justify-between items-center p-2 bg-[#232323] text-white mt-5 ml-5 mr-5 rounded-2xl border-2 border-[#5E5E5E]  selection:bg-red-500 selection:text-black">
      <div className="px-4 py-2 text-lg text-white bg-transparent rounded-lg cursor-pointer">
        <Link to="/" className="flex items-center">
          <span className="font-[Pavanam] text-[30px]">Ghost</span>
          <b className="font-[Pattaya] text-[30px]">Type</b>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <Link to="/leaderboard" className="text-white text-lg hover:text-[#D82934] transition">LeaderBoard</Link>
        <Link to="/about" className="text-white text-lg hover:text-[#D82934] transition">About</Link>
        <button 
          onClick={() => window.location.href="https://github.com/swamimalode07/GhostType"} 
          className=" selection:bg-red-500 selection:text-black selection:text-white p-4 border-2 border-white px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-[#D82934] transition"
        >
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          Star on GitHub
        </button>
      </div>
    </header>
  );
};

export default Header;