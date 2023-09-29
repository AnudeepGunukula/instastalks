import axios from "axios";

export const apibasepathurl = "http://localhost:8000/api";
export const baseurl = "http://localhost:8000/api";

export const formatNumber = (number) => {
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    if (number < 0) {
      return "0";
    }
    return number.toString();
  }
};

export const downloadhandler = async (username) => {
  const honeytag = document.getElementById("honey");
  const buttertag = document.getElementById("butter");
  let srcValue;
  let filename;
  let contenttype;
  if (honeytag !== null) {
    const imgtag = honeytag.querySelector("img");
    srcValue = imgtag.getAttribute("src");
    filename = `${username}.jpeg`;
    contenttype = "image/jpeg";
  }
  if (buttertag !== null) {
    const videotag = buttertag.querySelector("source");
    srcValue = videotag.getAttribute("src");
    filename = `${username}.mp4`;
    contenttype = "video/mp4";
  }
  axios
    .get(srcValue, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.log(error));
};
