import style from "../pages/auth/Auth.module.css";
import { Link } from "react-router-dom"

//This page display 404 error if any path other than the designated paths is entered
export default function Missing() {
  return (

    <div className={style.mainClass}>

      <div className={style.containerClass}>
        <div className={style.backgroundClassLogin}>
          <div className={style.textOverlay}> </div>
        </div>
        <div className={style.loginClass}><div>
            <h1>404:Page not found</h1>
            <Link to="/">Go back to home page</Link>
          </div>
        </div>
      </div>
    </div>
  )
}





