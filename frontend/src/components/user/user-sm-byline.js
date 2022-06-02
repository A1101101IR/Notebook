import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const UserSmByline = (id) => {
  const { data: user, error, isLoading } = useFatch(`/users/${id.id}`);
  return (
    <>
      <div className="user-sm-byline-preview">
        {error && <p>{error}</p>}
        {isLoading && <p>{isLoading}</p>}
        {user && (
          <Link to={`/users/${user._id}`} className="user-sm-byline-preview">
            <>
              {user.avatar && (
                <img
                  src={"http://localhost:3000/" + user.avatar}
                  alt={user.firstname + user.lastname + "avatar"}
                  className="user-img-sm"
                />
              )}
              {!user.avatar && <div className="user-img-sm"></div>}
            </>
            <span>{user.firstname + " " + user.lastname}</span>
            <div className="user-card-body">
              <h2 className="user-name">
                {user.firstname} {user.lastname}
              </h2>
              {user.biography && (
                <p className="user-card-bio">{user.biography}</p>
              )}
              <div className="btns">
                <button>Follow</button>
                <button>Contact</button>
              </div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default UserSmByline;
