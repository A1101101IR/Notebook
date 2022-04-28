import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <h1>Instagram</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create">Create</Link>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
