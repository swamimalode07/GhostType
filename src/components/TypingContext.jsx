import { createContext, useContext, useState } from "react";

const TypingContext = createContext();

export const TypingProvider = ({ children }) => {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <TypingContext.Provider value={{ isTyping, setIsTyping }}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
