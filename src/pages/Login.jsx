import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [savedEmail, setSavedEmail] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const cachedEmail = localStorage.getItem('cachedEmail');
    if (cachedEmail) {
      setSavedEmail(cachedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    localStorage.setItem('cachedEmail', email);
    try {
      await loginUser({ email, password });
    } catch (err) {
      console.error("Login Error:", err);
      setError(""); 
      setTimeout(() => setError("Invalid Email or Password. Please try again."), 0);
      loginForm.current.password.value = "";
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="max-w-lg w-full text-white space-y-6">
        <h2 className="text-3xl font-bold text-[#D82934]">Log in to your account</h2>
        <p className="text-gray-400 max-w-md leading-relaxed">
          Enter your credentials to access.
        </p>

        <form ref={loginForm} onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-300 pb-1">Email</label>
            <input 
              required
              type="email"
              name="email"
              defaultValue={savedEmail}
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transition-all border border-gray-600 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 pb-1">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transition-all border border-gray-600 placeholder-gray-400 pr-10"
              placeholder="Enter your password"
            />
    
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-[#D82934]" />
              <span>Remember me</span>
            </label>
            {/* <a href="#" className="text-[#D82934] hover:underline">Forgot password?</a> */}
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full bg-[#D82934] hover:bg-[#b71f2a] transition-all px-4 py-2 rounded-lg text-white text-lg font-semibold shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transform hover:scale-101 duration-100"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-[#D82934] hover:underline font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
