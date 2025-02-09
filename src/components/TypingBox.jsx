import React, { useEffect, useRef, useState } from "react";
import { generate } from "random-words"; // ✅ Correct


const TypingTest = () => {
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
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white font-mono p-5">
      <div className="max-w-5xl w-full bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
        <input
          type="text"
          className="absolute opacity-0"
          ref={inputRef}
          onChange={handleChange}
        />
        <p className="text-lg text-gray-400 mb-4">
          {words.split("").map((char, index) => (
            <span
              key={index}
              className={`text-xl ${index === charIndex ? "border-b-2 border-yellow-500" : ""} ${correctWrong[index]}`}
              ref={(el) => (charRefs.current[index] = el)}
            >
              {char}
            </span>
          ))}
        </p>
        <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
          <p>Time Left: <strong>{timeLeft}</strong></p>
          <p>Mistakes: <strong>{mistakes}</strong></p>
          <p>WPM: <strong>{wpm}</strong></p>
          <p>Accuracy: <strong>{accuracy}%</strong></p>
          <button onClick={resetGame} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
