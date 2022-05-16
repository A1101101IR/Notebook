import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSmByline from "../user/user-sm-byline";
const Posts = (postsData) => {
  /* const posts = postsData.data; */
  const [posts, setPosts] = useState(postsData.data);
  const handleDelete = (id) => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setPosts(postsData.data);
  };

  const [comment, setComment] = useState();
  const authorId = localStorage.getItem("user");
  const addComment = (id) => {
    console.log(comment);
    fetch(`/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId,
        comment,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const addLike = () => {
    console.log("New Like!");
  };
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
                      handleDelete(post._id);
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
                    addLike();
                  }}
                >
                  Like
                </button>
                {/* <button>Comment</button> */}
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
