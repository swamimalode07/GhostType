import React, { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import { useNavigate,Link } from "react-router-dom";

const TypingTest = () => {
  const navigate=useNavigate();

  const maxTime = 30;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [words, setWords] = useState("");

  // Generate a new set of words
  const generateWords = () => {
    const newWords = generate({ exactly: 30, join: " " }); 
    // Generate words as a single string
    setWords(newWords);
    setCorrectWrong(Array(newWords.length).fill(" "));
    setCharIndex(0);
  };

  useEffect(() => {
    inputRef.current.focus();
    generateWords();
  }, []);

  useEffect(() => {
    let interval;
    if (typing && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        let correctChars = charIndex - mistakes;
        let totalTypedChars = charIndex;
        let accuracy = totalTypedChars === 0 ? 0 : (correctChars / totalTypedChars) * 100;
        accuracy = accuracy < 0 || !accuracy || accuracy === Infinity ? 0 : accuracy.toFixed(2);

        let wpm = Math.round((correctChars / 5 / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWpm(wpm);
        setAccuracy(accuracy);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setTyping(false);
      navigate("/results",{state:{wpm,mistakes,accuracy}})
    }

    return () => clearInterval(interval);
  }, [typing, timeLeft]);

  const handleChange = (e) => {
    const characters = charRefs.current;
    let typedChar = e.target.value.slice(-1);

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
        correctWrong[charIndex - 1] = " ";
        setCorrectWrong([...correctWrong]); 
      }
      return;
    }

    let currentChar = characters[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
      if (!typing) setTyping(true);
      if (typedChar === currentChar.textContent) {
        correctWrong[charIndex] = "text-green-500";
      } else {
        correctWrong[charIndex] = "text-red-500";
        setMistakes((prev) => prev + 1);
      }
      setCharIndex((prev) => prev + 1);
      setCorrectWrong([...correctWrong]); 
    }
    if(charIndex+1>=words.length){
      setTyping(false);
      navigate("/results",{state:{wpm,accuracy,mistakes}})
    }
  };

  const resetGame = () => {
    setTimeLeft(maxTime);
    setMistakes(0);
    setWpm(0);
    setAccuracy(100);
    setTyping(false);
    generateWords();
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    
    <div className="relative flex justify-center items-center min-h-screen p-40 ">
       <Link to="/" className="flex items-center absolute top-4 left-4 text-white">
          <span className="font-[Pavanam] text-[30px]">Ghost</span>
          <b className="font-[Pattaya] text-[30px]">Type</b>
        </Link>
    <div className="absolute top-4 right-4 flex gap-4 items-center">
      <p className="bg-[#232323] text-white text-lg font-semibold p-3 rounded-[5px] border-2 border-gray-600 text-center">
        Time Left: <strong>{timeLeft}</strong>
      </p>
  
      <button 
        onClick={resetGame} 
        className="bg-[#232323] text-white text-lg font-semibold p-3 rounded-[5px] border-2 border-gray-600 hover:bg-gray-700 transition"
      >
        Try Again
      </button>
    </div>
  
    <div className="text-center">
      <input
        type="text"
        className="absolute opacity-0"
        ref={inputRef}
        onChange={handleChange}
      />
      <p className="text-gray-400 mb-4">
  {words.split("").map((char, index) => (
    <span
      key={index}
      className={`text-[40px] relative ${
        correctWrong[index]
      }`}
      ref={(el) => (charRefs.current[index] = el)}
    >
      {char}
      {index === charIndex && (
        <span className="absolute left-0 -bottom-1 w-[2px] h-10 bg-yellow-500 animate-blink"></span>
      )}
    </span>
  ))}
</p>

    </div>
  </div>
  
  );
};

export default TypingTest;
