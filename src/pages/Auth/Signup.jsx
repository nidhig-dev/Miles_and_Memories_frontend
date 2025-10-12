import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import pages

export default function Signup() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/login")
  }
  return (
    <div className='main-class'>

      <div className="container-class">
        <div className="background-class-signup">
          <div className="text-overlay">
            <h4>Be a part of the<br /> Journey </h4>
            <p>Create an account to start documenting your travels and preserving your memories. </p>
          </div>

        </div>

        <div className="login-class">
          <form className="formClass">
            <h4 className='text-2xl font-semibold mb-7'>SignUp</h4>

            <input type="text"
              value=""
              placeholder="Full Name"
              className="input-box" />

            <input type="email"
              value=""
              placeholder="Email"
              className="input-box" />
            <input type="password"
              value=""
              placeholder="Password"
              className="input-box" />
            <input type="Password"
              value=""
              placeholder="Confirm Password"
              className="input-box" />

            
            <input type="submit"
              value="CREATE ACCOUNT"
              className="btn-secondary"
               />
            <p style={{
              paddingBottom: "8px",
              fontSize: "0.8rem"
            }}>Or</p>
            <input type="submit"
              value="LOGIN"
              className="btn-primary"
              onClick={handleLogin} />
           
          </form>

        </div>

      </div>


    </div>
  )
}
