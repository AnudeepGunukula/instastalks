import React, { useState } from "react";
import classes from "./ImageViewer.module.css";
import { apibasepathurl } from "../../../Helpers/Strings";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import ReelViewer from "./ReelViewer";
import { useSelector } from "react-redux";
function ImageViewer({ post, type }) {
  const user = useSelector((state) => state.userInfo.user);
  let nostories = false;
  let childPostsCount;
  let block;
  if (type === "story") {
    if (post.stories.length === 1) {
      childPostsCount = 0;
    } else if (post.stories.length === 0) {
      nostories = true;
      block = <p className={classes.nostories}>No Stories Found</p>;
    } else {
      childPostsCount = post.stories.length;
    }
  } else {
    childPostsCount = post.postchildurls ? post.postchildurls.length : 0;
  }
  const [activePost, setActivePost] = useState(0);
  const [next, setnext] = useState(true);
  const [previous, setprevious] = useState(false);

  const dots = Array(childPostsCount).fill("");
  const prevhandler = () => {
    setnext(true);
    setActivePost((prev) => prev - 1);
    if (activePost === 1) {
      setprevious(false);
    }
  };
  const nexthandler = () => {
    setprevious(true);
    setActivePost((prev) => {
      return prev + 1;
    });
    if (activePost === childPostsCount - 2) {
      setnext(false);
    }
  };

  if (childPostsCount === 0) {
    if (post.stories) {
      if (post.stories[0].type === "video") {
        block = <ReelViewer post={{ reelsrc: post.stories[activePost].src }} />;
      } else if (post.stories[0].type === "image") {
        block = (
          <img
            src={`${apibasepathurl}/proxy/${post.stories[activePost].src}`}
            alt="story"
          />
        );
      }
    } else if (post.postparenturl) {
      block = (
        <img
          src={`${apibasepathurl}/proxy/${post.postparenturl}`}
          alt={user.username}
        />
      );
    }
  } else if (childPostsCount !== 0 && childPostsCount !== undefined) {
    if (post.postchildurls) {
      if (post.postchildurls[activePost].isvideo) {
        block = (
          <ReelViewer post={{ reelsrc: post.postchildurls[activePost].url }} />
        );
      } else {
        block = (
          <img
            src={`${apibasepathurl}/proxy/${post.postchildurls[activePost].url}`}
            alt={user.username}
          />
        );
      }
    } else if (post.stories) {
      if (post.stories[activePost].type === "video") {
        block = <ReelViewer post={{ reelsrc: post.stories[activePost].src }} />;
      } else {
        block = (
          <img
            src={`${apibasepathurl}/proxy/${post.stories[activePost].src}`}
            alt={user.username}
          />
        );
      }
    }
  }
  let cssid;
  if (post.stories !== undefined && post.stories.length !== 0) {
    if (post.stories[activePost].type === "image") {
      cssid = "honey";
    } else {
      cssid = undefined;
    }
  } else {
    cssid = "honey";
  }
  return (
    <div className={classes.modalcontent} id={cssid}>
      {nostories && block}
      {childPostsCount === 0 && block}

      {childPostsCount !== 0 && childPostsCount !== undefined && (
        <>
          {block}
          {
            <div className={classes.indicatorContainer}>
              {dots.map((_, index) => (
                <div
                  key={index}
                  className={`${classes.dot} ${
                    index === activePost ? classes.activedot : ""
                  }`}
                ></div>
              ))}
            </div>
          }
          {next && (
            <AiFillRightCircle
              style={{ height: "30px", width: "30px" }}
              color="white"
              className={classes.next}
              onClick={nexthandler}
            />
          )}
          {previous && (
            <AiFillLeftCircle
              style={{ height: "30px", width: "30px" }}
              color="white"
              className={classes.prev}
              onClick={prevhandler}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ImageViewer;
