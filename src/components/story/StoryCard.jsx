import style from "./StoryCard.module.css"

export default function StoryCard({ imageUrl, title, visitedDate, desc, visitedLocation }) {
    return (
        <div className={style.oneStoryCard}>
            <img src={imageUrl}
            alt={title}
            />
            <p>{title}</p>
            <p>{visitedDate}</p>
            <p>{desc}</p>
            <p>{visitedLocation}</p>


        </div>
    )
}
