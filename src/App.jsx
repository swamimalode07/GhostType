import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TypingBox from "./components/TypingBox";
import Landing from "./components/Landing";
import Layout from "./components/Layout";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import Results from "./components/Results";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./utils/AuthContext";
import NotFound from "./components/NotFound";
import logo from "./assets/GhostType logo.png";
import Setting from "./utils/Settings/Setting";
import CodeType from "./components/CodeType";



function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#232323] text-white text-center">
          <img src={logo} alt="GhostType Logo" className="w-40 h-40 mb-6  "/>
      <div>
              <span className="font-[Pavanam] text-[30px]">Ghost</span>
              <b className="font-[Pattaya] text-[30px]">Type</b>
          </div>
          <p className="text-sm ">Available on Desktop</p>
    </div>


    );
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/code" element={<CodeType/>}/>

            <Route element={<PrivateRoutes />}>
              <Route path="/typing" element={<TypingBox />} />
              <Route path="/results" element={<Results />} />
              <Route path="/settings" element={<Setting/>}></Route>
            </Route>

            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
