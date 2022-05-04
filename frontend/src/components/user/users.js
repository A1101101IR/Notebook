import useFatch from "../customHooks/useFetch";
import { Link, useParams } from "react-router-dom";
const Users = () => {
  const { data: users, error, isLoading } = useFatch("/users");
  const id = useParams();
  /* you need this one to show userlist when follow func i ready */
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {users &&
        users.map((user) => (
          <Link
            to={`/users/${user._id}`}
            className="user-card-preview"
            key={user._id}
          >
            <div className="user-card-header">
              <img src="#" alt="" className="user-img" />
            </div>
            <div className="user-card-body">
              <div className="user-card-info">
                <h2 className="user-name">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="user-card-bio">
                  Ut mauris odio, tristique sit amet ante vitae, faucibus
                  imperdiet leo.
                </p>
              </div>
              <div className="user-card-btns">
                <button>Follow</button>
                <button>Contact</button>
                <button>Status</button>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default Users;
