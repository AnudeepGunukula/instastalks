import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className={classes.footer}>
        <h1 className={classes.footlogo}>Instastalks</h1>
        <Link to="/about" className={classes.navlink}>
          About & Contact
        </Link>
        <Link to="/privacypolicy" className={classes.navlink}>
          Privacy Policy
        </Link>
        <Link to="/terms" className={classes.navlink}>
          Terms Of Service
        </Link>
      </div>
    </>
  );
}

export default Footer;
