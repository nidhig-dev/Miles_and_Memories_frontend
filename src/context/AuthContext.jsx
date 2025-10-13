import { createContext, useMemo, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookies, removeCookie] = useCookies();
  //state to store user name
  const [user, setUser] = useState(null);

  const connStr = "http://localhost:3000/api";

  async function signUp(formData) {

    console.log(formData);
    let res = await axios.post(`${connStr}/user/register`, formData);
    console.log(res.data.token);
    setCookies("token", res.data.token);    
    setUser(res.data.userName);
  }

  async function login(formData) {
    let res = await axios.post(`${connStr}/user/login`, formData);
    setCookies("token", res.data.token);
    console.log("res data is",res.data);
    setUser(res.data.userName);
  }

  function logout() {
    ["token"].forEach((token) => removeCookie(token));
    //clearing user name
    setUser(null);
  }

  const value = useMemo(() => ({
    cookies,
    login,
    signUp,
    logout,
    user,
  }), [cookies,user]);
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

