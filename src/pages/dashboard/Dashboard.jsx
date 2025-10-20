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
import { useUser } from "../../context/userContext/UserContext";

export default function Home() {
  const { cookies, logout } = useAuth();
  const { setUser } = useUser();
  const [stories, setStories] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const nav = useNavigate();

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
  //get user stories
  async function getUserStories() {
    try {
      console.log("token is", cookies.token);
      let res = await axios.get("http://localhost:3000/api/story", {
        headers: { "x-auth-token": cookies.token },
      });
      console.log("story res is", res.data);
      setStories(res.data);
    }
    catch (err) {
      console.error(err);     
    }
  }
  useEffect(() => {
    if (cookies.token) {
      getUserInfo();
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
          {(stories.length > 0) ?
            stories.map((story) => (
              <StoryCard key={story.title} {...story} />
            ))
            :
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
