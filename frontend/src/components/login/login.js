import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function login(event) {
    event.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    localStorage.setItem("token", JSON.stringify(data));
    if (localStorage.getItem("token")) {
      window.location.reload(false);
    }
  }
  return (
    <>
      <form onSubmit={login}>
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
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
