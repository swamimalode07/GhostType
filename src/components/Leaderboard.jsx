import React from 'react'

export default function About() {
  return (
    <div>
      <div className='flex justify-center text-4xl text-white h-[60px] mt-2 w-full selection:bg-red-500 selection:text-black'>
        All Time LeaderBoard
      </div>

      <div className='h-200px w-[60%] ml-[20%] mt-2  selection:bg-red-500 selection:text-black'>
        <ul className="grid grid-flow-col gap-30 bg-[#444444]  p-4 rounded-[10px] text-white mb-4">
            <li className="pl-8 pt-2 pb-2">Rank</li>
            <li className="p-2">Name</li>
            <li className="p-2">WPM</li>
            <li className="p-2">Accuracy</li>
        </ul>
      </div>
      
      {/* {Map over this} */}
      <div className='h-200px w-[60%] ml-[20%] mt-2  selection:bg-red-500 selection:text-black'>
        <ul className="grid grid-flow-col gap-30  border-2 border-[#D82934]  p-4 rounded-full text-white">
            <li className="pl-8 pt-2 pb-2">1</li>
            <li className="p-2">Shrek_07</li>
            <li className="p-2">100</li>
            <li className="p-2">100%</li>
        </ul>
      </div>

      {/* {Delete below this after mapping} */}
      <div className='h-200px w-[60%] ml-[20%] mt-2  selection:bg-red-500 selection:text-black'>
        <ul className="grid grid-flow-col gap-30  border-2 border-[#D82934]  p-4 rounded-full text-white">
            <li className="pl-8 pt-2 pb-2">1</li>
            <li className="p-2">Shrek_07</li>
            <li className="p-2">100</li>
            <li className="p-2">100%</li>
        </ul>
      </div>
      <div className='h-200px w-[60%] ml-[20%] mt-2  selection:bg-red-500 selection:text-black'>
        <ul className="grid grid-flow-col gap-30  border-2 border-[#D82934]  p-4 rounded-full text-white">
            <li className="pl-8 pt-2 pb-2">1</li>
            <li className="p-2">Shrek_07</li>
            <li className="p-2">100</li>
            <li className="p-2">100%</li>
        </ul>


      </div>
    </div>
  )
}


