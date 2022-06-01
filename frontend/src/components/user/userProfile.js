import { useEffect, useState } from "react";
import useFatch from "../customHooks/useFetch";
const Profile = (data) => {
  /*  */

  const user = data.data;
  const [edit, setEdit] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const currentUser = localStorage.getItem("user");
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [biography, setBiography] = useState(user.biography);
  const { data: posts } = useFatch(`/posts/user/${user._id}`);

  /*  */
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
    setTimeout(() => {
      following();
    }, 500);
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
    if (user._id === currentUser) {
      setSidebar(true);
    }
  });
  return (
    <>
      {!user && <div className="user-card-preview">error</div>}
      {user && (
        <div className="user-card-preview">
          <div className="user-card-header">
            {uploading && "some animation"}
            {!uploading && (
              <img
                src={"http://localhost:3000/" + user.avatar}
                alt={user.firstname + user.lastname + "avatar"}
                className="user-img"
              />
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
                    {user.firstname} {user.lastname}
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
                  <span>{posts && posts.length}</span>
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
                  <button onClick={() => follow()}>Follow</button>
                  <button onClick={() => following()}>Contact</button>
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
