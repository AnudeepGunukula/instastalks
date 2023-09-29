import React, { useEffect, useState } from "react";
import classes from "../Posts/Posts.module.css";
import axios from "axios";
import { baseurl } from "../../../Helpers/Strings";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

function Reels({ userid, username }) {
  const [reeldata, setReels] = useState([]);
  const [hasReachedend, setHasReachedEnd] = useState(false);
  const [maxId, setMaxId] = useState(undefined);
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      setHasReachedEnd(true);
    }
  };

  const getReels = async () => {
    try {
      let data = { userid: userid };
      if (maxId !== "") {
        data.max_id = maxId;
      }
      const response = await axios.post(`${baseurl}/reels/${username}`, data);
      const reeldata = response.data.reels;
      setMaxId(response.data.endcursor);
      setHasReachedEnd(false);
      setReels((prev) => [...prev, ...reeldata]);
    } catch (error) {
      console.log(error);
      throw Error({ error: "error occured" });
    }
  };
  useEffect(() => {
    if (maxId !== "") {
      getReels();
    }
  }, [hasReachedend]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={classes.cardcontainer}>
        {reeldata.map((post, index) => {
          return <Card key={index} post={post} />;
        })}
      </div>
      {(maxId === undefined || (hasReachedend && maxId !== "")) && (
        <LoadingSpinner />
      )}
      {maxId === "" && !hasReachedend && (
        <p style={{ textAlign: "center" }}>No Reels Found</p>
      )}
      {maxId === "" && <div style={{ paddingTop: "70px" }}></div>}
    </>
  );
}

export default Reels;
