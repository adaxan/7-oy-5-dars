import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../axios";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  };

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 6;
  };

  function validate() {
    if (usernameRef.current.value.trim().length < 3) {
      alert("Username must be at least 3 characters long.");
      usernameRef.current.focus();
      return false;
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Invalid email format.");
      emailRef.current.focus();
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert(
        "Password must contain at least one letter, one number, and be longer than 6 characters."
      );
      passwordRef.current.focus();
      return false;
    }

    if (passwordRef.current.value !== repasswordRef.current.value) {
      alert("Passwords do not match.");
      repasswordRef.current.focus();
      return false;
    }

    return true;
  }

  function handleRegister(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const registeredUser = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
    };

    setLoading(true);

    http
      .post("auth/signup", registeredUser)
      .then((response) => {
        if (response.data.message === "User registered successfully!") {
          alert("Registration successful! Redirecting to login...");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("An error occurred during registration. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        repasswordRef.current.value = "";
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-700">
        <h1 className="text-4xl text-center font-extrabold text-blue-500 mb-6">
          Register
        </h1>
        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Username input */}
          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              ref={usernameRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Username"
            />
          </div>

          {/* Email input */}
          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              ref={emailRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Email"
            />
          </div>

          {/* Password input */}
          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            <input
              type="password"
              ref={passwordRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Password"
            />
          </div>

          {/* Confirm password input */}
          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            <input
              type="password"
              ref={repasswordRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-outline btn-info w-full"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <Link to="/login" className="text-gray-400 mt-4 block">
            Akkauntingiz bormi? <span className="text-red-600">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;