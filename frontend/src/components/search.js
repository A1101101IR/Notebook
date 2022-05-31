import { useState } from "react";
import SearchImg from "../img/search.png";

const Search = () => {
  const [search, setSearch] = useState();
  function liveSearch() {
    console.log(search);
    fetch("/search", {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({ payload: search }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <>
      <div className="search-body">
        <div className="search-box">
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <img src={SearchImg} alt="" onKeyUp={liveSearch()} />
        </div>
        {/* <div className="result-box">result</div> */}
      </div>
    </>
  );
};

export default Search;
