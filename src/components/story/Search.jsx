import { useState } from 'react'
import style from "../../pages/Story/StoryDetail.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useUser } from "../../context/userContext/UserContext";


export default function Search({setStories,setIsSearch}) {
    const [search, setSearch] = useState("");
    const { cookies, logout } = useAuth();
   
    const nav = useNavigate();
    //const { setUser } = useUser();
   // const { storyInfo, setStoryInfo } = useStory();
    //const [isEdit, setIsEdit] = useState(false);
    //const { id } = useParams();


    // //get user info
    // async function getUserInfo() {
    //     try {
    //         let res = await axios.get("http://localhost:3000/api/user/profile", {
    //             headers: { "x-auth-token": cookies.token },
    //         });
    //         console.log("res is", res.data);
    //         //provide the user info to all children
    //         setUser(res.data);
    //     }
    //     catch (err) {
    //         logout();
    //         console.error(err);
    //         //err.response.data.errors[0].msg);
    //     }
    // }

    function handleChange(e) {
        setSearch(e.target.value);
    }
    async function handleSearch(e) {
        e.preventDefault();
        try {
            const keyword=search;
            const res= await axios.get(`http://localhost:3000/api/story/keyword/search`, {
                params: { keyword },
                headers: { "x-auth-token": cookies.token },
            })
            console.log("search story is",res.data);
            setStories(res.data);
            setSearch("");
            setIsSearch(true);
            // nav("/dashboard");
        }
        catch (err) {
            console.error(err);
        }

    }
    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text"
                    className={style.searchBox}
                    placeholder="Search.."
                    required
                    value={search}
                    onChange={handleChange}
                />
                <input type="submit"
                    className={style.btnPrimary}
                    value="Search" />
            </form>
        </div>
    )
}

