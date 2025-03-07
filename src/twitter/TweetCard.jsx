import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const dummyTweets = [
  { id: 1, user: "Ashish Kumar Singh", handle: "@ashishxsingh", text: "i hope i’ll forget monkey type aftersing this" },
  { id: 2, user: "Jane Smith", handle: "@janesmith", text: "I just hit 120 WPM thanks to this tool. Highly recommended! #Productivity" },
  { id: 3, user: "CodingGeek", handle: "@codinggeek", text: "A must-try for all devs. Typing speed is crucial! #DevLife" },
  { id: 4, user: "SpeedTyper", handle: "@speedtyper", text: "Typing fast is a superpower. This tool helped me level up! 🚀" },
  { id: 5, user: "Alex Coder", handle: "@alexcoder", text: "If you're a programmer, your typing speed matters! Check this out. #Coding" },
  { id: 6, user: "TechSavvy", handle: "@techsavvy", text: "I love tracking my typing progress. This tool makes it fun! #TechLife" },
  { id: 7, user: "FastFingers", handle: "@fastfingers", text: "Reached 150 WPM today! Thanks to this awesome typing test. #Achievement" },
  { id: 8, user: "TypingMaster", handle: "@typingmaster", text: "Practice makes perfect. This site is the best for improving speed! #Motivation" },
];

const TweetCard = ({ tweet }) => {
  return (
    <div className=" text-white p-5 rounded-lg shadow-md w-80 flex-shrink-0 mx-2 border border-[#333]">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-semibold text-base">{tweet.user}</p>
          <p className="text-gray-400 text-xs">{tweet.handle}</p>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81LGhC2u7DrTVVFQVzK3lUrOajZHxQAmh5Q&s"
          alt="Twitter Logo"
          className="w-6 h-6 rounded"
        />

      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{tweet.text}</p>
    </div>
  );
};

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    setTweets([...dummyTweets, ...dummyTweets]); 
  }, []);

  return (
    <div className="w-full py-8 text-white ">
      <br />
      <h2 className="text-3xl mt-6 font-bold mb-4 text-center text-[#D82934] ">What People Are Saying</h2>
      <br />
      <div className="relative w-full overflow-hidden">
        <div className="flex space-x-2 animate-scroll hover:pause-scroll mt-4 ">
          {tweets.map((tweet, index) => (
            <TweetCard key={index} tweet={tweet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwitterFeed;