import style from "../../components/story/StoryCard.module.css"
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BiCurrentLocation } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useUser } from "../../context/userContext/userContext";

//import components
import Navbar from "../../components/navbar/Navbar";
//import StoryCard from '../../components/story/StoryCard';

dayjs.extend(advancedFormat);



export default function StoryDetail() {
    const { cookies, logout } = useAuth();
    const { setUser } = useUser();
    const [storyInfo, setStoryInfo] = useState({
        visitedLocation:[],

    });
    const { id } = useParams();
    console.log("story id is", id);
    // 6th June 2024
    const formattedDate = dayjs(storyInfo.visitedDate).format("Do MMMM YYYY");
    //get user info
    async function getUserInfo() {
        try {
            let res = await axios.get("http://localhost:3000/api/user/profile", {
                headers: { "x-auth-token": cookies.token },
            });
            console.log("res is", res.data);
            //provide the user info to all children
            setUser(res.data);
        }
        catch (err) {
            logout();
            console.error(err);
            //err.response.data.errors[0].msg);
        }
    }
    //get story detail
    async function getStoryDetail() {
        try {
            console.log("token is", cookies.token);
            let res = await axios.get(`http://localhost:3000/api/story/${id}`, {
                headers: { "x-auth-token": cookies.token },
            });
            console.log("story res is", res.data);
            setStoryInfo(res.data);
            console.log(res.data.visitedLocation);
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (cookies.token) {
            getUserInfo();
            getStoryDetail();
        }
    }, [cookies.token, id])
    return (
        <>
            <Navbar />
            {(storyInfo) ?
                <>
                    <div className={style.oneStoryCard}>
                        <img src={storyInfo.imageUrl}
                            alt={storyInfo.title}
                        />
                        <div className={style.titleClass}>
                            <h6>{storyInfo.title}</h6>
                            <span>{formattedDate}</span>
                        </div>
                        <div>
                            <span>{storyInfo.desc}...</span>
                        </div>

                        <div className={style.storyLocation}>
                            <BiCurrentLocation className={style.locationIcon} />
                            {/* {storyInfo.visitedLocation} */}
                            {(storyInfo.visitedLocation.length > 0) ?
                                storyInfo.visitedLocation.map((location, i) => (
                                    <span>
                                        {location}
                                    </span>)) : storyInfo.visitedLocation
                                    }
                        </div>
                    </div>
                </>
                : <p>Loading...</p>
            }
        </>
    )
}
