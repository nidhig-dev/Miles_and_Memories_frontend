import { createContext,useMemo,useContext } from 'react';
import {useCookies} from 'react-cookie';
import axios from "axios";

const AuthContext=createContext();

export default function AuthProvider({children}) {
  const[cookies,setCookies,removeCookie]=useCookies();

  const connStr="http://localhost:3000/api";

  async function signUp(formData){
    console.log(formData);
    let res = await axios.post(`${connStr}/user/register`,formData);
    console.log(res.data.token);
    setCookies("token",res.data.token);
  }

  async function login(formData){
    let res=await axios.post(`${connStr}/user/login`,formData);
    setCookies("token",res.data.token);
  }

  function logout(){
    ["token"].forEach((token)=>removeCookie(token));    
  }

  const value=useMemo(()=>({
    cookies,
    login,
    signUp,
    logout,
  }),[cookies]);
  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  )
}
// function to export created context
export function useAuth(){
  return useContext(AuthContext);
}

