import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Auth.module.css";

//import context
import { useAuth } from "../../context/authContext/AuthContext";


export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [display, setdisplay] = useState("");


  function handleClick(e) {
    navigate("/login")
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2) {
        // Simulate a backend-like error response
        throw {
          response: {
            data: {
              errors: [{ msg: "Passwords don't match" }]
            }
          }
        };
      }
      await signUp(formData);
      console.log("registration successful")
      //setdisplay(false);
      navigate("/dashboard");
    } catch (err) {
      setdisplay(err.response.data.errors[0].msg);
      console.error(err.response.data.errors[0].msg);
    }
  }

  return (
    <div className={style.mainClass}>

      <div className={style.containerClass}>
        <div className={style.backgroundClassSignup}>
          <div className={style.textOverlay}>
            <h4>Be a part of the<br /> Journey </h4>
            <p>Create an account to start documenting your travels and preserving your memories. </p>
          </div>

        </div>

        <div className={style.loginClass}>

          <form onSubmit={handleSignUp}
            className={style.formClass}>
            <h4 className='text-2xl font-semibold mb-7'>SignUp</h4>

            <input type="text"
              value={formData.name}
              placeholder="Full Name"
              name="userName"
              required
              autoComplete="on"
              minLength="4"
              className={style.inputBox}
              onChange={handleChange} />

            <input type="email"
              value={formData.email}
              placeholder="Email"
              name="email"
              required
              autoComplete="on"
              className={style.inputBox}
              onChange={handleChange} />

            <input type="password"
              value={formData.password}
              placeholder="Password"
              name="password"
              required
              minLength="6"
              autoComplete="off"
              className={style.inputBox}
              onChange={handleChange} />

            <input type="Password"
              value={formData.password2}
              placeholder="Confirm Password"
              name="password2"
              required
              minLength="6"
              autoComplete="off"
              className={style.inputBox}
              onChange={handleChange} />

            {(display) &&
              <p style={{
                color: "red",
                fontSize: "0.8rem",
              }}>{display}</p>
            }

            <input type="submit"
              value="CREATE ACCOUNT"
              className={style.btnSecondary}
            />

            <p style={{
              paddingBottom: "8px",
              fontSize: "0.8rem"
            }}>Or</p>

            <input type="submit"
              value="LOGIN"
              className={style.btnPrimary}
              onClick={handleClick} />
          </form>
        </div>
      </div>
    </div>
  )
}
