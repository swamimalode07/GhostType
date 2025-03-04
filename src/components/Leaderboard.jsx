import React, { useEffect, useState } from 'react';
import { databases } from '../appwriteConfig';
import { Query } from "appwrite";

const ITEMS_PER_PAGE = 10;  

export default function About() {
  const [leaderboard, setLeaderboard] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalUsers, setTotalUsers] = useState(0);  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
   
        const countResponse = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        );
        setTotalUsers(countResponse.total);  

        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [
            Query.orderDesc("wpm"),  
            Query.limit(ITEMS_PER_PAGE),  
            Query.offset((currentPage - 1) * ITEMS_PER_PAGE)  
          ]
        );

        setLeaderboard(response.documents); 
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentPage]);


  const nextPage = () => {
    if (currentPage < Math.ceil(totalUsers / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-white mt-2 selection:bg-red-500 selection:text-black">
        All Time LeaderBoard
      </h1>

      <div className="w-[60%] mt-4">
        <div className="grid grid-cols-4 rounded bg-[#444444] p-6 text-white text-center font-bold">
          <div>Rank</div>
          <div>Name</div>
          <div>WPM</div>
          <div>Accuracy</div>
        </div>

        {loading ? (
          <p className="text-white text-center text-xl mt-4">Loading...</p>
        ) : (
          leaderboard.map((user, index) => (
            <div key={user.$id} className="grid grid-cols-4 border-2 border-[#D82934] p-5 rounded-lg text-white text-center mt-2">
              <div>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</div>
              <div>{user.name}</div>
              <div>{user.wpm}</div>
              <div>{user.accuracy}%</div>
            </div>
          ))
        )}

    
        <div className="flex justify-between w-[100%] mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-[#D82934] hover:bg-[#b71f2a]"
            }`}
          >
            Previous
          </button>
          
          <span className="text-white">
            Page {currentPage} of {Math.ceil(totalUsers / ITEMS_PER_PAGE)}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage >= Math.ceil(totalUsers / ITEMS_PER_PAGE)}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              currentPage >= Math.ceil(totalUsers / ITEMS_PER_PAGE) ? "bg-gray-600 cursor-not-allowed" : "bg-[#D82934] hover:bg-[#b71f2a]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
