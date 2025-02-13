import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='bg-[#232323]'>

      <div className="text-white w-full h-[565px] bg-[#232323] flex flex-col items-center justify-center relative">
        <button className="absolute top-10 bg-[#232323] selection:bg-red-500 selection:text-white p-4 border-2 border-white text-white text-[15px] px-8 py-1 rounded-full flex items-center gap-2">❤️   Proudly Open Source
        </button>

        <p className="text-[70px] font-[Metamorphous] mb-8 selection:bg-red-500 selection:text-white p-4">Type fast, stay sharp, no limits!</p>
        <Link to="/typing">
            <button className="bg-[#D82934] text-[25px] w-[250px] text-white px-6 py-3 rounded-lg selection:bg-red-500 selection:text-white p-4 hover:bg-[#B71F2A] transition mt-4">
              Get Started
            </button>
        </Link>
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
            


    
    </div>
  );
}

export default Landing;
