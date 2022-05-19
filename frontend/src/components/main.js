import { useState, useEffect } from "react";
import useFatch from "./customHooks/useFetch";
import Profile from "./user/userProfile";
import { forwardRef, useRef, useImperativeHandle } from "react";
import { Link, useParams } from "react-router-dom";
import UserSmByline from "./user/user-sm-byline";
import Posts from "./post/posts";
const Main = () => {
  const authorId = localStorage.getItem("user");
  /* const currentUserId = localStorage.getItem("user"); */
  const [currentUserOptions, setCurrentUserOptions] = useState();

  /* UserData for profile componenet */
  const { data: userData, error, isLoading } = useFatch(`/users/${authorId}`);

  /*  */
  const [body, setBody] = useState();
  const getPostsRef = useRef();
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
    getPostsRef.current.reload();
    /* getPosts(); */
  }

  /*  */
  const [posts, setPosts] = useState();

  async function getPosts() {
    const res = await fetch("/posts");
    const data = await res.json();
    setPosts(data);
  }

  /*  */
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

  /* When user click on comment input other comments will display */
  const [myStyle, SetMyStyle] = useState();
  const showComments = (id) => {
    SetMyStyle({ display: "block" });
  };

  /* Like function */
  const [likeStatus, setLikeStatus] = useState(false);
  async function addLike(id, currentLikes) {
    if (!likeStatus) {
      const res = await fetch(`like/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          like: currentLikes + 1,
        }),
        redirect: "follow",
      });
      const data = await res.json();
      console.log(res.status);
      setLikeStatus(true);
      getPosts();
    }
    if (likeStatus) {
      const res = await fetch(`like/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          like: currentLikes - 1,
        }),
        redirect: "follow",
      });
      const data = await res.json();
      console.log(res.status);
      setLikeStatus(false);
      getPosts();
    }
  }

  /* This function will check if there is any like */
  /* If there is likes, it will display if else nothing! */
  function likes(like) {
    if (like === 0 || null) {
      return "";
    } else {
      return like;
    }
  }

  const [loading, setLoading] = useState(true);
  const x = localStorage.getItem("user");
  useEffect(() => {
    getPosts();
    setTimeout(() => {
      setLoading(false);
    }, 350);
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
        {loading && (
          <div className="loading">
            <h3>Loading...</h3>
          </div>
        )}
        <Posts ref={getPostsRef} />
        {/* {posts &&
          posts
            .slice(0)
            .reverse()
            .map((post) => (
              <div className="post-card-preview" key={post._id}>
                <div className="post-card-header">
                  <div className="post-author-info">
                    <UserSmByline id={post.authorId} />
                  </div>
                  <div className="post-options-nav">
                    {authorId === post.authorId && (
                      <span
                        onClick={() => {
                          deletePost(post._id);
                        }}
                        className="delete-btn"
                      ></span>
                    )}
                  </div>
                </div>
                <Link to={`/posts/${post._id}`} className="post-card-body">
                  <p>{post.body}</p>
                </Link>
                <div className="post-card-footer">
                  <button
                    onClick={() => {
                      addLike(post._id, post.likes);
                    }}
                    value={post.likes}
                  >
                    {likes(post.likes)} Like
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
                        <div style={myStyle} className={`comment @{post._id}`}>
                          <UserSmByline id={comment.authorId} />
                          <p>{comment.body}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))} */}
      </main>
    </>
  );
};

export default Main;
