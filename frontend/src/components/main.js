import Search from "./search";
import Posts from "./post/posts";
import Profile from "./user/userProfile";
import { useState, useRef } from "react";
import useFatch from "./customHooks/useFetch";

const Main = () => {
  /**
   * using useRef hook to access getPost function from posts
   * in order to getPosts after user create new post
   */
  const getPostsRef = useRef();

  const [body, setBody] = useState(null);
  const authorId = localStorage.getItem("user");

  /* using useFetch custom hook in order to fetching current user data */
  const { data: userData, error, isLoading } = useFatch(`/users/${authorId}`);

  /**
   * This function will take input value and create post of it.
   * @param {string} authoId  id of user who the create post
   * @param {string} body     the content of post
   * @param {arry}   like     a empty array for like
   */
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

  return (
    <>
      <aside>
        {error && <h3>{error}</h3>}
        {isLoading && <h3>{isLoading}</h3>}
        {userData && (
          <div className="profile-box">
            <Profile data={userData} />
          </div>
        )}
        <div className="users-box">
          <Search />
        </div>
      </aside>
      <main>
        {error && <h3>{error}</h3>}
        {isLoading && <h3>{isLoading}</h3>}
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
      </main>
    </>
  );
};

export default Main;
