import React, { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import { useNavigate, Link } from "react-router-dom";
import { account, databases, ID } from "../appwriteConfig";
import { useAuth } from "../utils/AuthContext";
import { Volume2, VolumeX } from "lucide-react";
import { Query } from "appwrite";

const TypingTest = () => {
  const navigate = useNavigate();
  const { user, setUser, setLoading } = useAuth();

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
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [isSoundOn, setIsSoundOn] = useState(() => {
    return JSON.parse(localStorage.getItem("soundEnabled")) ?? true;
  });

  const keySound = useRef(new Audio("/keypress.mp3"));
  const backspaceSound = useRef(new Audio("/backspace.mp3"));
  const spacebarSound = useRef(new Audio("/spacebar.mp3"));

  useEffect(() => {
    keySound.current.volume = isSoundOn ? 1 : 0;
    backspaceSound.current.volume = isSoundOn ? 1 : 0;
    spacebarSound.current.volume = isSoundOn ? 1 : 0;
  }, [isSoundOn]);

  const toggleSound = () => {
    setIsSoundOn((prev) => {
      const newState = !prev;
      localStorage.setItem("soundEnabled", JSON.stringify(newState));
      return newState;
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const playSound = (audioRef) => {
    if (isSoundOn) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => console.error("Audio play error:", error));
    }
  };

  const generateWords = () => {
    const newWords = generate({ exactly: 30, join: " " });
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
      navigate("/results", { state: { wpm, mistakes, accuracy } });
    }

    return () => clearInterval(interval);
  }, [typing, timeLeft]);

  const handleChange = (e) => {
    let typedChar = e.target.value.slice(-1);

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      playSound(backspaceSound);

      if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
        correctWrong[charIndex - 1] = " ";
        setCorrectWrong([...correctWrong]);
      }
      return;
    }

    let currentChar = charRefs.current[charIndex]?.textContent;

    if (charIndex < words.length && timeLeft > 0) {
      if (!typing) setTyping(true);

      if (typedChar === " ") {
        playSound(spacebarSound);
      } else {
        playSound(keySound);
      }

      if (typedChar === currentChar) {
        correctWrong[charIndex] = "text-green-500";
      } else {
        correctWrong[charIndex] = "text-red-500";
        setMistakes((prev) => prev + 1);
      }

      setCharIndex((prev) => prev + 1);
      setCorrectWrong([...correctWrong]);
    }

    if (charIndex + 1 >= words.length) {
      setTyping(false);
      navigate("/results", { state: { wpm, accuracy, mistakes } });
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

  // Define the saveScore function
  const saveScore = async () => {
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      console.log("🔍 Checking if user exists:", user?.name);

      const existingRecords = await databases.listDocuments(
        "67b846cc0007baaa2eee",
        "67b846da0004855e8727",
        [Query.equal("name", user?.name || "Anonymous")]
      );

      console.log("📄 Existing Records:", existingRecords);

      const newWpm = parseInt(wpm) || 0;
      const newAccuracy = parseInt(accuracy) || 0;

      if (existingRecords.documents.length > 0) {
        const existingUser = existingRecords.documents[0];

        const oldWpm = parseInt(existingUser.wpm) || 0;
        const oldAccuracy = parseInt(existingUser.accuracy) || 0;

        await databases.updateDocument(
          "67b846cc0007baaa2eee",
          "67b846da0004855e8727",
          existingUser.$id,
          {
            wpm: Math.max(oldWpm, newWpm),
            accuracy: Math.max(oldAccuracy, newAccuracy),
            timestamp: new Date().toISOString(),
          }
        );

        console.log("Score updated successfully");
      } else {
        console.log("No existing record found. Creating new record...");

        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          ID.unique(),
          {
            name: user?.name || "Anonymous",
            wpm: newWpm,
            accuracy: newAccuracy,
            rank: 0,
            timestamp: new Date().toISOString(),
          }
        );

        console.log("New user added to leaderboard");
      }
    } catch (error) {
      console.error("Error saving/updating score:", error);
    }
  };

  useEffect(() => {
    if (typing && (timeLeft === 0 || charIndex + 1 >= words.length)) {
      setTyping(false);
      saveScore(); // Call saveScore here
      navigate("/results", { state: { wpm, accuracy, mistakes } });
    }
  }, [timeLeft, charIndex, typing]);

  // Focus and blur handlers
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Global keypress listener to start typing
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFocused]);

  return (
    <div className="relative flex justify-center items-center min-h-screen p-40">
      <Link to="/" className="flex items-center absolute top-4 left-4 text-white">
        <span className="font-[Pavanam] text-[30px]">Ghost</span>
        <b className="font-[Pattaya] text-[30px]">Type</b>
      </Link>

      <div className="absolute top-4 right-4 flex gap-4 items-center">
        <button
          onClick={toggleSound}
          className="bg-gray text-white p-3 rounded-lg border-2 border-gray-600 flex items-center gap-2 transition hover:bg-gray-700"
          aria-label="Toggle Sound"
        >
          {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Focus Prompt Overlay */}
        {!isFocused && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            style={{ pointerEvents: "none" }} // Allow clicks to pass through
          >
            <p className="text-white text-2xl font-semibold">
              Press any key to start typing!
            </p>
          </div>
        )}

        <p className="text-gray-400 mb-4">
          {words.split("").map((char, index) => (
            <span
              key={index}
              className={`text-[40px] relative ${correctWrong[index]}`}
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