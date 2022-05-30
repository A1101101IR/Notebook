import useFatch from "../customHooks/useFetch";

import UserSmByline from "../user/user-sm-byline";
import Profile from "../user/userProfile";

import { Link, useParams, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
const Post = () => {
  const currentUserId = localStorage.getItem("user");
  const { data: userData } = useFatch(`/users/${currentUserId}`);
  const { id } = useParams();
  const { data: post, error, isLoading } = useFatch(`/posts/${id}`);
  const navigate = useNavigate();
  /* useImperativeHandle(ref, () => ({
    reload() {
      getPosts();
    },
  })); */
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
      navigate("/");
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
    setComment("");
    getPosts();
  }

  /*  */
  const [myStyle, SetMyStyle] = useState();
  const showComments = (id) => {
    SetMyStyle({ display: "block" });
  };

  /*  */
  async function addLike(id, currentLikes) {
    console.log(`like/${id}`);

    const res = await fetch(`http://localhost:3000/like/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        like: currentUser,
      }),
      redirect: "follow",
    });
    const data = await res.json();
    if (data.modifiedCount === 1) {
      getPosts();
    } else {
      const res = await fetch(`http://localhost:3000/like/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          like: currentUser,
        }),
        redirect: "follow",
      });
      const data = await res.json();
      data.modifiedCount === 1 ? getPosts() : console.log("ERROR!");
    }
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {userData && <Profile data={userData} />}
      <main>
        {isLoading && <p>{isLoading}</p>}
        {post && (
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

            <div className="post-card-body">
              <p>{post.body}</p>
            </div>

            <div className="post-card-footer">
              <button
                onClick={() => {
                  addLike(post._id, post.likes);
                }}
              >
                {post.likes.length} like
              </button>

              <div className="comment-box">
                <input
                  onKeyPress={(e) => e.key === "Enter" && addComment(post._id)}
                  onClick={() => showComments()}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  placeholder="Comment"
                />
                {post.comment &&
                  post.comments.map((comment) => (
                    <div style={myStyle} className={`comment @{post._id}`}>
                      <UserSmByline id={comment.authorId} />
                      <p>{comment.body}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
      </main>
    </>
  );
};
export default Post;
