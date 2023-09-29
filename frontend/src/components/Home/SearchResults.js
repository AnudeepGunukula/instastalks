import React from "react";
import classes from "./SearchResults.module.css";
import SearchItem from "./SearchItem";
function SearchResults({ searchresults, navigate }) {
  return (
    <>
      <div className={classes.container}>
        <ul>
          {searchresults.map((item, index) => (
            <li key={index} onClick={() => navigate(item.username)}>
              <SearchItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchResults;
