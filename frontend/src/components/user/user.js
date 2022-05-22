import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Posts from "../post/posts";
import Profile from "./userProfile";
import UserSetting from "./userSetting";
const User = () => {
  const { id } = useParams();
  const { data: userData, error, isLoading } = useFatch(`/users/${id}`);
  const edit = true;
  const editnow = edit ? <UserSetting data={userData} /> : <Posts />;
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      <aside>{userData && <Profile data={userData} />}</aside>
      <main>
        <Posts />
        {/* {editnow} */}
      </main>
    </>
  );
};

export default User;
