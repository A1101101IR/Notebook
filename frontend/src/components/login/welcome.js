import { useState } from "react";
const Welcome = () => {
  const [output, setOutput] = useState(false);
  const [message, setMessage] = useState("Login please!");
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  /**
   * Login function
   * @param {*} event
   */
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
        setMessage("Incorrect password!");
      }
    } else {
      setMessage("Can't find account!");
    }
  }

  const displayLogIn = () => {
    setOutput(false);
    setMessage("Login please!");
  };
  const displaySignIn = () => {
    setOutput(true);
    setMessage("Create your account!");
  };

  /**
   * user register function
   * @param {*} event
   */
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
    if (data.status === "User exists") {
      setMessage(data.status);
      setTimeout(() => {
        displayLogIn();
      }, 500);
    } else if (data.status === "User created") {
      setMessage(data.status);
      setTimeout(() => {
        displayLogIn();
      }, 500);
    } else {
      setMessage(data.status);
    }
  }

  return (
    <div className="Welcome">
      {!output && (
        <div className="form-container">
          <div className="login-message">
            <p>{message}</p>
          </div>
          <form onSubmit={login}>
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
            <button>Login</button>
          </form>
          <div className="or-box">
            <span>or</span>
            <button
              onClick={() => {
                displaySignIn();
              }}
            >
              Create a account
            </button>
          </div>
        </div>
      )}
      {output && (
        <div className="form-container">
          <div className="login-message">
            <p>{message}</p>
          </div>
          <form onSubmit={register}>
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
            <button type="submit">Sign in</button>
          </form>
          <div className="or-box">
            <span>Have an Account Already?</span>
            <button
              onClick={() => {
                displayLogIn();
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
