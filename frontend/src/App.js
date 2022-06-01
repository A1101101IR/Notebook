import Main from "./components/main";
import Navbar from "./components/navbar";
import User from "./components/user/user";
import { useEffect, useState } from "react";
import Users from "./components/user/users";
import Welcome from "./components/login/welcome";
import { Routes, Route } from "react-router-dom";

function App() {
  /**
   * Using useEffect as userProvider
   * it will check if there is any user data i localStorege
   * if yes, it will show the content of our app
   * else our welcome page where user can create account och login
   */
  const [islogged, setIslogged] = useState();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIslogged(true);
    } else {
      setIslogged(false);
    }
  });
  return (
    <section>
      {islogged ? (
        <>
          <Navbar />
          <div className="site">
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/setting" element={<User />}></Route>
            </Routes>
          </div>
        </>
      ) : (
        <Welcome />
      )}
    </section>
  );
}

export default App;
