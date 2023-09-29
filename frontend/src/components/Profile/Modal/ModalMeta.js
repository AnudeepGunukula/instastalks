import React from "react";
import classes from "./ModalMeta.module.css";
import { downloadhandler } from "../../../Helpers/Strings";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment, FaDownload } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { apibasepathurl, formatNumber } from "../../../Helpers/Strings";
import { useParams } from "react-router-dom";
function ModalMeta({ profile_picurl, username, post }) {
  const params = useParams();
  return (
    <div className={classes.modalmeta}>
      <div className={classes.userinfo}>
        <img
          src={`${apibasepathurl}/proxy/${profile_picurl}`}
          className={classes.profilepic}
        />
        <p className={classes.username}>{username}</p>
      </div>
      <div>
        <p className={classes.posttext}>
          {post.posttext ? post.posttext : post.reelcaption}
        </p>
      </div>
      <div className={classes.likecommentdiv}>
        <div className={classes.likes}>
          <AiFillHeart style={{ color: "red", height: "25px" }} />
          <p>
            {post.postlikes
              ? formatNumber(post.postlikes)
              : formatNumber(post.reellikes)}
          </p>
        </div>
        <div className={classes.comments}>
          {post.postcomments !== undefined && (
            <FaRegComment style={{ color: "white", height: "25px" }} />
          )}
          {post.postcomments === undefined && (
            <BsPlayFill style={{ color: "white", height: "25px" }} />
          )}
          <p>
            {post.postcomments !== undefined
              ? formatNumber(post.postcomments)
              : formatNumber(post.reelplays)}
          </p>
        </div>
        <button
          className={`${classes.transparentbutton}`}
          onClick={() => downloadhandler(params.username)}
        >
          <FaDownload color="white" className={classes.icon} />
          Download
        </button>
      </div>
    </div>
  );
}

export default ModalMeta;
