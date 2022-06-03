import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const UserSmByline = (id) => {
  const { data: user, error, isLoading } = useFatch(`/users/${id.id}`);
  const currentUser = localStorage.getItem("user");

  /**
   * This function will follow other user if currentUser click on follow btn.
   * If follow operation is succsessfull, it will call following function
   * @param {string} user._id       User id of the user we will follow
   * @param {string} currentUser    CurrentUser ID from localStorage
   */
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

  /**
   * This function will Unfollow other user if currentUser click on Unfollow btn.
   * If Unfollow operation is succsessfull, it will call Unfollowing function
   * @param {string} user._id       User id of the user we will follow
   * @param {string} currentUser    CurrentUser ID from localStorage
   */
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

  /**
   * This function will add the user who currentUser will follow to following list.
   * If follow operation is succsessfull, it will add user_.id to following list
   * @param {string} user._id       User id of the user we will follow
   * @param {string} currentUser    CurrentUser ID from localStorage
   */
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

  /**
   * This function remove other user if currentUser click on unfollow btn.
   * @param {string} user._id       User id of the user we will follow
   * @param {string} currentUser    CurrentUser ID from localStorage
   */
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

  /**
   * This function will define follow & unfollow btn.
   * @param {array} array      array of user who currentUser follow
   * @param {string} currentUser    CurrentUser ID from localStorage
   */
  function defineBTN(array, currentUser) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].followersId === currentUser) {
        return "yes";
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
