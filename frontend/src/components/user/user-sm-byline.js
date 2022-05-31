import { useParams, Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const UserSmByline = (id) => {
  const { data: user, error, isLoading } = useFatch(`/users/${id.id}`);

  return (
    <>
      <div className="user-sm-byline-preview">
        {error && <p>{error}</p>}
        {isLoading && <p>{isLoading}</p>}
        {user && (
          <Link to={`/users/${user._id}`}>
            <img
              src={"http://localhost:3000/" + user.avatar}
              alt=""
              className="user-img-sm"
            />
            <span>{user.firstname + " " + user.lastname}</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default UserSmByline;
