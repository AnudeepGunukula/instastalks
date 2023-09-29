import React, { useState } from "react";
import { apibasepathurl, formatNumber } from "../../../Helpers/Strings";
import classes from "./UserBio.module.css";
import StoryHighlight from "../../UI/StoryHighlight";
import StoryModal from "../../UI/StoryModal";
import axios from "axios";
import { baseurl } from "../../../Helpers/Strings";
import ImageViewer from "../Modal/ImageViewer";
let posts = {};
function UserBio(props) {
  const userData = props.userData;
  const username = userData.username;
  const [stories, setStories] = useState({});
  const [storyModal, setStoryModal] = useState(false);

  const storyViewHandler = async () => {
    await getstories();
    setStoryModal(true);
  };
  const modalClose = () => {
    setStoryModal(false);
  };

  const getstories = async () => {
    try {
      const response = await axios.post(`${baseurl}/story/${username}`, {
        userid: userData.userid,
      });
      const postdata = response.data;
      setStories(postdata);
    } catch (error) {
      console.log(error);
      throw Error({ error: "error occured" });
    }
  };

  return (
    <>
      <StoryModal stories={stories} isOpen={storyModal} onClose={modalClose}>
        <ImageViewer post={stories} type="story" />
      </StoryModal>
      <div className={classes.UserBio}>
        <div className={classes.storycontainer} onClick={storyViewHandler}>
          <img
            src={`${apibasepathurl}/proxy/${userData.profile_picurl}`}
            className={classes.profilepic}
          />
          <StoryHighlight className={classes.story} />
        </div>
        <div className={classes.userBioInfo}>
          <p className={classes.username}>{userData.username}</p>
          <div className={classes.counts}>
            <p>
              <span>{formatNumber(userData.postscount)}</span>posts
            </p>
            <p>
              <span>{formatNumber(userData.followedby)}</span>followers
            </p>
            <p>
              <span>{formatNumber(userData.followingcount)}</span>following
            </p>
          </div>
          <p className={classes.fullname}>
            {userData.full_name}
            <p className={classes.biography}>{userData.biography}</p>
          </p>
        </div>
      </div>
    </>
  );
}

export default UserBio;
