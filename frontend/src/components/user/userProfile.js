const Profile = (data) => {
  const user = data.data;
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
              <p className="user-card-bio">user bio</p>
            </div>
            <div className="user-card-btns">
              <button>Follow</button>
              <button>Contact</button>
              <button>Status</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
