import React from "react";
import classes from "./Banner.module.css";
import banner from "../../assets/images/home.jpg";
function Banner() {
  return (
    <>
      <div className={classes.banner}>
        <h1>Anonymous Instagram Profile Viewer And Downloader</h1>
        <h2>Browse Instagram Anonymously - View Stories Posts And Profiles</h2>
      </div>
    </>
  );
}

export default Banner;
