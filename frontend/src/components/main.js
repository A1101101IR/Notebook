import { useRef } from "react";
import Posts from "./post/posts";
import Profile from "./user/userProfile";
import { useState, useEffect } from "react";
import useFatch from "./customHooks/useFetch";
import Users from "./user/users";
import UserMediumByline from "./user/user-m-byline";
import Search from "./search";
const Main = () => {
  const getPostsRef = useRef();
  const [body, setBody] = useState(null);
  const authorId = localStorage.getItem("user");
  const { data: userData, error, isLoading } = useFatch(`/users/${authorId}`);

  /*  */
  async function createPost(event) {
    event.preventDefault();
    if (body === null || body === "") {
      console.log(body);
    } else {
      console.log(body);
      const response = await fetch("/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorId,
          body,
          likes: [],
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        getPostsRef.current.reload();
        setBody("");
      } else {
        console.log(data);
      }
    }
  }

  /*  */
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 350);
  }, []);
  return (
    <>
      {loading && (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      )}
      <aside>
        {userData && (
          <div className="profile-box">
            <Profile data={userData} />
          </div>
        )}
        <div className="users-box">
          <UserMediumByline /> {/* <Search /> */}
        </div>
      </aside>
      <main>
        <form className="post-form" onSubmit={createPost}>
          <textarea
            type="text"
            onChange={(e) => setBody(e.target.value)}
            placeholder={
              userData && "Hej " + userData.firstname + "! Vad händer? "
            }
          />
          {body ? (
            <button>Publish</button>
          ) : (
            <button style={{ cursor: "not-allowed" }}>Publish</button>
          )}
        </form>
        <Posts ref={getPostsRef} />
        {/* <Users /> */}
      </main>
    </>
  );
};

export default Main;
