import useFatch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
import UserSmByline from "../user/user-sm-byline";
const UserPosts = (id) => {
  const { data: posts, error, isLoading } = useFatch(`/userposts/${id.id}`);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {posts &&
        posts.reverse().map((post) => (
          <Link
            to={`/posts/${post._id}`}
            className="post-card-preview"
            key={post._id}
          >
            <div className="post-card-header">
              <div className="post-author-info">
                <UserSmByline id={post.authorId} />
              </div>
              <div className="post-options-nav">
                <span>...</span>
              </div>
            </div>
            <div className="post-card-body">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div className="post-card-footer">
              <button>Like</button>
              <button>Comment</button>
              <input type="text" placeholder="Comment" />
              {/* <button>Share</button> */}
            </div>
          </Link>
        ))}
    </>
  );
};
export default UserPosts;
