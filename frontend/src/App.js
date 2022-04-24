import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return <h1 className="hello">{!data ? "loading..." : data}</h1>;
}

export default App;
