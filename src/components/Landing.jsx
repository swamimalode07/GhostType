import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div className='bg-[#232323]'>

      
<div className="navbar flex justify-between items-center p-2 bg-[#232323] text-white mt-5 ml-5 mr-5 rounded-2xl border-2 border-[#5E5E5E]">
  <div className="px-4 py-2 text-lg text-white bg-transparent rounded-lg cursor-pointer">
    <span className="font-[Pavanam] text-[30px] ">Ghost</span>
    <b className="font-[Pattaya] text-[30px]">Type</b>
  </div>

  <div className="flex items-center gap-8">
    <button className="text-white">About</button>
    <button 
      onClick={() => window.location.href="https://github.com/swamimalode07/GhostType"} 
      className="selection:bg-red-500 selection:text-white p-4 border-2 border-white px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-[#D82934] transition"
    >
      <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
      Star on GitHub
    </button>
  </div>
</div>


      <div className="text-white w-full h-[565px] bg-[#232323] flex flex-col items-center justify-center relative">
        <button className="absolute top-10 bg-[#232323] selection:bg-red-500 selection:text-white p-4 border-2 border-white text-white text-[15px] px-8 py-1 rounded-full flex items-center gap-2">❤️   Proudly Open Source
        </button>

        <p className="text-[70px] font-[Metamorphous] mb-8 selection:bg-red-500 selection:text-white p-4">Type fast, stay sharp, no limits!</p>

        <button className="bg-[#D82934] text-[25px] w-[250px] text-white px-6 py-3 rounded-lg selection:bg-red-500 selection:text-white p-4 hover:bg-[#B71F2A] transition mt-4">
          Get Started
        </button>
      </div>


      <div className='w-full h-[400px] bg-[#232323] flex justify-center items-center gap-6'>
 
            <div className='h-[300px] w-[400px] bg-[#D82934] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
                <div className="w-[350px] h-[200px] bg-amber-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                <img 
                    src="https://media.giphy.com/media/QyVRl5QvAErSgM5JNO/giphy.gif" 
                    alt="Leaderboard GIF" 
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <p className="text-white text-2xl font-semibold mt-2 selection:bg-red-500 selection:text-white p-4">Lorem, ipsum.</p>
            </div>


            <div className='h-[300px] w-[400px] bg-[#D82934] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
                <div className="w-[350px] h-[200px] bg-amber-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                <img 
                    src="https://media.giphy.com/media/QyVRl5QvAErSgM5JNO/giphy.gif" 
                    alt="Leaderboard GIF" 
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <p className="text-white text-2xl font-semibold mt-2 selection:bg-red-500 selection:text-white p-4">Lorem, ipsum.</p>
            </div>


                <div className='h-[300px] w-[400px] bg-[#D82934] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
                    <div className="w-[350px] h-[200px] bg-amber-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://media.giphy.com/media/QyVRl5QvAErSgM5JNO/giphy.gif" 
                        alt="Leaderboard GIF" 
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                    <p className="text-white text-2xl font-semibold mt-2 selection:bg-red-500 selection:text-white p-4">Lorem, ipsum.
                    </p>
                </div>
            </div>
            
{/* {Footer} */}
<div className="w-full bg-[#181818] text-white py-8 border-t border-[#5E5E5E] mt-10">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
    

    <div className="flex items-center gap-2 text-2xl font-semibold">
      <span className="font-[Pavanam] tracking-wide">Ghost</span>
      <span className="font-[Pattaya] text-[#D82934]">Type</span>
    </div>

   
    <div className="flex gap-6 text-sm mt-4 md:mt-0">
      <a href="#" className="hover:text-[#D82934] transition selection:bg-red-500 selection:text-white p-4">About</a>
      <a href="#" className="hover:text-[#D82934] transition selection:bg-red-500 selection:text-white p-4">Contribute</a>
      <a href="https://github.com/swamimalode07/GhostType" className="hover:text-[#D82934] transition selection:bg-red-500 selection:text-white p-4">GitHub</a>
    </div>

    <div className="flex gap-4 mt-4 md:mt-0">
      <a href="#" className="text-xl hover:text-[#D82934] transition "><i className="fab fa-twitter"></i></a>
      <a href="#" className="text-xl hover:text-[#D82934] transition "><i className="fab fa-discord"></i></a>
      <a href="#" className="text-xl hover:text-[#D82934] transition "><i className="fab fa-github"></i></a>
    </div>
  </div>
  <div className="text-center text-sm text-gray-400 mt-6">
    © 2025 GhostType. Built with ❤️ by <a href="https://swamimalode.online/">@swamimalode</a>
  </div>
</div>



    
    </div>
  );
}

export default Landing;
