import style from "./StoryDetail.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//import context
import { useAuth } from "../../context/authContext/AuthContext";

//import components
import Navbar from "../../components/navbar/Navbar";

export default function StoryDetail() {
    const { cookies } = useAuth();
    const nav = useNavigate();
    const [addStory, setAddStory] = useState({
        imageUrl: "",
        title: "",
        desc: "",
        visitedDate: "",
        visitedLocation: "",
    })
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");


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
            //split the visited location by comma and then map over each item and put it as an item in locationsArray
            const locationsArray = addStory.visitedLocation.split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");

            //call add image route to add image to uploads folder with the proper url
            //  Construct FormData for multer
            const imageData = new FormData();
            imageData.append("image_story", image); // name I gave in multer field name

            let res = await axios.post("https://miles-and-memories-backend.onrender.com/api/image", imageData);
            const imageUrl = res.data;

            await axios.post(`https://miles-and-memories-backend.onrender.com/api/story/`, {
                imageUrl: imageUrl,
                title: addStory.title,
                desc: addStory.desc,
                visitedDate: addStory.visitedDate,
                visitedLocation: locationsArray,
            }, {
                headers: {
                    "x-auth-token": cookies.token
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
                                    required
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
                                    required
                                    name="title"
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridClass} >
                                <label>Visited Date: </label>
                                <input className={style.inputBox}
                                    type="date"
                                    value={addStory.visitedDate}
                                    name="visitedDate"
                                    required
                                    max={new Date().toISOString().split("T")[0]} //can't be a future date
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridClass}>
                                <label>Description: </label>
                                <textarea className={style.inputArea}
                                    placeholder="Enter Story description"
                                    value={addStory.desc}
                                    name="desc"
                                    required
                                    onChange={handleChange} />
                            </div>

                            <div className={style.gridClass} >
                                <label>Visited Location: </label>
                                <input className={style.inputBox}
                                    type="text"
                                    placeholder="Enter Location"
                                    value={addStory.visitedLocation}
                                    name="visitedLocation"
                                    required
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
