import useFatch from "../customHooks/useFetch";
import { Link, useParams } from "react-router-dom";
const Post = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useFatch(`/posts/${id}`);
  console.log(post, error, isLoading);
  return (
    <>
      <div>
        {isLoading && <p>{isLoading}</p>}
        {post && (
          <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};
export default Post;
