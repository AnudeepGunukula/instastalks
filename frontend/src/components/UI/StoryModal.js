import React from "react";
import classes from "./StoryModal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { downloadhandler } from "../../Helpers/Strings";
import { useParams } from "react-router-dom";

function StoryModal({ isOpen, onClose, stories, children }) {
  const params = useParams();
  if (!isOpen) return null;
  let isstory = false;
  if (stories.stories !== undefined && stories.stories.length > 0) {
    isstory = true;
  }

  return (
    <>
      <div className={classes.modaloverlay} onClick={onClose}></div>
      <div className={` ${isstory ? classes.modal : classes.center}`}>
        <button className={classes.modalclosebutton} onClick={onClose}>
          <AiOutlineClose />
        </button>
        <button
          className={classes.downloadbutton}
          onClick={() => {
            downloadhandler(params.username);
          }}
        >
          <FaDownload />
        </button>
        <div>{children}</div>
      </div>
    </>
  );
}

export default StoryModal;
