import { useState } from "react";
import Logout from "../img/logout.png";
import Account from "../img/account.png";
import Home from "../img/home.png";
import Explore from "../img/explore.png";
import Open from "../img/open.png";
import Close from "../img/close.png";
import Plus from "../img/plus.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  /* const navigate = useNavigate(); */
  const currentUser = localStorage.getItem("user");

  /**
   * This function will remove current user info from localStorege
   * in order to loggout the current user
   */
  const loggut = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };

  const [nav, setNav] = useState(false);
  /**
   * This function will display toggle navbar in small screen mood.
   */
  function toggleNav() {
    if (nav == false) {
      setNav(true);
    } else setNav(false);
  }
  return (
    <header>
      <nav className="smallNav">
        <Link className="logo" to="/">
          NOTEBOOK
        </Link>

        <div>
          {nav && (
            <nav className="toggleNav">
              <Link to={`/users/${currentUser}`}>
                <img src={Account} alt="" />
              </Link>
              <Link to="/">
                <img src={Plus} alt="" />
              </Link>
              <Link to="/users">
                <img src={Explore} alt="" />
              </Link>
              {/* <span className="logout">
                <img src={Logout} alt="logout icon" onClick={loggut} />
              </span> */}
            </nav>
          )}
          {!nav && <img src={Open} alt="logout icon" onClick={toggleNav} />}
          {nav && <img src={Close} alt="logout icon" onClick={toggleNav} />}
        </div>
      </nav>

      <nav className="largeNav">
        <nav>
          <Link className="logo" to="/">
            NOTEBOOK
          </Link>
          <>
            <Link to={`/users/${currentUser}`}>Home</Link>
            <Link to="/">Create</Link>
            <Link to="/users">Explore</Link>
          </>
        </nav>
        <div className="nav-icons">
          <img src={Logout} alt="logout icon" onClick={loggut} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
