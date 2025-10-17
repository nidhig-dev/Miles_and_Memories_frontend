import style from "./StoryDetail.module.css"
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useUser } from "../../context/userContext/UserContext";

//import components
import Navbar from "../../components/navbar/Navbar";

//dayjs.extend(advancedFormat);



export default function StoryDetail() {
    const { cookies, logout } = useAuth();
    const nav = useNavigate();
    const { setUser } = useUser();
    const [addStory, setAddStory] = useState({
       imageUrl:"",
        title: "",
        desc: "",
        visitedDate: "",
        visitedLocation: "",
    })
    const[image,setImage]=useState(null);
    const [preview, setPreview]=useState("");
    // 6th June 2024
    //const formattedDate = dayjs(storyInfo.visitedDate).format("Do MMMM YYYY");
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
    useEffect(() => {
        if (cookies.token) {
            getUserInfo();
        }
    }, [cookies.token])


    function handleChange(e) {
        setAddStory({ ...addStory, [e.target.name]: e.target.value });
        
    }

    // handle image selection
    function handleFileChange(e) {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // shows preview
        }
        
    }
    async function handleAdd(e) {
        e.preventDefault();
        try {
            console.log("token is", cookies.token);
            //call add image route to add image to uploads folder with the proper url
            //  Construct FormData for multer
            const imageData = new FormData();
            imageData.append("image_story", image); // name I gave in multer field name
           
            console.log(imageData);
           
            let res = await axios.post("http://localhost:3000/api/image", imageData)
                

            const imageUrl=res.data;
           
            await axios.post(`http://localhost:3000/api/story/`, {
                imageUrl:imageUrl,
                title:addStory.title,
                desc: addStory.desc,
                visitedDate: addStory.visitedDate,
                visitedLocation: addStory.visitedLocation,

            }, {
                headers: { "x-auth-token": cookies.token                    
                 },
                
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

            <div className={style.mainContainer}>
                <div className={style.addStoryCard}>
                    <form onSubmit={handleAdd}>                                         
                        
                        <div className={style.contentClass}>
                            <div>
                                <label >Choose an Image: </label>
                                <input className={style.fileInput}
                                    type="file"
                                    name="image_story"
                                    accept="image/*"
                                    onChange={handleFileChange} />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            width: "100%",
                                            marginTop: "10px",
                                            borderRadius: "8px",
                                            maxHeight: "300px",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                            </div>

                            <div className={style.gridClass}>
                                <label>Title: </label>
                                <input className={style.inputBox}
                                    type="text"
                                    placeholder="Enter Title"
                                    value={addStory.title}
                                    name="title"
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridClass} >
                                <label>Visited Date: </label>
                                <input className={style.inputBox}
                                    type="date"
                                    value={addStory.visitedDate}
                                    name="visitedDate"
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridClass}>
                                <label>Description: </label>
                                <textarea className={style.inputArea}
                                    placeholder="Enter Story description"
                                    value={addStory.desc}
                                    name="desc"
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridClass} >
                                <label>Visited Location: </label>
                                <input className={style.inputBox}
                                    type="text"
                                    placeholder="Enter Location"
                                    value={addStory.visitedLocation}
                                    name="visitedLocation"
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridSubmit}>
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

    )
}
