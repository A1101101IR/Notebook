import { useState } from "react";
const Welcome = () => {
  const [output, setOutput] = useState(false);
  const [message, setMessage] = useState("hello");
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
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
    console.log(data.currentUser);
    if (data.currentUser) {
      if (password === data.currentUser.password) {
        setMessage("Success!");
        setTimeout(() => {
          localStorage.setItem("user", data.currentUser._id);
          window.location.reload(false);
        }, 500);
      } else {
        setMessage("incorrect password!");
      }
    } else {
      setMessage("can't find account!");
    }
  }

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
  const displayLogIn = () => {
    setOutput(true);
  };
  const displaySignIn = () => {
    setOutput(false);
  };
  return (
    <div className="welcome">
      {output && (
        <form onSubmit={login}>
          <p className="login-message">{message}</p>
          <input
            type="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <input
            type="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <button>Login</button>
          <span>Or</span>
          <button
            onClick={() => {
              displaySignIn();
            }}
          >
            SignIn
          </button>
        </form>
      )}
      {!output && (
        <form onSubmit={register}>
          <p className="login-message">{message}</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <input
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Firstname"
            required
          />
          <input
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Lastname"
            required
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">SignIn</button>
          <span>Or</span>
          <button
            onClick={() => {
              displayLogIn();
            }}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Welcome;
