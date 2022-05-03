import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Posts from "../post/posts";
import UserPosts from "../post/userPosts";
import Profile from "./userProfile";
import Users from "./users";
const User = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useFatch(`/users/${id}`);
  const currentUserId = localStorage.getItem("user");
  const { data: userData } = useFatch(`/users/${id}`);
  /* console.log(posts); */
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {/* <Users /> */}
      {/* {user && <h4>{user.firstname + " " + user.lastname}</h4>} */}
      <aside>{userData && <Profile data={userData} />}</aside>
      <main>
        <UserPosts id={id} />
      </main>
    </>
  );
};

export default User;
