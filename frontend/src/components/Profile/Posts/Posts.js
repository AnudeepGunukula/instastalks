import React, { useState } from "react";
import Card from "../../UI/Card";
import classes from "./Posts.module.css";
import { useEffect } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { baseurl } from "../../../Helpers/Strings";
import axios from "axios";

let after = undefined;
let prevend = "";
function Posts({ profile_picurl, userid, username, initposts, endpage }) {
  const [hasReachedend, setHasReachedEnd] = useState(false);
  const [endCursor, setEndCursor] = useState(endpage);
  const [posts, setPosts] = useState(initposts);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (after === undefined) {
      after = endCursor;
    }
    if (scrollTop + windowHeight >= documentHeight - 100) {
      setEndCursor(after);
      setHasReachedEnd(true);
    }
  };
  const getPosts = async () => {
    try {
      const response = await axios.post(`${baseurl}/${username}`, {
        userid: userid,
        after: endCursor,
      });
      const postdata = response.data.posts;
      prevend = after;
      after = response.data.after;
      setPosts((prev) => [...prev, ...postdata]);
      setHasReachedEnd(false);
    } catch (error) {
      console.log(error);
      throw Error({ error: "error occured" });
    }
  };

  useEffect(() => {
    after = undefined;
    prevend = "";
  }, []);

  useEffect(() => {
    if (prevend === endCursor) {
      setHasReachedEnd(false);
    }
    if (hasReachedend && prevend !== endCursor && after !== "") {
      getPosts();
    }
  }, [hasReachedend]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(hasReachedend, endCursor, after, prevend);
  return (
    <>
      <div className={classes.cardcontainer}>
        {posts.map((post, index) => {
          return (
            <Card
              key={index}
              post={post}
              username={username}
              profile_picurl={profile_picurl}
            />
          );
        })}
      </div>
      {hasReachedend && after !== "" && <LoadingSpinner />}
      {after === "" && <div style={{ paddingTop: "70px" }}></div>}
    </>
  );
}

export default Posts;
