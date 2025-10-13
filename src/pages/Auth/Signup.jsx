import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import context
import { useAuth } from "../../context/AuthContext";


export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [display,setdisplay]=useState(false);

  
  function handleClick(e) {
    navigate("/login")
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2){
        throw new Error("Passwords don't match");
        return;
      }
      await signUp(formData);
      console.log("registration successful")
      setdisplay(false);
      navigate("/dashboard");
    } catch (err) {
      setdisplay(true);
      console.error(err.message);
    }    
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
          <form  onSubmit={handleLogin} 
                 className="formClass">
            <h4 className='text-2xl font-semibold mb-7'>SignUp</h4>

            <input type="text"
              value={formData.name}
              placeholder="Full Name"
              name="userName"
              required
              autoComplete="on"
              minLength="4"
              className="input-box"
              onChange={handleChange} />

            <input type="email"
              value={formData.email}
              placeholder="Email"
              name="email"
              required
              autoComplete="on"
              className="input-box"
              onChange={handleChange} />

            <input type="password"
              value={formData.password}
              placeholder="Password"
              name="password"
              required
              minLength="6"
              autoComplete="off"
              className="input-box"
              onChange={handleChange} />

            <input type="Password"
              value={formData.password2}
              placeholder="Confirm Password"
              name="password2"
              required
              minLength="6"
              autoComplete="off"
              className="input-box"
              onChange={handleChange} />

            {(display) &&
              <p style={{color:"red",
                         fontSize:"0.8rem", 
              }}>Registration failed.</p>
            }

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
              onClick={handleClick} />
          </form>
        </div>
      </div>
    </div>
  )
}
