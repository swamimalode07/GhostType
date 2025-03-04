import React from "react";
import logo from "../assets/GhostType logo.png"; 
import { Link } from "react-router-dom";


const NotFound = () => {
    
  return (
    <div className="flex flex-col items-center justify-center p-25 text-white bg-[#232323]">
    
      <img src={logo} alt="GhostType Logo" className="h-32 w-32 mb-6" />

      <h1 className="text-[50px] font-light text-white font-[Pavanam] ">404 PAGE NOT FOUND</h1>
        <Link to="/">
            <p  className="text-[#D82934] hover:underline">Click here</p>
        </Link>
    </div>
  );
};

export default NotFound;
