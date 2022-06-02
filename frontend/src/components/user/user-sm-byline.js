import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const UserSmByline = (id) => {
  const { data: user, error, isLoading } = useFatch(`/users/${id.id}`);
  const currentUser = localStorage.getItem("user");
  async function follow() {
    const followersId = currentUser;
    const followingId = await user._id;
    const body = JSON.stringify({
      followersId,
    });
    const res = await fetch(`/follow/${followingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      redirect: "follow",
    });
    const data = await res.json();
    following();
  }

  async function unfollow() {
    const followersId = currentUser;
    const followingId = await user._id;
    const body = JSON.stringify({
      followersId,
    });
    const res = await fetch(`/follow/${followingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      redirect: "follow",
    });
    const data = await res.json();
    unfollowing();
  }

  async function following() {
    const followersId = currentUser;
    const followingId = await user._id;
    const body = JSON.stringify({
      followersId,
      followingId,
    });
    const res = await fetch(`/following/${followersId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      redirect: "follow",
    });
    const data = await res.json();
  }

  async function unfollowing() {
    const followersId = currentUser;
    const followingId = await user._id;
    const body = JSON.stringify({
      followersId,
      followingId,
    });
    const res = await fetch(`/following/${followersId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      redirect: "follow",
    });
    const data = await res.json();
  }
  function defineBTN(array, currentUser) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].followersId === currentUser) {
        return true;
      } else {
        return false;
      }
    }
  }
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {user && (
        <div className="user-sm-byline-preview">
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
            <Link to={`/users/${user._id}`}>
              <h2 className="user-name">
                {user.firstname} {user.lastname}
              </h2>
            </Link>
            {user.biography && (
              <p className="user-card-bio">{user.biography}</p>
            )}
            {!user.biography && (
              <p className="user-card-bio">
                orem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type.
              </p>
            )}
            <div className="btns">
              <>
                {defineBTN(user.followers, currentUser) && (
                  <button onClick={() => unfollow()}>Unfollow</button>
                )}
                {!defineBTN(user.followers, currentUser) && (
                  <button onClick={() => follow()}>Follow</button>
                )}
                {/* <button onClick={() => following()}>Contact</button> */}
              </>
              <Link to={`/users/${user._id}`}>
                <button>View Profile</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSmByline;
