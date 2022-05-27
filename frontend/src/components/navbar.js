import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../img/logout.png";
import SearchImg from "../img/search.png";
import Account from "../img/account.png";
import Manage from "../img/manage.png";
import Notifications from "../img/notifications.png";
import Home from "../img/home.png";
import Open from "../img/open.png";
import Close from "../img/close.png";
import Notes from "../img/notes.png";
import UserSmByline from "./user/user-sm-byline";
import Search from "./search";
const Navbar = () => {
  const currentUser = localStorage.getItem("user");
  const loggut = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  const displaySearchBar = () => {
    if (searchBar == false) {
      setSearchBar(true);
    } else {
      setSearchBar(false);
    }
  };
  const [nav, setNav] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  function toggleNav() {
    if (nav == false) {
      setNav(true);
    } else setNav(false);
  }
  return (
    <Link to="/">
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
          <nav>
            <Link className="logo" to="/">
              NOTEBOOK
            </Link>
            {!searchBar && (
              <>
                <Link to="/">Home</Link>
                <Link to="/">Create</Link>
                <Link to="/">Explore</Link>
              </>
            )}
            {searchBar && <Search />}
          </nav>
          <div className="nav-icons">
            <img src={SearchImg} alt="search icon" onClick={displaySearchBar} />
            {/* <img src={Notifications} alt="" /> */}
            <img src={Logout} alt="logout icon" onClick={loggut} />
          </div>
        </nav>
      </header>
    </Link>
  );
};

export default Navbar;
