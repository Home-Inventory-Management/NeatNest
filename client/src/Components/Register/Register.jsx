import React, { useState } from "react";
import Video from "../../assets/Video.mp4";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(
      e.target.value.length < 3
        ? "Username should be at least 3 characters long"
        : ""
    );
  };

  const handlePhoneNumberChange = (e) => {
    const phoneValue = e.target.value;
    setPhoneNumber(phoneValue);

    const phonePattern = /^[0-9]{10}$/;
    setPhoneNumberError(
      phonePattern.test(phoneValue) ? "" : "Invalid phone number"
    );
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmailError(emailPattern.test(emailValue) ? "" : "Invalid email address");
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    setPasswordError(
      passwordValue.length < 6
        ? "Password should be at least 6 characters long"
        : ""
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    setConfirmPasswordError(
      confirmPasswordValue !== password ? "Passwords do not match" : ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !usernameError &&
      !phoneNumberError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      console.log("Registration Successful");
    } else {
      console.log("Form contains errors");
    }
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
            <span className="mb-2 text-green-900 text-[18px]">
              Already have an account?
            </span>
            <Link to={"/"}>
              <button
                className="border border-green-500 text-green-700 px-5 py-2 rounded-md transition 
                hover:bg-green-200 hover:text-green-900 
                active:bg-[#a2dbcb] active:text-[#1ca981]"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center transition-colors duration-300 hover:bg-green-100">
        <div className="p-8 rounded-lg w-[80%] max-w-md">
          <img src={Logo} alt="Logo" className="w-40 h-40 mx-auto -mb-7" />
          <h2 className="text-3xl font-bold text-center mb-4">
            Let Us Know You!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={username}
                onChange={handleUsernameChange}
                placeholder="☞ Enter your username"
                required
              />
              {usernameError && (
                <p className="text-red-400 text-sm">{usernameError}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="☏ Enter your phone number"
                required
              />
              {phoneNumberError && (
                <p className="text-red-400 text-sm">{phoneNumberError}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={handleEmailChange}
                placeholder="✉ Enter your email"
                required
              />
              {emailError && (
                <p className="text-red-400 text-sm">{emailError}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={handlePasswordChange}
                placeholder="⍰ Enter your password"
                required
              />
              {passwordError && (
                <p className="text-red-400 text-sm">{passwordError}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="⍰ Confirm your password"
                required
              />
              {confirmPasswordError && (
                <p className="text-red-400 text-sm">{confirmPasswordError}</p>
              )}
            </div>

            <Link to="/">
              <button
                type="submit"
                className="border border-green-500 text-green-700 w-full p-2 rounded-md transition
                hover:bg-green-200 hover:text-green-900 
                active:bg-[#a2dbcb] active:text-[#1ca981]"
              >
                Register 🔑
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
