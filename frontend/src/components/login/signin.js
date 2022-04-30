import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function register(event) {
    event.preventDefault();
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstname,
        lastname,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      /* history.push("/login"); */
      console.log("yes");
    }
  }
  return (
    <>
      <form onSubmit={register}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="firstname"
        />
        <input
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          placeholder="lastname"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">SignIn</button>
      </form>
    </>
  );
};

export default SignIn;
