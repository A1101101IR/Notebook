import useFatch from "../customHooks/useFetch";
import { Link, useParams } from "react-router-dom";
import UserSmByline from "../user/user-sm-byline";
const Post = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useFatch(`/posts/${id}`);
  console.log(post, error, isLoading);
  return (
    <>
      <div>
        {isLoading && <p>{isLoading}</p>}
        {post && (
          <div className="post-card-preview">
            <div className="post-card-header">
              <div className="post-author-info">
                <UserSmByline id={post.authorId} />
              </div>
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
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};
export default Post;
