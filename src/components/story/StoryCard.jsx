import style from "./StoryCard.module.css"
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


dayjs.extend(advancedFormat);



export default function StoryCard({ _id,imageUrl, title, visitedDate, desc, visitedLocation }) {
    const nav=useNavigate();
    // 6th June 2024
    const formattedDate = dayjs(visitedDate).format("Do MMMM YYYY");
    function handleClick(){
        nav(`/storydetail/${_id}`);

    }
    return (
        <div onClick={handleClick}className={style.oneStoryCard}>
            <img src={imageUrl}
                alt={title}
            />
            <div className={style.titleClass}>
                <h4>{title}</h4>
                <span>{formattedDate}</span>
            </div>
            <div>
                <span>{desc.slice(0,60)}...</span>
            </div>

            <div className={style.storyLocation}>
                <BiCurrentLocation className={style.locationIcon} />
                {visitedLocation.map((location, i) => (
                <span>
                    {location} 
                    </span> ))}
            </div>
        </div>
    )
}
