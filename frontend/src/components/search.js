import SearchImg from "../img/search.png";
const Search = () => {
  return (
    <>
      <div className="search-body">
        <div className="search-box">
          <input type="text" />
          <img src={SearchImg} alt="" />
        </div>
        {/* <div className="result-box">result</div> */}
      </div>
    </>
  );
};

export default Search;
