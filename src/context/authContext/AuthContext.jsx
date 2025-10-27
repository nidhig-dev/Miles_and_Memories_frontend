import { createContext, useMemo, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";

const AuthContext = createContext();
//This context signs in, logs in and logs out a user and provides/remove the token as global state for all children
export default function AuthProvider({ children }) {
  const [cookies, setCookies, removeCookie] = useCookies();

  const connStr = "https://miles-and-memories-backend.onrender.com/api";
  //This function creates a new user and sets the token in cookies
  async function signUp(formData) {

    let res = await axios.post(`${connStr}/user/register`, formData);
    setCookies("token", res.data.token);
  }
  //This function logs in a user and sets the token in cookies
  async function login(formData) {
    let res = await axios.post(`${connStr}/user/login`, formData);
    setCookies("token", res.data.token);
  }
  //This function logs out a user and removes the cookie
  function logout() {
    ["token"].forEach((token) => removeCookie(token));
  }

  const value = useMemo(() => ({
    cookies,
    login,
    signUp,
    logout,

  }), [cookies]);
  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  )
}
// function to export created context
export function useAuth() {
  return useContext(AuthContext);
}

