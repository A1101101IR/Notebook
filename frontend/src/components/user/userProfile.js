import { useEffect, useState } from "react";

const Profile = (data) => {
  const user = data.data;
  const currentUser = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);
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
                <button>Follow</button>
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
