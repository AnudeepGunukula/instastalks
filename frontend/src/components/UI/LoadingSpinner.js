import React from "react";
import classes from "./LoadingSpinner.module.css";
function LoadingSpinner() {
  return (
    <div className={classes.loadingspinner}>
      <div className={classes.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
