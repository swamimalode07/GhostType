import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import html2canvas from "html2canvas";
import badge1 from "../badges/badge1.png";
import badge2 from "../badges/badge2.png";
import badge3 from "../badges/badge3.png";
import defaultBadge from "../badges/new.png";
import { storage,ID } from "../appwriteConfig"; 


function Results() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { wpm, mistakes, accuracy } = location.state || { wpm: 0, mistakes: 0, accuracy: 0 };
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = useRef(null);

  const getBadge = (wpm) => {
    if (wpm >= 150) return { src: badge1, message: "Speed Demon!", tier: "LEGENDARY BADGE" };
    if (wpm >=100) return { src: badge2, message: "Pro Typist", tier: "EXPERT BADGE" };
    if (wpm > 40) return { src: badge3, message: "Fast Fingers", tier: "ADVANCED BADGE" };
    return { src: defaultBadge, message: "Keep Practicing", tier: "BEGINNER BADGE" };
  };
  
  const { src: badgeSrc, message: badgeMessage, tier: badgeTier } = getBadge(wpm);

  const handleShareOnX = async () => {
    if (isCapturing) return;

    try {
        setIsCapturing(true);
        const element = document.getElementById("print");

        const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#111" });

        const imageBlob = await (await fetch(canvas.toDataURL("image/png"))).blob();
        const file = new File([imageBlob], "result.png", { type: "image/png" });

        await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID, 
            ID.unique(),
            file
        );

        const tweetText = `⚡ Speed Typing Challenge! ⚡
        
🔥 I just scored *${wpm} WPM* with *${accuracy}% accuracy* on #GhostType!

💀 Can you type faster? Try now & claim your badge!  
👉 ghosttype.swamimalode.online`;

        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

        window.open(tweetUrl, "_blank");

    } catch (error) {
        console.error("Error sharing image:", error);
    } finally {
        setIsCapturing(false);
    }
};

  
  
  const handleDownloadImage = async () => {
    if (isCapturing) return;
  
    try {
      setIsCapturing(true);
      const element = document.getElementById("print");
  
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#111", 
        logging: false,
        useCORS: true,
      });
  
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `ghosttype-results.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setIsCapturing(false);
    }
  };
  

  const shareOnWhatsApp = () => {
    const message = `🚀 *TYPING SPEED CHALLENGE!* 🚀

🔥 I just scored *${wpm} WPM* with *${accuracy}% accuracy* on *GhostType!*  

💀 Can you beat my score?  
🏆 Earn your badge & claim the top spot!  

👉 Try it now: ghosttype.swamimalode.online`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
};


  return (
    <div className="m-0 p-0 flex flex-col  items-center  min-h-screen py-8 px-4 text-white font-mono">
    
  
      <div 
        ref={cardRef}
        id="print"
        className="bg-[#262626] border border-[#444444] w-full max-w-2xl p-6 rounded-xl shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl md:text-2xl font-bold">
              Ghost<span className="text-[#D82934]">Type</span> Stats
            </h1>
            <div className="px-3 py-1 bg-[#1A1A1A] rounded-full border border-[#444444]">
              <span className="text-xs font-bold tracking-wider text-[#D82934]">{badgeTier}</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center md:w-2/5">
              <div className="relative mb-2">
                <img
                  className="w-36 h-36 md:w-40 md:h-40 relative rounded-xl object-cover border-2 border-[#444444] p-1 transition-all duration-300 hover:border-[#D82934]"
                  src={badgeSrc}
                  alt="Achievement Badge"
                />
              </div>
              
              <h2 className="text-xl font-bold mt-2 text-white">{user?.name || "Guest"}</h2>
              <p className="text-[#D82934] font-medium mt-1 text-center text-sm">{badgeMessage}</p>
            </div>

            <div className="flex flex-col items-center md:w-3/5">
              <div className="grid grid-cols-3 w-full gap-3">
                <Stat 
                  label="WPM" 
                  value={wpm} 
                  icon="⚡" 
                />
                <Stat 
                  label="ACCURACY" 
                  value={`${accuracy}%`} 
                  icon="🎯" 
                />
                <Stat 
                  label="MISTAKES" 
                  value={mistakes} 
                  icon="🔍" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 w-full mt-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#1A1A1A] border border-[#444444]">
                  <span className="text-[#A5A5A5] text-xs">Language</span>
                  <span className="text-white font-medium text-sm">English</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#1A1A1A] border border-[#444444]">
                  <span className="text-[#A5A5A5] text-xs">Time</span>
                  <span className="text-white font-medium text-sm">30s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        
        <p className="text-[#666666] text-xs mt-4 text-right">© 2025 GhostType</p>
      </div>
      

      <div className="mt-5 pt-4 border-t border-[#444444] flex flex-wrap justify-center gap-3">
          <ActionButton 
            icon={<FaCamera className="text-lg" />}
            text="Share as Image" 
            onClick={handleDownloadImage}
            isLoading={isCapturing}
            className="bg-[#D82934] hover:bg-[#C41F29]"
          />
          <ActionButton 
            icon={<FaXTwitter className="text-lg" />}
            text="Share on X" 
            onClick={handleShareOnX}
            className="bg-black hover:bg-black/80 border border-[#444444]"
          />
          <ActionButton 
            icon={<FaWhatsapp className="text-lg" />}
            text="Share on WhatsApp" 
            onClick={shareOnWhatsApp}
            className="bg-green-600 hover:bg-green-700"
          />
          <ActionButton 
            icon="🔄"
            text="Try Again" 
            onClick={() => navigate("/typing")}
            className="bg-[#444444] hover:bg-[#555555]"
          />
        </div>
    </div>
  );
}

const Stat = ({ label, value, icon }) => (
  <div className="flex flex-col p-3 rounded-lg bg-[#1A1A1A] border border-[#444444] transition-all duration-300 hover:translate-y-1 group">
    <div className="flex justify-between items-center mb-1">
      <p className="text-[#A5A5A5] text-xs tracking-wider">{label}</p>
      <span className="opacity-75 group-hover:opacity-100 transition-opacity">{icon}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const ActionButton = ({ icon, text, onClick, className, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
  >
    {isLoading ? (
      <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
    ) : icon} 
    {text}
  </button>
);

export default Results;