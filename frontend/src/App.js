import Main from "./components/main";
import Navbar from "./components/navbar";
import User from "./components/user/user";
import { useEffect, useState } from "react";
import Welcome from "./components/login/welcome";
import { Routes, Route } from "react-router-dom";
import Users from "./components/user/users";

function App() {
  /** this is a comment */
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
            {/* <Aside /> */}
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/setting" element={<User />}></Route>
            </Routes>
          </div>
          {/* <Footer /> */}
        </>
      ) : (
        <Welcome />
      )}
    </section>
  );
}

export default App;
