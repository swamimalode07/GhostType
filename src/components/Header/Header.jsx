import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <>
        <div className="navbar flex justify-between items-center p-2 bg-[#232323] text-white border-b-2 border-[#5E5E5E]">
  <div className="px-4 py-2 text-lg text-white bg-transparent rounded-lg cursor-pointer">
    <span className="font-[Pavanam] text-[30px] ml-10">Ghost</span>
    <b className="font-[Pattaya] text-[30px]">Type</b>
  </div>

  <div className="flex items-center mr-20">
    <button className="text-white">LeaderBoard</button>
    
  </div>
</div>

    </>
  )
}

export default Header
