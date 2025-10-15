import style from "./StoryDetail.module.css"
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
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
    const nav = useNavigate();
    const { setUser } = useUser();
    const [storyInfo, setStoryInfo] = useState({
        visitedLocation: [],

    });
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        visitedDate: "",
        visitedLocation: "",
    })
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

    function handleEdit() {
        setFormData({
            imageUrl: storyInfo.imageUrl,
            title: storyInfo.title,
            desc: storyInfo.desc,
            // changing the date format 6th october 2017 to 2017-10-06 to be compatible with calender Date field

            visitedDate: dayjs(storyInfo.visitedDate).format("YYYY-MM-DD"),
            visitedLocation: storyInfo.visitedLocation,
        })
        setIsEdit(true);

    }

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
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log(storyInfo.imageUrl);
            console.log("id is", id);
            console.log("token is", cookies.token);

            await axios.put(`http://localhost:3000/api/story/${id}`, formData, {
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

            {(!isEdit)
                ?
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
                                        {storyInfo.visitedLocation}
                                    </div>
                                </div>
                            </div>
                            <div class={style.btnContainer}>
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
                :
                <>
                    <div className={style.mainContainer}>
                        <div className={style.storyCard}>
                            <form onSubmit={handleSubmit}>
                                <img src={storyInfo.imageUrl}
                                    alt={storyInfo.title}
                                />
                                <div className={style.contentClass}>
                                    <div className={style.gridClass}>
                                        <label>Title: </label>
                                        <input className={style.inputBox}
                                            type="text"
                                            required
                                            value={formData.title}
                                            name="title"
                                            onChange={handleChange} />
                                    </div>
                                    <div className={style.gridClass}>
                                        <label>VisitedDate: </label>
                                        <input className={style.inputBox}
                                            type="date"
                                            required
                                            value={formData.visitedDate}
                                            name="visitedDate"
                                            onChange={handleChange} />
                                    </div>
                                    <div className={style.gridClass}>
                                        <label>Description: </label>
                                        <textarea className={style.inputArea}
                                            required
                                            value={formData.desc}
                                            name="desc"
                                            onChange={handleChange} />
                                    </div>
                                    <div className={style.gridClass}>
                                        <label>Visited Location: </label>
                                        <input className={style.inputBox}
                                            type="text"
                                            required
                                            value={formData.visitedLocation}
                                            name="visitedLocation"
                                            onChange={handleChange} />
                                        <input className={style.btnSubmit}
                                            type="submit"
                                            value="Submit" />

                                    </div>


                                </div>

                            </form>
                        </div>
                        <div className={style.btnContainer}>
                            <button className={style.btnPrimary}
                                onClick={() => nav("/dashboard")} >back</button>
                        </div>
                    </div>

                </>
            }
        </>
    )
}
