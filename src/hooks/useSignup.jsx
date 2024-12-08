import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const Base_URL = import.meta.env.VITE_API_URL;
  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${Base_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // Corrected JSON.stringify
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return;
      }

      // If response is okay, proceed to save the user data and update context
      localStorage.setItem("user", JSON.stringify(json));

      // Dispatch the login action
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(json.error);
    }
  };

  return { signup, isLoading, error }; // Ensure all returned variables are correctly named
};
