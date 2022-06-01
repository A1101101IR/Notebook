import { useState } from "react";
import Logout from "../img/logout.png";
import Account from "../img/account.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
        <div>
          <Link to={`/users/${currentUser}`}>
            <img src={Account} alt="" />
          </Link>
          <Link className="logo" to="/">
            NOTEBOOK
          </Link>
        </div>
        <div>
          <img src={Logout} alt="logout icon" onClick={loggut} />
        </div>
      </nav>

      <nav className="largeNav">
        <nav>
          <Link className="logo" to="/">
            NOTEBOOK
          </Link>
          <>
            <Link to="/">Home</Link>
            <Link to="/">Create</Link>
            <Link to="/">Explore</Link>
          </>
        </nav>
        <div className="nav-icons">
          {/* <img src={Notifications} alt="" /> */}
          <img src={Logout} alt="logout icon" onClick={loggut} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
