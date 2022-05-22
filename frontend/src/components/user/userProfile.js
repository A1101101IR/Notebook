import { useEffect, useState } from "react";
import UserMediumByline from "./user-m-byline";

const Profile = (data) => {
  /*  */
  const user = data.data;
  const [edit, setEdit] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const currentUser = localStorage.getItem("user");
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [biography, setBiography] = useState(user.biography);

  /*  */
  async function follow() {
    const followersId = currentUser;
    const followingId = await user._id;
    const res = await fetch(`/follow/${followingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followersId,
        /* followingId, */
      }),
      redirect: "follow",
    });
    const data = await res.json();
    console.log(res.status);
    if (res.status === 201) {
    }
  }

  /*  */
  async function editUser(event) {
    event.preventDefault();
    const res = await fetch(`/edituser/${user._id}`, {
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

  /*  */
  useEffect(() => {
    if (user._id === currentUser) {
      setSidebar(true);
    }
  });
  return (
    <>
      {user && (
        <div className="user-card-preview">
          <div className="user-card-header">
            <img src="#" alt="" className="user-img" />
          </div>
          <div className="user-card-body">
            <div className="user-card-info">
              {!edit && (
                <>
                  <h2 className="user-name">
                    {user.firstname} {user.lastname}
                  </h2>
                  <p className="user-card-bio">{user.biography}</p>
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
            {/* {console.log(user.educations)}
            {user.educations &&
              user.educations.map((item) => (
                <div className="educations">
                  <h4>{item.school}</h4>
                  <h4>{item.education}</h4>
                </div>
              ))} */}
            <div className="user-card-btns">
              <div>
                <span>Posts {user.followers && user.followers.length}</span>
                <span>Followers {user.followers && user.followers.length}</span>
                <span>Following {user.followers && user.followers.length}</span>
              </div>
              <div>
                {sidebar && (
                  <>
                    {/* {edit && <button onClick={(e) => editUser()}>Save</button>} */}
                    {!edit && (
                      <button onClick={(e) => setEdit(true)}>
                        Edit Profile
                      </button>
                    )}
                  </>
                )}
                {!sidebar && (
                  <>
                    <button onClick={() => follow()}>Follow</button>
                    <button>Contact</button>
                    <button>Share</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
