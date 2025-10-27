import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useUser } from "../../context/userContext/UserContext";

//This function displays logo and user name along with logout link
export default function Navbar() {
    const { user, setUser } = useUser();
    const { cookies, logout } = useAuth();

    //get user info
    async function getUserInfo() {
        try {
            let res = await axios.get("https://miles-and-memories-backend.onrender.com/api/user/profile", {
                headers: { "x-auth-token": cookies.token },
            });
            //provide the user info to all children
            setUser(res.data);
        }
        catch (err) {
            logout();
            console.error(err);
        }
    }
    useEffect(() => {
        if (cookies.token) {
            getUserInfo();
        }
    }, [cookies.token])

    return (
        <>
            <div className={style.mainContainer}>
                <h4 className={style.logo}>Miles n Memories</h4>
                <div className={style.userInfo}>
                    {user ? (
                        <>
                            <p>Welcome {user.userName}!</p>
                            <Link to="/" onClick={logout}>
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <p>Welcome!</p>
                            <Link to="/" onClick={logout}>
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <hr />
        </>
    )
}
