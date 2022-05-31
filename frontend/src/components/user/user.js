import Posts from "../post/posts";
import Profile from "./userProfile";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";

const User = () => {
  const { id } = useParams();
  const { data: userData, error, isLoading } = useFatch(`/users/${id}`);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      <aside>{userData && <Profile data={userData} />}</aside>
      <main>
        <Posts />
      </main>
    </>
  );
};

export default User;
