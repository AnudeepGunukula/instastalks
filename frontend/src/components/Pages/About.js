import React from "react";
import classes from "./About.module.css";
function About() {
  return (
    <div className={classes["about-container"]}>
      <h1>About Instastalks</h1>
      <p>
        Instastalks uses the Instagram API but is not endorsed or certified by
        Instagram. All Instagram™ logos and trademarks displayed on this
        application are the property of Instagram.
      </p>

      <p>
        We pick the most popular hashtags and interesting users and help
        marketers understand their Instagram community, better engage with their
        followers, and find new potential fans on Instagram.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you would like to report an issue, have any questions, or for
        advertising cooperation, you can email us directly.
        <a href="mailto:instastalksadmin@gmail.com">
          <p>instastalksadmin@gmail.com</p>
        </a>
      </p>
    </div>
  );
}

export default About;
