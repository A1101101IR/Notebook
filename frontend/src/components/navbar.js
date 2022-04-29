import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <h1>Blog</h1>
        </Link>
        <div className="header-serach-bar">
          <span className="search-icon"></span>
          <input type="text" placeholder="Sreach?" className="search-bar" />
          <span className="search-close-icon"></span>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create">Create</Link>
        </nav>
        <div className="header-btns">
          <a href="#">Login</a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
