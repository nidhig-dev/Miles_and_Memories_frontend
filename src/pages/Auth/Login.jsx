import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Auth.module.css";

//import context
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [display,setdisplay]=useState("");

  function handleClick(e) {
    navigate("/signUp")
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(formData);
      console.log("login successful");
      // setdisplay("");
      navigate("/dashboard");
    } catch (err) {
      setdisplay(err.response.data.errors[0].msg);      
      console.error(err.response.data.errors[0].msg);
    }
    
  }
  return (
    <div className={style.mainClass}>

      <div className={style.containerClass}>
        <div className={style.backgroundClassLogin}>
          <div className={style.textOverlay}>
            <h4>Capture Your <br /> Memories </h4>
            <p>Record your travel experience in a personal travel journal </p>
          </div>
        </div>

        <div className={style.loginClass}>

          <form onSubmit={handleLogin}
            className={style.formClass}>
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>           
            <input type="email"
              value={formData.email}
              name="email"
              required
              autoComplete="on"
              placeholder="Email"
              className={style.inputBox}
              onChange={handleChange} />

            <input type="password"
              value={formData.password}
              name="password"
              required
              autoComplete="off"
              placeholder="Password"
              className={style.inputBox}
              onChange={handleChange} />

            {(display) &&
              <p style={{color:"red",
                         fontSize:"0.8rem", 
              }}>{display}</p>
            }

            <input type="submit"
              value="LOGIN"
              className={style.btnPrimary} />

            <p style={{
              paddingBottom: "8px",
              fontSize: "0.8rem"
            }}>Or</p>

            <input type="submit"
              value="CREATE ACCOUNT"
              className={style.btnSecondary}
              onClick={handleClick} />
          </form>
        </div>
      </div>
    </div>
  )
}
