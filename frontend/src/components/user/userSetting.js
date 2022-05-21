import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";

const UserSetting = (data) => {
  const { id } = useParams();

  const { data: userInfo, error, isLoading } = useFatch(`/users/${id}`);
  const [username, setUsername] = useState(/* userInfo.username */);
  const [firstname, setFirstname] = useState(/* userInfo.firstname */);
  const [lastname, setLastname] = useState(/* userInfo.lastname */);
  const [biography, setBiography] = useState(/* userInfo.biography */);
  const [email, setEmail] = useState(/* userInfo.email */);
  const [password, setPassword] = useState(/* userInfo.password */);
  const [school, setSchool] = useState();
  const [education, setEducation] = useState();
  async function editUser(event) {
    event.preventDefault();

    /* const res = await fetch(`/edituser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstname,
        lastname,
        biography,
        email,
        password,
      }),
    });
    const data = await res.json(); */
    /* console.log(res.status); */
    console.log(event.target.id);
  }
  useEffect(() => {}, []);
  return (
    <div className="user-setting-body">
      {userInfo && (
        <>
          <form onSubmit={editUser} id="1">
            <input
              type="text"
              placeholder="Username"
              defaultValue={userInfo.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Firstname"
              defaultValue={userInfo.firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Lastname"
              defaultValue={userInfo.lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <textarea
              placeholder="Biography"
              onChange={(e) => setBiography(e.target.value)}
            ></textarea>

            <input type="submit" id="one" value="Save" />
          </form>
          <form onSubmit={editUser} id="2">
            <input
              type="email"
              placeholder="Email"
              defaultValue={userInfo.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Password" />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Save" />
          </form>
          <form onSubmit={editUser} id="3">
            <input
              type="text"
              placeholder="School"
              onChange={(e) => setSchool(e.target.value)}
            />
            <input
              type="text"
              placeholder="Education"
              onChange={(e) => setEducation(e.target.value)}
            />
            <input type="submit" value="Save" />
          </form>
        </>
      )}
    </div>
  );
};

export default UserSetting;
