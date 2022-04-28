import useFatch from "../customHooks/useFetch";
import { Link } from "react-router-dom";
const Posts = () => {
  const { data: posts, error, isLoading } = useFatch("/posts");
  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {isLoading && <p>{isLoading}</p>}
        {posts &&
          posts.map((post) => (
            <div className="post-body" key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
export default Posts;
