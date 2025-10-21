import { createContext, useMemo, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";

const AuthContext = createContext();
//This context signs in, logs in and logs out a user and provides/remove the token as global state for all children
export default function AuthProvider({ children }) {
  const [cookies, setCookies, removeCookie] = useCookies();
 
  const connStr = "http://localhost:3000/api";
//This function creates a new user and sets the token in cookies
  async function signUp(formData) {

    console.log(formData);
    let res = await axios.post(`${connStr}/user/register`, formData);
    console.log(res.data.token);
    setCookies("token", res.data.token);    
  }
//This function logs in a user and dets the token in cookies
  async function login(formData) {
    let res = await axios.post(`${connStr}/user/login`, formData);
    setCookies("token", res.data.token);
    console.log("res data is",res.data);      
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

