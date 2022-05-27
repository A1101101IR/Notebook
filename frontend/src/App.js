import Main from "./components/main";
import Navbar from "./components/navbar";
import User from "./components/user/user";
import Post from "./components/post/post";
import { useEffect, useState } from "react";
import Welcome from "./components/login/welcome";
import { Routes, Route } from "react-router-dom";

function App() {
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
              <Route path="/posts/:id" element={<Post />}></Route>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/setting" element={<User />}></Route>
              {/* <Route path="/users/:id" element={<Aside />}></Route> */}
              {/* <Route path="/posts" element={<Posts />}></Route> */}
              {/* <Route path="/users/:id" element={<Aside />}></Route> */}
              {/* <Route path="/create" element={<Create />}></Route> */}
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
