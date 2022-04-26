import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/create">Create</Link>
    </div>
  );
};

export default Navbar;
