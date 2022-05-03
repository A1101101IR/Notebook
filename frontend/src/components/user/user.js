import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Posts from "../post/posts";
import Profile from "./userProfile";
const User = () => {
  const { id } = useParams();
  /* const { data: user, error, isLoading } = useFatch(`/users/${id}`); */
  const { data: userData, error, isLoading } = useFatch(`/users/${id}`);
  const { data: postsData } = useFatch(`/userposts/${id}`);
  const currentUserId = localStorage.getItem("user");

  /* console.log(posts); */
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      <aside>{userData && <Profile data={userData} />}</aside>
      <main>{postsData && <Posts data={postsData} />}</main>
    </>
  );
};

export default User;
