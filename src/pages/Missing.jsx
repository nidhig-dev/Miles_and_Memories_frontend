import style from "../pages/auth/Auth.module.css";
import { Link } from "react-router-dom"


export default function Missing() {
  return (

    <div className={style.mainClass}>

      <div className={style.containerClass}>
        <div className={style.backgroundClassLogin}>
          <div className={style.textOverlay}> </div>
        </div>
        <div className={style.loginClass}><div>
            <h1>404:Page not found</h1>
            <Link to="/login">Go back to home page</Link>
          </div>
        </div>
      </div>
    </div>
  )
}





