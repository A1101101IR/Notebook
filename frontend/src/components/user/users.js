import useFatch from "../customHooks/useFetch";
import { Link, useParams } from "react-router-dom";
import Profile from "./userProfile";
import UserSmByline from "./user-sm-byline";
const Users = () => {
  const { data: users, error, isLoading } = useFatch("/users");
  const id = useParams();
  /* you need this one to show userlist when follow func i ready */
  return (
    <>
      <aside>
        <Profile />
      </aside>
      <main>
        <div className="user-explore">
          {error && <p>{error}</p>}
          {isLoading && <p>{isLoading}</p>}
          {users && users.map((user) => <UserSmByline id={user._id} />)}
        </div>
      </main>
    </>
  );
};

export default Users;
