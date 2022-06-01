import useFatch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
const UserMediumByline = (data) => {
  const user = data.users.data;

  /* const { data: users, error, isLoading } = useFatch("/users"); */
  /* you need this one to show userlist when follow func i ready */
  return (
    <>
      {user && (
        <Link
          to={`/users/${user._id}`}
          className="user-card-preview-medium"
          key={user._id}
        >
          <img src={user.avatar} alt="" className="user-img" />
          <div className="user-card-body">
            <span>{console.log(user)}</span>
            <h2 className="user-name">
              {user.firstname} {user.lastname}
            </h2>
            <p className="user-card-bio">
              Ut mauris odio, tristique sit amet ante vitae, faucibus imperdiet
              leo.
            </p>
            <div className="btns">
              <button>Follow</button>
              <button>Contact</button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserMediumByline;
