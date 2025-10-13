import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

//import context
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
        <div className={style.mainContainer}>
            <h4 className={style.logo}>Miles n Memories</h4>
            <div className={style.userInfo}>
                <p>Welcome {user}!</p>
                <Link to="/login"><u>Logout</u></Link>
            </div>            
        </div>
        <hr/>
        </>
    )
}
