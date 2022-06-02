import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const Profile = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const currentUser = localStorage.getItem("user");
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [biography, setBiography] = useState();
  const { data: posts } = useFatch(`/posts/user/${id}`);
  const { data: userPosts } = useFatch(`/posts/user/${currentUser}`);

  async function getUser(id) {
    if (id) {
      const res = await fetch(`/users/${id}`);
      const data = await res.json();
      setUser(data);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setBiography(data.biography);
    } else {
      const res = await fetch(`/users/${currentUser}`);
      const data = await res.json();
      setUser(data);
    }
  }

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
    getUser(id);
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
    getUser(id);
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

  /*  */
  async function editUser(event) {
    event.preventDefault();
    const res = await fetch(`/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        biography,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      setEdit(false);
      getUser(id);
    }
  }

  /* const [editAvatar, setEditAvatar] = useState(false); */
  const [uploading, setUploading] = useState();
  /* const [avatar, setAvatar] = useState(); */
  const addAvatar = async (e) => {
    const file = e.target.files;
    const formdata = new FormData();
    formdata.append("file", file[0]);
    setUploading(true);
    const res = await fetch(`/users/${user._id}`, {
      method: "POST",
      body: formdata,
      redirect: "follow",
    });
    const data = await res.json();
    setTimeout(() => {
      setUploading(false);
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (!id) {
      setSidebar(true);
    }
    if (id === currentUser) {
      setSidebar(true);
    }

    getUser(id);
  }, []);
  return (
    <>
      {!user && <div className="isLoading">Loading...</div>}
      {user && (
        <div className="user-card-preview">
          <div className="user-card-header">
            {uploading && "some animation"}
            {!uploading && (
              <>
                {user.avatar && (
                  <img
                    src={"http://localhost:3000/" + user.avatar}
                    alt={user.firstname + user.lastname + "avatar"}
                    className="user-img"
                  />
                )}
                {!user.avatar && <div className="user-img"></div>}
              </>
            )}
            {edit && (
              <label htmlFor="add-avatar" className="avatar-input">
                <input
                  type="file"
                  name="file"
                  id="add-avatar"
                  onChange={addAvatar}
                />
                Change Avatar
              </label>
            )}
          </div>
          <div className="user-card-body">
            <div className="user-card-info">
              {!edit && (
                <>
                  <h2 className="user-name">
                    {user && user.firstname} {user && user.lastname}
                  </h2>
                  <p className="user-card-bio">
                    {user.biography && user.biography.slice(0, 140)}
                  </p>
                </>
              )}
              {edit && (
                <>
                  <form onSubmit={editUser}>
                    <input
                      type="text"
                      placeholder="Firstname"
                      defaultValue={user.firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Lastname"
                      defaultValue={user.lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <textarea
                      placeholder="Biography"
                      defaultValue={user.biography}
                      onChange={(e) => setBiography(e.target.value)}
                    ></textarea>
                    {edit && <button>Save</button>}
                  </form>
                </>
              )}
            </div>
            <div className="user-card-btns">
              <div className="info-box">
                <div className="info">
                  <span>Posts</span>

                  {id ? (
                    <>{posts && <span>{posts.length}</span>}</>
                  ) : (
                    <>
                      {userPosts && (
                        <span>
                          {userPosts.length !== 0 && userPosts.length}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="info">
                  <span>Followers</span>
                  <span>{user.followers && user.followers.length}</span>
                </div>
                <div className="info">
                  <span>Following</span>
                  <span>{user.following && user.following.length}</span>
                </div>
              </div>
            </div>
            <div className="btn-box">
              {sidebar && (
                <>
                  {!edit && (
                    <button onClick={(e) => setEdit(true)}>Edit Profile</button>
                  )}
                </>
              )}
              {!sidebar && (
                <>
                  {defineBTN(user.followers, currentUser) && (
                    <button onClick={() => unfollow()}>Unfollow</button>
                  )}
                  {!defineBTN(user.followers, currentUser) && (
                    <button onClick={() => follow()}>Follow</button>
                  )}
                  {/* <button onClick={() => following()}>Contact</button> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
