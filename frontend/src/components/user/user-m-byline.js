import useFatch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
const UserMediumByline = () => {
  const { data: users, error, isLoading } = useFatch("/users");
  /* you need this one to show userlist when follow func i ready */
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {users &&
        users.map((user) => (
          <Link
            to={`/users/${user._id}`}
            className="user-card-preview-medium"
            key={user._id}
          >
            <img src={user.avatar} alt="" className="user-img" />
            <div className="user-card-body">
              {/* <div className="user-card-header">
                <img src="#" alt="" className="user-img" />
              </div> */}
              <h2 className="user-name">
                {user.firstname} {user.lastname}
              </h2>
              <p className="user-card-bio">
                Ut mauris odio, tristique sit amet ante vitae, faucibus
                imperdiet leo.
              </p>
              <div className="btns">
                <button>Follow</button>
                <button>Contact</button>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default UserMediumByline;
