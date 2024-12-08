import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const Logout = () => {
    // remove token from localStorage
    localStorage.removeItem("user");
    // update the global state
    dispatch({ type: "LOGOUT" });
  };
  return { Logout };
};
