import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

//import context
import { useAuth } from "../context/authContext/AuthContext";
import { useUser } from "../context/userContext/userContext";


export default function Navbar() {
    //const { user } = useAuth();
    //console.log(user);
    const{user}=useUser();
    const{logout}=useAuth();
    return (
        <>
            <div className={style.mainContainer}>
                <h4 className={style.logo}>Miles n Memories</h4>
                <div className={style.userInfo}>
                    {user ? (
                        <>
                            <p>Welcome {user.userName}!</p>
                            <Link to="/login" onClick={logout}>
                                <u>Logout</u>
                            </Link>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <hr />
        </>
    )
}
