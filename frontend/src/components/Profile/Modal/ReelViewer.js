import React, { useEffect, useState } from "react";
import { useRef } from "react";
import classes from "./ImageViewer.module.css";
import { apibasepathurl } from "../../../Helpers/Strings";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { FaPlay } from "react-icons/fa";
function ReelViewer({ post }) {
  const [videoLoading, setVideoLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  const videoStartHandler = () => {
    setVideoLoading(false);
  };
  const pauseHandler = () => {
    if (videoRef.current.paused) {
      setIsPaused(false);
      videoRef.current.play();
    } else {
      setIsPaused(true);
      videoRef.current.pause();
    }
  };
  useEffect(() => {
    setVideoLoading(true);
    setIsPaused(false);
  }, [post.reelsrc]);

  return (
    <>
      <div id="butter" className={classes.modalcontent} onClick={pauseHandler}>
        <div className={classes.spinner}>
          {videoLoading && <LoadingSpinner />}
        </div>

        <video
          autoPlay
          controls={false}
          ref={videoRef}
          onEnded={handleVideoEnd}
          onLoadedData={videoStartHandler}
          key={post.reelsrc}
        >
          <source
            src={`${apibasepathurl}/proxy/${post.reelsrc}`}
            type="video/mp4"
          />
        </video>
        {isPaused && <FaPlay className={classes.playicon} />}
      </div>
    </>
  );
}

export default ReelViewer;
