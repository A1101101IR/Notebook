import { useState, useEffect } from "react";

import Create from "./create";
import useFatch from "./customHooks/useFetch";
import Welcome from "./login/welcome";
import Posts from "./post/posts";
import Profile from "./user/userProfile";
import Users from "./user/users";
const Main = () => {
  const authorId = localStorage.getItem("user");
  /* const currentUserData = currentUser.data; */
  const [body, setBody] = useState();
  async function createPost(event) {
    event.preventDefault();
    const response = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId,
        body,
      }),
    });
    const data = await response.json();
    /* window.location.reload(false); */
    console.log(data);
  }
  const currentUserId = localStorage.getItem("user");
  const { data: userData } = useFatch(`/users/${currentUserId}`);
  const { data: postsData, error, isLoading } = useFatch("/posts");
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      <aside>{userData && <Profile data={userData} />}</aside>
      <main>
        <form className="post-form" onSubmit={createPost}>
          <textarea
            type="text"
            onChange={(e) => setBody(e.target.value)}
            placeholder={
              userData && "Hej " + userData.firstname + "! Vad händer? "
            }
          />
          <button>Publish</button>
        </form>
        {postsData && <Posts data={postsData} />}
      </main>
    </>
  );
};

export default Main;
