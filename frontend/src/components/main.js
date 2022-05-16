import { useState, useEffect } from "react";
import useFatch from "./customHooks/useFetch";
import Welcome from "./login/welcome";
import Posts from "./post/posts";
import Profile from "./user/userProfile";
import Users from "./user/users";
import { Link } from "react-router-dom";
import UserSmByline from "./user/user-sm-byline";
const Main = () => {
  const authorId = localStorage.getItem("user");
  const [posts, setPosts] = useState();
  async function getPosts() {
    const res = await fetch("/posts");
    const data = await res.json();
    setPosts(data);
  }
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
        likes: 0,
      }),
    });
    const data = await response.json();
    getPosts();
  }

  const currentUserId = localStorage.getItem("user");
  const {
    data: userData,
    error,
    isLoading,
  } = useFatch(`/users/${currentUserId}`);

  async function deletePost(id) {
    const res = await fetch(`/posts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.status === 200) {
      getPosts();
    }
  }

  const [comment, setComment] = useState();
  /* const authorId = localStorage.getItem("user"); */
  async function addComment(id) {
    console.log(comment);
    const res = await fetch(`/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId,
        comment,
      }),
    });
    const data = res.json();
    getPosts();
  }

  const [myStyle, SetMyStyle] = useState();
  const showComments = (id) => {
    console.log("ys");
    SetMyStyle({ display: "block" });
  };

  const [likeStatus, setLikeStatus] = useState(false);
  const addLike = (currentLikes) => {
    if (!likeStatus) {
      console.log(currentLikes + 1);
      setLikeStatus(true);
    }
    if (likeStatus) {
      console.log(currentLikes - 0);
      setLikeStatus(false);
    }
    getPosts();
  };

  function handleLike(e, id) {
    e.preventDefault();
    console.log(id);
  }

  useEffect(() => {
    getPosts();
  }, []);
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
        {posts &&
          posts
            .slice(0)
            .reverse()
            .map((post) => (
              <div
                className="post-card-preview"
                key={post._id}
                onClick={() => {
                  handleLike(post._id);
                }}
              >
                <div className="post-card-header">
                  <div className="post-author-info">
                    <UserSmByline id={post.authorId} />
                  </div>
                  <div className="post-options-nav">
                    <span
                      onClick={() => {
                        deletePost(post._id);
                      }}
                      className="delete-btn"
                    ></span>
                  </div>
                </div>
                <Link to={`/posts/${post._id}`} className="post-card-body">
                  {/* <h2>{post.title}</h2> */}
                  <p>{post.body}</p>
                </Link>
                <div className="post-card-footer">
                  <button
                    id={post._id}
                    onClick={() => {
                      addLike(post.likes);
                    }}
                  >
                    {post.likes} Like
                  </button>
                  <div className="comment-box">
                    <input
                      onKeyPress={(e) =>
                        e.key === "Enter" && addComment(post._id)
                      }
                      onClick={() => showComments()}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Comment"
                    />
                    {post.comments &&
                      post.comments.map((comment) => (
                        <div
                          style={myStyle}
                          className={`comment @{post._id}`}
                          key={comment.authorId}
                        >
                          {comment.body}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
      </main>
    </>
  );
};

export default Main;
