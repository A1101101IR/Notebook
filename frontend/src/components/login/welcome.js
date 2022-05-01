import Login from "./login";
import SignIn from "./signin";

const Welcome = () => {
  return (
    <div className="welcome">
      <Login />
      <SignIn />
    </div>
  );
};

export default Welcome;
