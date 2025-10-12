import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import pages

export default function Login() {
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    navigate("/signUp")
  }
  return (
    <div className='main-class'>
      
      <div className="container-class">
        <div className="background-class-login">
          <div className="text-overlay">
            <h4>Capture Your <br /> Memories </h4>
            <p>Record your travel experience in a personal travel journal </p>
          </div>

        </div>
          
          <div className="login-class">
            <form className="formClass">
              <h4 className='text-2xl font-semibold mb-7'>Login</h4>
              
              <input type="email"
                value=""
                placeholder="Email"
                className="input-box" />
              
              <input type="password"
                value=""
                placeholder="Password"
              className="input-box" />
              <input type="submit"
                value="LOGIN"
                className="btn-primary" />
              <p style={{paddingBottom:"8px",
                         fontSize:"0.8rem" 
              }}>Or</p>
              <input type="submit"
                value="CREATE ACCOUNT"
                className="btn-secondary"
                onClick={handleSignUp} />
            </form>

          </div>
        
      </div>


    </div>
  )
}
