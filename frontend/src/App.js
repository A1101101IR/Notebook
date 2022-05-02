import { Routes, Route } from "react-router-dom";
import Post from "./components/post/post";
import Create from "./components/create";
import Footer from "./components/footer";
import Main from "./components/main";
import Navbar from "./components/navbar";
import Posts from "./components/post/posts";
import User from "./components/user/user";
import Aside from "./aside";
import { useEffect, useState } from "react";
import Welcome from "./components/login/welcome";
function App() {
  const [islogged, setIslogged] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
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
            <Aside />
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/posts" element={<Posts />}></Route>
              <Route path="/posts/:id" element={<Post />}></Route>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/create" element={<Create />}></Route>
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
