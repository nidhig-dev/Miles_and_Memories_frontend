import style from '../../pages/Story/StoryDetail.module.css';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

//import context
import { useAuth } from "../../context/authContext/AuthContext";
import { useStory } from '../../context/storyContext/StoryContext';

dayjs.extend(advancedFormat);

//This function edits a user story
export default function EditStory() {
    const { cookies } = useAuth();
    const { storyInfo } = useStory();
    //initialize the story data to state 
    const [formData, setFormData] = useState({
        imageUrl: storyInfo.imageUrl,
        title: storyInfo.title,
        desc: storyInfo.desc,
        // changing the date format from 6th october 2017 to 2017-10-06 to be compatible with calender Date field
        visitedDate: dayjs(storyInfo.visitedDate).format("YYYY-MM-DD"),
        //if loction is an array (from backend), convert to string so that split method can work(below)
        visitedLocation: Array.isArray(storyInfo.visitedLocation)
            ? storyInfo.visitedLocation.join(",")
            : storyInfo.visitedLocation,
    });
    //This state will check if the user has updated image or other fields
    const [updateImage, setUpdateImage] = useState(false);
    //This state sets an image
    const [image, setImage] = useState(null);
    //This displays the preview of the image that is uploaded by the user from their device
    const [preview, setPreview] = useState("");

    const nav = useNavigate();
    //get the story id from url
    const { id } = useParams();


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    // handle image selection
    function handleFileChange(e) {
        //get the uploaded image
        const file = e.target.files[0];
        setImage(file);
        //if image is uploaded then set preview
        if (file) {
            setPreview(URL.createObjectURL(file));
        }

    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //split the visited location by comma and then map over each item and put it as an item in locationsArray
            const locationsArray = formData.visitedLocation.split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");

            //if user has updated image append the image to formdata and send to backend
            if (updateImage) {
                const imageData = new FormData();
                imageData.append("image_story", image); // name I gave in multer field name
                //Call upload image route
                let res = await axios.post("https://miles-and-memories-backend.onrender.com/api/image", imageData)
                //get the newly created url   
                const imageUrl = res.data;
                //update the story with new url and if any text fields are changed, update them too
                await axios.put(`https://miles-and-memories-backend.onrender.com/api/story/${id}`, {
                    imageUrl: imageUrl,
                    title: formData.title,
                    desc: formData.desc,
                    visitedDate: formData.visitedDate,
                    visitedLocation: locationsArray,
                }, {
                    headers: { "x-auth-token": cookies.token },
                })
            }
            //if only text fields are changed
            else {
                await axios.put(`https://miles-and-memories-backend.onrender.com/api/story/${id}`, {
                    ...formData,
                    visitedLocation: locationsArray,
                }, {
                    headers: { "x-auth-token": cookies.token },
                })

            }
            nav("/dashboard");
        }
        catch (err) {
            console.error(err);
        }

    }
    function handleUpdateImage() {
        //if image is updated, set the state to true
        setUpdateImage(true);
    }
    return (
        <div>
            <div className={style.mainContainer}>
                <div className={style.storyCard}>
                    <form onSubmit={handleSubmit}>

                        {//if the user has not yet clicked on change image, show them the image with change image button
                            //else give them option to choose image and show preview 
                            (!updateImage) ?
                                <>
                                    <div className={style.imageContainer}>
                                        <img src={storyInfo.imageUrl}
                                            alt={storyInfo.title}
                                            required
                                        />
                                        <button className={style.imageButtons}
                                            type="button"
                                            onClick={handleUpdateImage}
                                        >Change Image</button>
                                    </div>

                                </> :
                                <>
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
                                </>
                        }


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
                                    max={new Date().toISOString().split("T")[0]} //can't be a future date
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
                {//navigate to dashboard on back
                    (!updateImage) ?
                        <div className={style.btnContainer}>
                            <button className={style.btnPrimary}
                                onClick={() => nav("/dashboard")} >back</button>
                        </div>

                        :
                        //reload the page on back
                        <div className={style.btnContainer}>
                            <button className={style.btnPrimary}
                                onClick={() => window.location.reload()}>back</button>
                        </div>
                }

            </div>

        </div>
    )
}
