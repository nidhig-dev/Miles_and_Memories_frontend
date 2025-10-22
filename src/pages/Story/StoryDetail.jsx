import style from "./StoryDetail.module.css"
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useStory } from "../../context/storyContext/StoryContext";

//import components
import Navbar from "../../components/navbar/Navbar";
import EditStory from "../../components/story/EditStory";

dayjs.extend(advancedFormat);

export default function StoryDetail() {
    const { cookies } = useAuth();
    const nav = useNavigate();
    const { storyInfo, setStoryInfo } = useStory();
    const [isEdit, setIsEdit] = useState(false);
    //get id from the url
    const { id } = useParams();

    //display in format 6th June 2024
    //If no user has no story then set empty
    const formattedDate = storyInfo
        ? dayjs(storyInfo.visitedDate).format("Do MMMM YYYY")
        : "";

    //get story detail
    async function getStoryDetail() {
        try {
            let res = await axios.get(`http://localhost:3000/api/story/${id}`, {
                headers: { "x-auth-token": cookies.token },
            });
            setStoryInfo(res.data);
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (cookies.token) {
            getStoryDetail();
        }
    }, [cookies.token, id])

    function handleEdit() {
        setIsEdit(true);
    }
    //delete a user story
    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:3000/api/story/${id}`, {
                headers: { "x-auth-token": cookies.token },
            })
            nav("/dashboard");
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Navbar />

            {(isEdit)
                ?
                <>
                    <EditStory />
                </>
                :
                (storyInfo)
                    ?
                    <>
                        <div className={style.mainContainer}>
                            <div className={style.storyCard}>
                                <img src={storyInfo.imageUrl}
                                    alt={storyInfo.title}
                                />
                                <div className={style.contentClass}>
                                    <h3>{storyInfo.title}</h3>
                                    <h6>{formattedDate}</h6>
                                    <span>{storyInfo.desc}</span>
                                    <div className={style.storyLocation}>
                                        <BiCurrentLocation className={style.locationIcon} />
                                        {storyInfo.visitedLocation.map((location, i) => (

                                            (i == storyInfo.visitedLocation.length - 1) ?
                                                <span key={i}
                                                    style={{ color: "var(--buttonSecondaryColor)" }}>
                                                    {location}
                                                </span> :
                                                <span key={i}
                                                    style={{ color: "var(--buttonSecondaryColor)" }}>
                                                    {location},
                                                </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={style.btnContainer}>
                                <button className={style.btnPrimary}
                                    onClick={handleEdit}>Edit</button>
                                <button className={style.btnPrimary}
                                    onClick={handleDelete} >Delete</button>
                                <button className={style.btnPrimary}
                                    onClick={() => nav("/dashboard")} >back</button>
                            </div>
                        </div>
                    </>
                    : <p>Loading...</p>
            }
        </>
    )
}
