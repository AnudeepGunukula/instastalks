import React from "react";
import classes from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <>
      <div className={classes.modaloverlay} onClick={onClose}></div>
      <div className={classes.modal}>
        <button className={classes.modalclosebutton} onClick={onClose}>
          <AiOutlineClose />
        </button>
        <div className={classes.modalcontent}>{children}</div>
      </div>
    </>
  );
}

export default Modal;
