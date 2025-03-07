import React, { useState, useEffect } from "react";

const UserCount = ({ userCount }) => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setShow(true);

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1.67, 0)); 
    }, 50); 

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); 

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed top-30   right-6 w-[260px] px-4 py-2 rounded-lg shadow-md flex flex-col items-start text-white transition-all duration-500 ease-in-out backdrop-blur-md bg-white/10 border border-white/20 ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-medium text-sm tracking-wide">{userCount}+ Users</span>
        <button onClick={() => setShow(false)} className="p-1 hover:opacity-70 transition-all">
          <img
            src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-cross-icon-png-image_956622.jpg"
            alt="Close"
            className="w-4 h-4"
          />
        </button>
      </div>

   
      <div className="w-full h-1 mt-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default UserCount;
