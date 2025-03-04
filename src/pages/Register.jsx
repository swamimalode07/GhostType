import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();
  const registerForm = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = registerForm.current.name.value.trim();
    const email = registerForm.current.email.value.trim();
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if (password1 !== password2) {
      alert('Passwords do not match!');
      return;
    }

    registerUser({ name, email, password1 });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-lg w-full text-white space-y-2">
        <h2 className="text-3xl font-bold text-[#D82934]">Create an Account</h2>
        <p className="text-gray-400 max-w-md leading-relaxed">
          Join us and start your journey today.
        </p>

        <form ref={registerForm} onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div>
            <label className="block text-sm font-medium text-gray-300 pb-1">Full Name</label>
            <input
              required
              type="text"
              name="name"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transition-all border border-gray-600 placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 pb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transition-all border border-gray-600 placeholder-gray-400"
              placeholder="your@email.com"
            />
          </div>


          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 pb-1">Password</label>
            <input
              required
              type={showPassword ? "text" : "password"} 
              name="password1"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transition-all border border-gray-600 placeholder-gray-400 pr-10"
              placeholder="Create a password"
            />

            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>


          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 pb-1">Confirm Password</label>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="password2"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transition-all border border-gray-600 placeholder-gray-400 pr-10"
              placeholder="Confirm your password"
            />
  
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-9 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#D82934] hover:bg-[#b71f2a] transition-all px-4 py-2 rounded-lg text-white text-lg font-semibold shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#D82934] focus:outline-none transform hover:scale-101 duration-100"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#D82934] hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
