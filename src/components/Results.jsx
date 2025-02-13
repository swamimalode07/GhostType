import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wpm, mistakes, accuracy } = location.state || { wpm: 0, mistakes: 0, accuracy: 0 };

  const shareOnX = () => {
    const tweetText = `I just scored ${wpm} WPM with ${accuracy}% accuracy on this typing test! Try it yourself!`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const message = `I just scored ${wpm} WPM with ${accuracy}% accuracy on this typing test! Try it yourself!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center mt-12 text-white font-mono">
      {/* Stats Card */}
      <div className="bg-[#1E1E1E] border border-gray-700 w-[900px] p-10 rounded-xl shadow-2xl flex items-center relative">
        {/* Avatar and Username */}
        <div className="flex flex-col items-center w-1/3 relative">
          <div className="absolute w-[140px] h-[140px] bg-red-500 rounded-full blur-2xl"></div>
          <img
            className="rounded-full w-[120px] h-[120px] border-4 border-red-600 shadow-xl relative"
            src="https://wallpapers-clan.com/wp-content/uploads/2022/02/naruto-pfp-3.jpg"
            alt="User Avatar"
          />
          <p className="text-2xl font-semibold mt-4 text-white tracking-wider">Shrek_07</p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col items-center w-2/3 text-lg font-semibold">
          <div className="text-4xl font-extrabold text-red-500 mb-6 tracking-wide">Typing Stats</div>
          <div className="flex justify-around w-full">
            <div className="flex flex-col items-center text-red-400">
              <p className="text-white uppercase tracking-wide">WPM</p>
              <p className="text-4xl font-bold">{wpm}</p>
            </div>
            <div className="flex flex-col items-center text-red-400">
              <p className="text-white uppercase tracking-wide">Accuracy</p>
              <p className="text-4xl font-bold">{accuracy}%</p>
            </div>
            <div className="flex flex-col items-center text-red-400">
              <p className="text-white uppercase tracking-wide">Mistakes</p>
              <p className="text-4xl font-bold">{mistakes}</p>
            </div>
          </div>
          <div className="flex justify-center text-sm mt-4 text-gray-400">
            <p className="mr-6">Language : English</p>
            <p>Time : 30s</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs absolute bottom-2 right-4">© 2025 GhostType</p>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-6 mt-6">
        <button
          onClick={shareOnX}
          className="flex items-center bg-black border border-gray-500 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg hover:bg-gray-900 transition duration-300"
        >
          <FaXTwitter className="mr-2 text-xl" /> Share on X
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="flex items-center bg-green-600 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg hover:bg-green-700 transition duration-300"
        >
          <FaWhatsapp className="mr-2 text-xl" /> Share on WhatsApp
        </button>
        {/* Try Again Button */}
        <button
          onClick={() => navigate("/typing")}
          className="flex items-center bg-[#5E5E5E] px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}

export default Results;
