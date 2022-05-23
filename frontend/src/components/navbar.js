import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../img/logout.png";
import Home from "../img/home.png";
import Open from "../img/open.png";
import Close from "../img/close.png";
import Notes from "../img/notes.png";
import UserSmByline from "./user/user-sm-byline";
const Navbar = () => {
  const currentUser = localStorage.getItem("user");
  const loggut = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  const [nav, setNav] = useState(false);
  function toggleNav() {
    if (nav == false) {
      setNav(true);
    } else setNav(false);
  }
  return (
    <>
      <header>
        <nav className="smallNav">
          <UserSmByline id={currentUser} />
          <div className="toggleNav">
            {nav && <img onClick={() => toggleNav()} src={Open} alt="" />}
            {!nav && <img onClick={() => toggleNav()} src={Close} alt="" />}
            <img
              onClick={() => {
                loggut();
              }}
              src={Logout}
              alt=""
            />
          </div>
        </nav>

        {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create">Create</Link>
        </nav> */}
        {nav && (
          <nav>
            <Link to="/">
              <img src={Home} alt="home button" />
            </Link>
            <Link to="/create">
              <img src={Notes} alt="" />
            </Link>
          </nav>
        )}

        <nav className="largeNav">
          <Link to="/" className="logo">
            <h1>NoteBook</h1>
          </Link>
          <div className="header-btns">
            <a
              href="#"
              onClick={() => {
                loggut();
              }}
            >
              <button>Loggut</button>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
