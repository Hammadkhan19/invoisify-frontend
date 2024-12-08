import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Link } from "react-router-dom";
import Front from '../../assets/front.png';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(username, email, password);
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center m-5'>
            <form
                onSubmit={handleSubmit}
                className="bg-slate-200 p-8 m-5 rounded-lg shadow-lg w-full md:w-96"
            >
                <h1 className="text-2xl font-poppins font-bold text-left text-black mb-6">
                    Signup
                </h1>

                <label className="block font-poppins text-gray-700 mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    placeholder='eg:-Jhon'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full placeholder:font-thin p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
                    id="username"
                />

                <label className="block font-poppins text-black mb-2" htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder='username@gmail.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="placeholder:font-thin w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
                    id="email"
                />

                <label className="block font-poppins text-black mb-2" htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder:font-thin w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
                    id="password"
                />
   {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
                <button
                    disabled={isLoading}
                    className="w-full bg-customOrange text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-200"
                >
                    {isLoading ? "Signing up..." : "Signup"}
                </button>

             

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already signed up{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            login here
                        </Link>
                    </p>
                </div>
            </form>

            <div className='m-5 md:m-20'>
                <img src={Front} alt="Front Image" className="w-full md:w-auto" />
            </div>
        </div>
    );
}

export default Signup;
