import { Link } from "react-router-dom";
import UserSmByline from "../user/user-sm-byline";
const Posts = (postsData) => {
  const posts = postsData.data;
  const handleDelete = (id) => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  return (
    <>
      {posts &&
        posts.reverse().map((post) => (
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
              <button>Like</button>
              <button>Comment</button>
              <div className="comment-box">
                <input type="text" placeholder="Comment" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default Posts;
