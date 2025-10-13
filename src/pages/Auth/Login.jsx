import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import context
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [display,setdisplay]=useState(false);

  function handleClick(e) {
    navigate("/signUp")
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await login(formData);
      console.log("login successful");
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
        <div className="background-class-login">
          <div className="text-overlay">
            <h4>Capture Your <br /> Memories </h4>
            <p>Record your travel experience in a personal travel journal </p>
          </div>

        </div>

        <div className="login-class">

          <form onSubmit={handleSignUp}
                className="formClass">
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>           
            <input type="email"
              value={formData.email}
              name="email"
              required
              autoComplete="on"
              placeholder="Email"
              className="input-box"
              onChange={handleChange} />

            <input type="password"
              value={formData.password}
              name="password"
              required
              autoComplete="off"
              placeholder="Password"
              className="input-box"
              onChange={handleChange} />

            {(display) &&
              <p style={{color:"red",
                         fontSize:"0.8rem", 
              }}>Login failed</p>
            }

            <input type="submit"
              value="LOGIN"
              className="btn-primary" />

            <p style={{
              paddingBottom: "8px",
              fontSize: "0.8rem"
            }}>Or</p>

            <input type="submit"
              value="CREATE ACCOUNT"
              className="btn-secondary"
              onClick={handleClick} />
          </form>

        </div>

      </div>


    </div>
  )
}
