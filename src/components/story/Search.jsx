import { useState } from 'react'
import style from "../../pages/Story/StoryDetail.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

//import context
import { useAuth } from "../../context/authContext/AuthContext";

//This function sends the search keyword to the backend and displays the stories, if found
export default function Search({ setStories, setIsSearch }) {
    const [search, setSearch] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { cookies, logout } = useAuth();
    
    function handleChange(e) {
        //if error msg was displayed earlier and user types new search keyword, make the error msg disappear
        setErrorMsg("");
        setSearch(e.target.value);
    }
    async function handleSearch(e) {
        e.preventDefault();
        try {
            const keyword = search;
            const res = await axios.get(`http://localhost:3000/api/story/keyword/search`, {
                params: { keyword },
                headers: { "x-auth-token": cookies.token },
            })
            setStories(res.data);
            setSearch("");
            setIsSearch(true);
        }
        catch (err) {
            if (err.response) {
                setSearch("");
                setErrorMsg(err.response.data.errors[0].msg);
            }
            else {
                setSearch("");
                setErrorMsg("No story found");
            }
            console.error(err.response.data.errors[0].msg);
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
                {/* display the error message if any */}
                {(errorMsg) &&
                    <p style={{
                        color: "red",
                        fontSize: "0.8rem",
                        marginTop: "0",
                    }}>{errorMsg}</p>
                }
                <input type="submit"
                    className={style.btnPrimary}
                    value="Search" />
            </form>
        </div>
    )
}

