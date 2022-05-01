import { useState, useEffect } from "react";

import Create from "./create";
import Welcome from "./login/welcome";
import Posts from "./post/posts";
import Users from "./user/users";
const Main = () => {
  /* const [data, setData] = useState();
  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
    console.log(data && data[0].title);
  }, []); */
  return (
    <main>
      {/* <h1 className="hello">{!data ? "loading..." : data[0].title}</h1> */}
      {/* <Users /> */}
      <Create />
      <Posts />
      {/* <Welcome /> */}
    </main>
  );
};

export default Main;
