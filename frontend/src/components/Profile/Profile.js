import React from "react";
import axios from "axios";
import UserBio from "./UserInfo/UserBio";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Posts from "./Posts/Posts";
import PostReelsNav from "./Posts/PostReelsNav";
import { baseurl } from "../../Helpers/Strings";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../store/userInfoSliceReducer";
import classes  from "./Profile.module.css";
function Profile() {
  const data = useLoaderData();
  const dispatch = useDispatch(userInfoActions);
  useEffect(() => {
    dispatch(userInfoActions.setUserInfo(data));
  }, [data]);

  return (
    <>
      <div class={classes.bgcol}>
        <UserBio userData={data} />
        <PostReelsNav userData={data} />
      </div>
    </>
  );
}

export default Profile;

export const loader = async ({ request, params }) => {
  const username = params.username;
  const getUserData = async () => {
    try {
      const response = await axios.get(`${baseurl}/${username}`);
      return response.data;
    } catch (error) {
      throw Error({ message: "error occured" });
    }
  };
  const data = await getUserData();
  return data;
};
