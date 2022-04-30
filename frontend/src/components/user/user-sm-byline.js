import { useParams, Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const UserSmByline = (id) => {
  /* const { id } = useParams(); */

  const { data: user, error, isLoading } = useFatch(`/users/${id.id}`);
  console.log(user);
  return (
    <>
      <div className="user-sm-byline-preview">
        {error && <p>{error}</p>}
        {isLoading && <p>{isLoading}</p>}
        <Link to={`/users/${user._id}`}>
          {user && user.firstname + " " + user.lastname}
        </Link>
      </div>
    </>
  );
};

export default UserSmByline;
