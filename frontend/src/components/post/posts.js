import UserSmByline from "../user/user-sm-byline";
import { Link, useParams } from "react-router-dom";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Posts = forwardRef((props, ref) => {
  const id = useParams();
  useImperativeHandle(ref, () => ({
    reload() {
      getPosts();
    },
  }));
  const currentUser = localStorage.getItem("user");

  /*  */
  const [body, setBody] = useState();
  async function createPost(event) {
    event.preventDefault();
    const response = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser,
        body,
        likes: 0,
      }),
    });
    const data = await response.json();
    getPosts();
  }

  /*  */
  const [posts, setPosts] = useState();
  async function getPosts() {
    if (id.id == null || undefined) {
      const res = await fetch("/posts");
      const data = await res.json();
      setPosts(data);
    } else {
      const res = await fetch(`/userposts/${id.id}`);
      const data = await res.json();
      setPosts(data);
    }
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

  /*  */
  const [comment, setComment] = useState();
  async function addComment(id) {
    const res = await fetch(`/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: currentUser,
        comment,
      }),
    });
    const data = res.json();
    getPosts();
  }

  /*  */
  const [myStyle, SetMyStyle] = useState();
  const showComments = (id) => {
    SetMyStyle({ display: "block" });
  };

  /*  */
  const [likeStatus, setLikeStatus] = useState(false);
  async function addLike(id, currentLikes) {
    console.log(`like/${id}`);
    if (!likeStatus) {
      const res = await fetch(`http://localhost:3000/like/${id}`, {
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
      const res = await fetch(`http://localhost:3000/like/${id}`, {
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts &&
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
                  {currentUser === post.authorId && (
                    <span
                      onClick={() => {
                        deletePost(post._id);
                      }}
                      className="delete-btn"
                    ></span>
                  )}
                  {/* {!currentUser === post.authorId && <span>...</span>} */}
                </div>
              </div>
              <Link to={`/posts/${post._id}`} className="post-card-body">
                <p>{post.body}</p>
              </Link>
              <div className="post-card-footer">
                {/* <button
                  onClick={() => {
                    addLike(post._id, post.likes);
                  }}
                  value={post.likes}
                >
                  {likes(post.likes)} like
                </button> */}
                {console.log(post.likes)}
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
                        {/* {console.log(comment)} */}
                        <p>{comment.body}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
    </>
  );
});
export default Posts;
