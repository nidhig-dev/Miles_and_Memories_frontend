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


export default function EditStory() {
    const { cookies } = useAuth();
    const { storyInfo } = useStory();
    const [formData, setFormData] = useState({
        imageUrl: storyInfo.imageUrl,
        title: storyInfo.title,
        desc: storyInfo.desc,
        // changing the date format 6th october 2017 to 2017-10-06 to be compatible with calender Date field
        visitedDate: dayjs(storyInfo.visitedDate).format("YYYY-MM-DD"),
        visitedLocation: storyInfo.visitedLocation,
    });
    const [updateImage, setUpdateImage] = useState(false);
    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const nav = useNavigate();
    const { id } = useParams();
    console.log("story id is", id);
    // 6th June 2024
    const formattedDate = dayjs(storyInfo.visitedDate).format("Do MMMM YYYY");


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // handle image selection
    function handleFileChange(e) {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // shows preview
        }

    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // console.log(storyInfo.imageUrl);
            console.log("id is", id);
            console.log("token is", cookies.token);

            if(updateImage){
            const imageData = new FormData();
            imageData.append("image_story", image); // name I gave in multer field name

            console.log(imageData);

            let res = await axios.post("http://localhost:3000/api/image", imageData)


            const imageUrl = res.data;
            
            await axios.put(`http://localhost:3000/api/story/${id}`, {
                imageUrl: imageUrl,
                title: formData.title,
                desc: formData.desc,
                visitedDate: formData.visitedDate,
                visitedLocation: formData.visitedLocation,
            }, {
                headers: { "x-auth-token": cookies.token },
            })
        }
        else{
                await axios.put(`http://localhost:3000/api/story/${id}`, formData, {
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
        setUpdateImage(true);
    }
    return (
        <div>
            <div className={style.mainContainer}>
                <div className={style.storyCard}>
                    <form onSubmit={handleSubmit}>

                        {(!updateImage) ?
                            <>
                                <div className={style.imageContainer}>
                                    <img src={storyInfo.imageUrl}
                                        alt={storyInfo.title}
                                    />
                                    <button class={style.imageButtons}
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
                 {(!updateImage) ?
                    <div className={style.btnContainer}>
                        <button className={style.btnPrimary}
                            onClick={() => nav("/dashboard")} >back</button>
                    </div>

                    :
                    //undo
                    <div className={style.btnContainer}>
                        <button className={style.btnPrimary}
                            onClick={() => window.location.reload()}>back</button>
                    </div>               
                }
 
            </div>

        </div>
    )
}
