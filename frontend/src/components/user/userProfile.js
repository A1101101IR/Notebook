import { useEffect, useState } from "react";

const Profile = (data) => {
  const user = data.data;
  console.log(user);
  const currentUser = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);
  async function follow() {
    console.log("res.status");
    const followersId = currentUser;
    const followingId = await user._id;
    const res = await fetch("/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followersId,
        followingId,
      }),
      redirect: "follow",
    });
    console.log(res.status);
  }
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
            <img src="./img/portrait.jpg" alt="" className="user-img" />
          </div>
          <div className="user-card-body">
            <div className="user-card-info">
              <h2 className="user-name">
                {user.firstname} {user.lastname}
              </h2>
              <p className="user-card-bio">{user.biography}</p>
            </div>
            {console.log(user.educations)}
            {user.educations &&
              user.educations.map((item) => (
                <div className="educations">
                  <h4>{item.school}</h4>
                  <h4>{item.education}</h4>
                </div>
              ))}
            <div className="user-card-btns">
              <div>
                <span>Posts {user.followers && user.followers.length}</span>
                <span>Followers {user.followers && user.followers.length}</span>
                <span>Following {user.followers && user.followers.length}</span>
              </div>
              <div>
                <button onClick={() => follow()}>Follow</button>
                <button>Contact</button>
                <button>Share</button>
              </div>
            </div>
          </div>
          {/* {sidebar && <div>this is user sidebar</div>} */}
        </div>
      )}
    </>
  );
};

export default Profile;
