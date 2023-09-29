import React from "react";
import classes from "./SearchItem.module.css";
import { apibasepathurl } from "../../Helpers/Strings";
import { MdVerified, MdPublic } from "react-icons/md";
import { FaLock } from "react-icons/fa";

function SearchItem({ item }) {
  return (
    <>
      <div className={classes.resultcontainer}>
        <img
          src={`${apibasepathurl}/proxy/${item.profilepicurl}`}
          className={classes.profilepic}
        />
        <div className={classes.content}>
          <p>
            {item.username} {item.isverified && <MdVerified color="blue" />}
          </p>
          <p>{item.fullname}</p>
        </div>
        <div className={classes.private}>
          {item.isprivate && <FaLock color="red" />}
        </div>
      </div>
    </>
  );
}

export default SearchItem;
