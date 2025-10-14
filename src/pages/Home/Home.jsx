import { useEffect, useState } from 'react';
import axios from "axios";

//import components
import Navbar from "../../components/Navbar";
//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useUser } from "../../context/userContext/userContext";

//import helper function to set token in header
//import apiService from "../../utilities/apiService.mjs";

export default function Home() {
  const { cookies, logout } = useAuth();
  const { setUser } = useUser();
  
  //get user info

  async function getUserInfo() {
    try {
      let res = await axios.get("http://localhost:3000/api/user/profile", {
        headers: { "x-auth-token": cookies.token },
      });
      console.log("res is",res.data);
      //provide the user info to all children
      setUser(res.data);     
    }
    catch (err) {
      logout();
      console.error(err);
      //err.response.data.errors[0].msg);
    }
  }
  useEffect(() => {
    if (cookies.token) {
      getUserInfo();
    }

  }, [cookies.token])
  return (
    <>
      <Navbar/>
      <div>
        
      </div>

    </>
  )
}
