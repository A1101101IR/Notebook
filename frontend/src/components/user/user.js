import Posts from "../post/posts";
import Profile from "./userProfile";

const User = () => {
  return (
    <>
      <aside>
        <Profile />
      </aside>
      <main>
        <Posts />
      </main>
    </>
  );
};

export default User;
