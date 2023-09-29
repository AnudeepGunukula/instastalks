import React, { useState } from "react";
import { GrGrid } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";
import Content from "./Content";
import classes from "./PostReelsNav.module.css";
import Posts from "./Posts";
import Reels from "../Reels/Reels";
function PostReelsNav({ userData }) {
  const [activeTab, setActiveTab] = useState("posts");
  const tabContent = {
    posts: (
      <Posts
        userid={userData.userid}
        username={userData.username}
        endpage={userData.endcursor}
        initposts={userData.posts}
        profile_picurl={userData.profile_picurl}
      />
    ),
    reels: <Reels userid={userData.userid} username={userData.username} />,
  };

  const btnclickHandler = (event) => {
    setActiveTab(event);
  };

  return (
    <>
      <div className={classes.navdiv}>
        <div className={classes.postslink}>
          <button
            className={`${classes.transparentbutton} ${
              activeTab === "posts" ? classes.active : ""
            }`}
            onClick={() => {
              btnclickHandler("posts");
            }}
          >
            <GrGrid className={classes.icon} />
            Posts
          </button>
        </div>
        <div className={classes.reelslink}>
          <button
            className={`${classes.transparentbutton} ${
              activeTab === "reels" ? classes.active : ""
            }`}
            onClick={() => {
              btnclickHandler("reels");
            }}
          >
            <FaTiktok className={classes.icon} />
            Reels
          </button>
        </div>
      </div>
      <Content content={tabContent[activeTab]} />
    </>
  );
}

export default PostReelsNav;
