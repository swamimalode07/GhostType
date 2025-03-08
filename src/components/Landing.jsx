import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faUsers, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Databases } from 'appwrite';
import { account, databases } from '../appwriteConfig';

import TweetCard from "../twitter/TweetCard"
import UserCount from '../components/Header/UserCount';


import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Landing() {

  
  const [openFAQ, setOpenFAQ] = useState(null);
  const [userCount, setUserCount] = useState(10);
  const [isInactive, setIsInactive] = useState(false);
  let inactivityTimer;

      useEffect(() => {
        const fetchUserCount = async () => {
          try {
            const response = await databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID);
            setUserCount(response?.total || 10);
          } catch (error) {
            console.error("Error fetching user count:", error);
          }
        };
      
        fetchUserCount();
      }, []);
  
      const resetInactivityTimer = () => {
        setIsInactive(false);
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          setIsInactive(true);
        }, 3000);
      };

      useEffect(() => {
        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("keydown", resetInactivityTimer);

        resetInactivityTimer();

        return () => {
          window.removeEventListener("mousemove", resetInactivityTimer);
          window.removeEventListener("keydown", resetInactivityTimer);
          clearTimeout(inactivityTimer);
        };
      }, []);
      

      const faqs = [
      
        { 
          question: "How can I improve my typing speed?", 
          answer: "- Regular practice is key! Try to focus on accuracy first, then gradually increase your speed. Using proper finger placement can also help. " 
        },
        
        { 
          question: "What happens if I make a mistake while typing?", 
          answer: "- Mistakes are highlighted in real time, and your accuracy percentage decreases slightly for each incorrect keystroke." 
        },
        { 
          question: "How does this typing test work?", 
          answer: "- Your typing speed is measured in Words Per Minute (WPM), and accuracy is based on correct keystrokes compared to total keystrokes." 
        },
        { 
          question: "Is this typing test suitable for beginners?", 
          answer: "- Absolutely! Whether you're a beginner or an advanced typist, it's a great choice" 
        }
      ];

  return (
    <div className='bg-[#232323]'style={{ cursor: isInactive ? "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><text y=%2228%22 font-size=%2228%22>👻</text></svg>') 16 16, auto" : "auto" }}>
      <div className="text-white w-full h-[565px] bg-[#232323] flex flex-col items-center justify-center relative">
      <button className="absolute top-10 bg-[#2E2E2E] bg-opacity-40 backdrop-blur-lg border border-[#D82934] text-white text-[15px] font-semibold px-6 py-2 rounded-full flex items-center gap-2 shadow-md transition-all duration-300 ">
          <FontAwesomeIcon icon={faHeart} className="text-[#D82934]" />
            Proudly Open Source
      </button>

        <p className="text-[70px] font-[Metamorphous] mb-8 mt-12 selection:bg-red-500 selection:text-white p-12">Type fast, stay sharp, no limits!</p>
        
        <div className="flex flex-row items-center gap-6 p-6">
        <Link to="/typing">
            <button className="bg-[#D82934] text-[25px] w-[280px] text-white px-6 py-3 rounded-lg selection:bg-red-500 selection:text-white hover:bg-[#B71F2A] transition">
               Get Started
            </button>
        </Link>

{/*         <Link to="/code">
          <button className="bg-[#232323] border-2 border-red-500 text-[22px] w-[200px] text-white px-4 py-3 rounded-[8px] selection:bg-red-500 
          selection:text-white hover:bg-[#B71F2A] transition opacity-80">
            CodeType <span className="text-red-400 text-sm">(beta)</span>
          </button>
        </Link> */}
      </div>


      </div>

      <div className="w-full flex justify-center mt-6">
        <span className="font-bold text-lg tracking-wide text-white bg-[#232323] border-2 px-6 py-3 rounded-full shadow-md">
          {userCount}+ Users
        </span>
      </div>

      <div className='w-full h-[400px] bg-[#232323] flex justify-center items-center gap-6'>
 
            <div className='h-[300px] w-[400px] bg-[#D82934] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
                <div className="w-[350px] h-[200px] bg-amber-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                <img 
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThwbGc0eDR1ZnNsNWtvdWN6ZGx2MnNyNmRmMjg3aDFqZ3F6NmFweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4tJTOagKdHix67E73o/giphy.gif" 
                    alt="Leaderboard GIF" 
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <p className="text-white text-2xl font-semibold mt-2 selection:bg-red-500 selection:text-white p-4">Top the Leaderboard</p>
            </div>


            <div className='h-[300px] w-[400px] bg-[#D82934] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
                <div className="w-[350px] h-[200px] bg-amber-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                <img 
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjZ0MjF2dmQ1OW9ncmZqY2dlbGgwZzlrNDVnZW9kcno4MzdoejlpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/drU47L5c6Wn7hD377M/giphy.gif" 
                    alt="Leaderboard GIF" 
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <p className="text-white text-2xl font-semibold mt-2 selection:bg-red-500 selection:text-white p-4">Type even Faster</p>
            </div>


                <div className='h-[300px] w-[400px] bg-[#D82934] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
                    <div className="w-[350px] h-[200px] bg-amber-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnVvbDlhbGJhMmNhZWdrMms2eHk5czh2aDdydzhjOWU3bWd0Z3dvMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8u8HNsOuyxjtt0fAew/giphy.gif" 
                        alt="Leaderboard GIF" 
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                    <p className="text-white text-2xl font-semibold mt-2 selection:bg-red-500 selection:text-white p-4">Be limitless
                    </p>
                </div>
            </div>

          <div className='w-full py-16 text-center'>
              <h2 className='text-4xl font-bold mb-10 text-[#D82934]  tracking-wide'>Frequently Asked Questions</h2>
              <div className='max-w-3xl mx-auto space-y-6'>
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className='rounded border border-[#D82934] rounded-xl bg-white/10 backdrop-blur-lg transition-all duration-300'
                  >
                    <button 
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)} 
                      className='w-full text-left px-6 py-4 bg-[#2E2E2E] rounded-xl text-white font-semibold text-lg flex justify-between items-center transition-all duration-300 hover:bg-[#3A3A3A]'
                    >
                      {faq.question}
                      <FontAwesomeIcon 
                        icon={openFAQ === index ?faChevronUp : faChevronDown} 
                        className="text-[#D82934] text-xl transition-all duration-300"
                      />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        openFAQ === index ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className='px-6 pb-4 text-left text-gray-300'>{faq.answer}</p>
                  </div>

                  
            </div>
            
    ))}
    
  </div>
  <TweetCard/>
  {/* <UserCount userCount={userCount} /> */}
  
</div>
     
    
    </div>
  );
}

export default Landing;
