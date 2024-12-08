import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import Front from "../../assets/front.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading,error } = useLogin("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  const [isCopied, setIsCopied] = useState(false);
  const [ispasCopied, setIspasCopied] = useState(false);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
    });
  };
  const handleCopypas = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIspasCopied(true);
      setTimeout(() => setIspasCopied(false), 2000); // Reset copy state after 2 seconds
    });
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center m-5">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-8 m-5 rounded-lg shadow-lg w-full md:w-96"
      >
        <h1 className="text-2xl font-poppins font-bold text-left text-black mb-6">
          Login
        </h1>

        <h3 className="text-lg font-semibold text-gray-800">
          TOO Lazy? copy this
        </h3>
        <div className="mt-1">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-gray-700">
              Email:{" "}
              <span className="font-medium text-gray-900">youshi@gmail.com</span>
            </h2>
            <button
              className="px-3 py-1 bg-customOrange text-white rounded-md text-sm hover:bg-orange-400 focus:outline-none"
              onClick={() => handleCopy("youshi@gmail.com")}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-gray-700">
              Password:{" "}
              <span className="font-medium text-gray-900">Youshi123!</span>
            </h2>
            <button
              className="px-3 py-1 bg-customOrange text-white rounded-md text-sm hover:bg-orange-400 focus:outline-none"
              onClick={() => handleCopypas("Youshi123!")}
            >
              {ispasCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <label className="block font-poppins text-black mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          placeholder="username@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="placeholder:font-thin w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
          id="email"
        />

        <label
          className="block font-poppins text-black mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="placeholder:font-thin w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
          id="password"
        />

        <button
          disabled={isLoading}
          className="w-full bg-customOrange text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </form>

      <div className="m-5 md:m-20">
        <img src={Front} alt="Front Image" className="w-full md:w-auto" />
      </div>
    </div>
  );
};

export default Login;
