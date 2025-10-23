import { useEffect, useState } from 'react';
import axios from "axios";
import style from "../../components/story/StoryCard.module.css"
import { MdAddCircle } from 'react-icons/md';
import { IoCreate } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

//import components
import Navbar from "../../components/navbar/Navbar";
import StoryCard from '../../components/story/StoryCard';
import Search from "../../components/story/Search";
//import context
import { useAuth } from "../../context/authContext/AuthContext";

export default function Home() {
  const { cookies} = useAuth();
  const [stories, setStories] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  //when navigation returns to this page after deleting or updating a story, and stories are still being fetched from backend, to avoid 
  // showing create a story sign even though user has stories.
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  //get user stories
  async function getUserStories() {
    try {
      setLoading(true);
      let res = await axios.get("http://localhost:3000/api/story", {
        headers: { "x-auth-token": cookies.token },
      });
      setStories(res.data);
      setLoading(false);
    }
    catch (err) {      
      console.error(err.message);     
    }
    finally {
      setLoading(false); 
    }
  }
  useEffect(() => {
    if (cookies.token) {
      getUserStories();
    }
  }, [cookies.token])

  function handleAdd() {
    nav("/addstory")
  }

  function handleBack(){
    setIsSearch(false);
    getUserStories();    
  }
  return (
    <>
      <Navbar />
      <div className={style.mainContainer}>
        <div className={style.storyCard}>
          {
          loading ? (
            <p>Loading...</p>
          ) : (stories.length > 0) ?
            stories.map((story) => (
              <StoryCard key={story.title} {...story} />
            ))
            : 
            // showing empty story card with a msg
            <>
              <div className={style.emptyStoryCard}>
                <div className={style.createClass}>
                  <IoCreate className={style.createStoryLogo} />
                  <p>Create new story</p>
                </div>
              </div>
            </>
          }
        </div>
        <div className={style.rightSection}>
          <Search setStories={setStories} setIsSearch={setIsSearch} />
          {(isSearch) &&         
          <>
            <button className={style.btnBack}
                onClick={handleBack}>back</button>
            
          </>
            
          }  
          <div className={style.addLogo}>
            <MdAddCircle onClick={handleAdd} className={style.addIcon} />
          
          </div>

        </div>

      </div>
    </>
  )
}
