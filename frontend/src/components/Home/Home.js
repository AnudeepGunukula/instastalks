import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { baseurl } from "../../Helpers/Strings";
import SearchResults from "./SearchResults";
import Footer from "../UI/Footer";
import Banner from "../UI/Banner";

function Home() {
  const [userName, setuserName] = useState("");
  const userNameValid = userName.trim() !== "";
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const callSearch = async (name) => {
    try {
      const response = await axios.get(`${baseurl}/search/${name}`);
      setSearchResults(response.data);
    } catch (error) {
      throw Error({ message: "error occured" });
    }
  };

  const handleInputChange = (event) => {
    const userEntered = event.target.value;
    if (userEntered === "") {
      setSearchResults([]);
    }
    setuserName(userEntered);
  };

  const navigateHandler = (name = "") => {
    if (name !== "") {
      navigate(`/profile/${name}`);
    } else {
      navigate(`/profile/${userName}`);
    }

    setuserName("");
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    navigate(`/profile/${userName}`);
    // callSearch(userName);
  };
  // useEffect(() => {
  //   if (userName !== "") {
  //     const timeoutId = setTimeout(() => {
  //       callSearch(userName);
  //     }, 500);
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [userName]);

  return (
    <>
      <main>
        <div className={classes.homecontain}>
          <div className={classes.homediv}>
            <Banner />
            <form onSubmit={submitFormHandler}>
              <div className={classes.inputcontainer}>
                <input
                  type="text"
                  id="textbox"
                  value={userName}
                  onChange={handleInputChange}
                  className={classes.instainput}
                  placeholder="Enter Instagram Username"
                ></input>
                <button
                  disabled={!userNameValid}
                  className={`${classes.transparentbutton}  searchbtn`}
                >
                  <BsSearch style={{ paddingRight: "20px" }} />
                  <p>Search</p>
                </button>
              </div>
            </form>
            {searchResults.length > 0 && (
              <SearchResults
                navigate={navigateHandler}
                searchresults={searchResults}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
