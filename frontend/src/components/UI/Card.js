import React from "react";
import { apibasepathurl } from "../../Helpers/Strings";
import ReelViewer from "../Profile/Modal/ReelViewer";
import { FaPlay } from "react-icons/fa";
import { BsFillPinAngleFill } from "react-icons/bs";
import { PiCardsFill } from "react-icons/pi";
import { BiMoviePlay } from "react-icons/bi";
import classes from "./Card.module.css";
import { useState } from "react";
import Modal from "./Modal";
import ImageViewer from "../Profile/Modal/ImageViewer";
import { useSelector } from "react-redux";
import ModalMeta from "../Profile/Modal/ModalMeta";
function Card({ post, profile_picurl, username }) {
  const user = useSelector((state) => state.userInfo.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const postClickHandler = () => {
    openModal();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={classes.modaldiv}>
          {!post.posttype && <ReelViewer post={post} />}
          {post.posttype === "GraphVideo" && (
            <ReelViewer post={{ reelsrc: post.videosrc }} />
          )}
          {(post.posttype === "GraphSidecar" ||
            post.posttype === "GraphImage") && <ImageViewer post={post} />}
          <ModalMeta
            username={username ? username : user.username}
            profile_picurl={
              profile_picurl ? profile_picurl : user.profile_picurl
            }
            post={post}
          />
        </div>
      </Modal>
      <div className={classes.cardcontainer} onClick={postClickHandler}>
        <div className={classes.imgcontainer}>
          {post.postparenturl ? (
            <>
              <img src={`${apibasepathurl}/proxy/${post.postparenturl}`} />
              {post.ispinned && (
                <div className={classes.pinicon}>
                  <BsFillPinAngleFill />
                </div>
              )}
              {!post.ispinned && post.posttype === "GraphSidecar" && (
                <div className={classes.pinicon}>
                  <PiCardsFill />
                </div>
              )}
              {!post.ispinned &&
                post.posttype === "GraphVideo" &&
                !post.ispinned && (
                  <div className={classes.pinicon}>
                    <BiMoviePlay />
                  </div>
                )}
            </>
          ) : (
            <>
              <img src={`${apibasepathurl}/proxy/${post.reelthumbnail}`} />
              <div className={classes.playicon}>
                <FaPlay />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
