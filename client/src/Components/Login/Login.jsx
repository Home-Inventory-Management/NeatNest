import React, { useState } from 'react';
import Video from '../../assets/Video.mp4';
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmailError(emailPattern.test(emailValue) ? '' : 'Invalid email address');
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    setPasswordError(passwordValue.length < 6 ? 'Invalid password' : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!email.trim()) {
      alert("Email field cannot be empty!");
      return;
    }
    if (!password.trim()) {
      alert("Password field cannot be empty!");
      return;
    }
    if (emailError || passwordError) {
      alert("Please fix the errors before login!");
      return;
    }

    console.log("Login successful with:", { email, password });

    window.location.href = "/dashboard";
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full relative">
        <video 
          src={Video} 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
        />
        
        <div className="absolute bottom-16 left-0 w-full text-center text-white px-4">
          <h2 className="text-2xl text-green-900 font-semibold mb-4">
            Keeping your home inventory tidy and efficient.
          </h2>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-green-900 text-[18px]">Don't Have An Account?</span>
            <Link to={'/register'}>
              <button className="border border-green-500 text-green-700 px-5 py-2 rounded-md transition 
                hover:bg-green-200 hover:text-green-900 
                active:bg-[#a2dbcb] active:text-[#1ca981]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center transition-colors duration-300 hover:bg-green-100">
      <div className="p-8 rounded-lg w-[80%] max-w-md">
        <img src={Logo} alt="Logo" className="w-40 h-40 mx-auto -mb-7" /> 
        <h2 className="text-3xl font-bold text-center mb-5">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="text-red-400 text-sm">{emailError}</p>} 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>} 
          </div>
          <Link to="/dashboard">
            <button
              type="submit"
              className="border border-green-500 text-green-700 w-full p-2 rounded-md transition
                hover:bg-green-200 hover:text-green-900 
                active:bg-[#a2dbcb] active:text-[#1ca981]"
            >
              Login 🔑
            </button>
          </Link>
        </form>
        <div className="mt-4 text-center"> 
          <span>Forgot your password? </span>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
             Click here
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
