import useFatch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
const Posts = () => {
  const { data: posts, error, isLoading } = useFatch("/posts");
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {posts &&
        posts.map((post) => (
          <Link
            to={`/posts/${post._id}`}
            className="post-card-preview"
            key={post._id}
          >
            <div className="post-card-header">
              <div className="post-author-info">{post.author}</div>
              <div className="post-options-nav">...</div>
            </div>
            <div className="post-card-body">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div className="post-card-footer">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </Link>
        ))}
    </>
  );
};
export default Posts;
