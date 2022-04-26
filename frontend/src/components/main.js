import { useState, useEffect } from "react";
const Main = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
    console.log(data && data[0].title);
  }, []);
  return (
    <div>
      <h1 className="hello">{!data ? "loading..." : data[0].title}</h1>
    </div>
  );
};

export default Main;
