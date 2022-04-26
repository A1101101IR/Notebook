/* import { useState, useEffect } from "react"; */
import { Routes, Route } from "react-router-dom";
import Create from "./components/create";
import Footer from "./components/footer";
import Main from "./components/main";
import Navbar from "./components/navbar";
import Posts from "./components/posts";

function App() {
  /* const [data, setData] = useState();
  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); */
  return (
    <section>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/create" element={<Create />}></Route>
        </Routes>
      </main>
      <Footer />
    </section>
  );
}

export default App;
