import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../utils/AuthContext";
import logo from "../../assets/GhostType logo.png"; 

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="navbar   flex justify-between items-center p-1.5 bg-[#232323] text-white mt-5 mx-5 rounded-2xl border-3 border-[#5E5E5E] shadow-md">
      <div className="flex items-center px-4 py-2 text-lg cursor-pointer">
        <Link to="/" className="flex items-center ">
          <img src={logo} alt="GhostType Logo" className="h-11 w-11" /> 
          <span className="ml-2 font-[Pavanam] text-[30px]">Ghost</span>
          <b className="font-[Pattaya] text-[30px]">Type</b>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/leaderboard"
          className="text-white text-lg hover:text-[#D82934] transition-all duration-200"
        >
          LeaderBoard
        </Link>
        <Link
          to="/about"
          className="text-white text-lg hover:text-[#D82934] transition-all duration-200"
        >
          About
        </Link>

       
        {user ? (
        
          // <button
          //   onClick={logoutUser}
          //   className="px-4 py-2 border border-red-500 rounded-lg text-white hover:text-[#D82934] transition-all duration-200"
          // >
          //   Logout
          // </button>
          <Link to="/settings">
            <button className="text-white text-lg hover:text-[#D82934] transition-all duration-200">Settings</button>
          </Link>
          
        
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 border border-green-500 rounded-lg text-white hover:bg-green-600 transition-all duration-200"
          >
            Login
          </Link>
        )}

   
        <button
          onClick={() => window.location.href = "https://github.com/swamimalode07/GhostType"}
          className="border mr-2 border-white px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-[#D82934] hover:border-[#D82934] transition-all duration-200"
        >
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          Star on GitHub
        </button>

        
      </div>
    </header>
  );
};

export default Header;
