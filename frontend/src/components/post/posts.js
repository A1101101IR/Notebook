import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSmByline from "../user/user-sm-byline";
const Posts = (user) => {
  const [posts, setPosts] = useState();
  async function getPosts() {
    const res = await fetch(`/userposts/${user.id}`);
    const data = await res.json();
    setPosts(data);
  }

  async function deletePost(id) {
    const res = await fetch(`/posts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.status === 200) {
      getPosts();
    }
  }

  const authorId = localStorage.getItem("user");
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
  };

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
                  <span
                    onClick={() => {
                      deletePost(post._id);
                    }}
                    className="delete-btn"
                  ></span>
                </div>
              </div>
              <Link to={`/posts/${post._id}`} className="post-card-body">
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
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Comment"
                  />
                </div>
              </div>
            </div>
          ))}
    </>
  );
};
export default Posts;
