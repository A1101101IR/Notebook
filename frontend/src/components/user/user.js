import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Posts from "../post/posts";
import UserPosts from "../post/userPosts";
const User = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useFatch(`/users/${id}`);

  /* console.log(posts); */
  return (
    <main>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {/* {user && <h4>{user.firstname + " " + user.lastname}</h4>} */}
      <UserPosts id={id} />
    </main>
  );
};

export default User;
