import { Link } from "react-router-dom";
const Navbar = () => {
  const loggut = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <h1>Blog</h1>
        </Link>
        <div className="header-serach-bar">
          {/* <span className="search-icon"></span> */}
          <input type="text" placeholder="Sreach?" className="search-bar" />
          {/* <span className="search-close-icon"></span> */}
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create">Create</Link>
        </nav>
        <div className="header-btns">
          <a
            href="#"
            onClick={() => {
              loggut();
            }}
          >
            Loggut
          </a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
