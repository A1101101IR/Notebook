import UserSmByline from "../user/user-sm-byline";
import { Link, useParams } from "react-router-dom";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import Like from "../../img/like.png";
import More from "../../img/more.png";
import Bookmark from "../../img/bookmark.png";
import Delete from "../../img/delete.png";
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
  /* const commentBox = useRef([]);
  commentBox.current = [];
  const showComment = (el) => {
    console.log(el);
  }; */

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
  const showComments = () => {
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
                    <img
                      src={Delete}
                      alt=""
                      onClick={() => {
                        deletePost(post._id);
                      }}
                    />
                  )}
                  {currentUser !== post.authorId && (
                    <img src={Bookmark} alt="" />
                  )}
                </div>
              </div>
              <Link to={`/posts/${post._id}`} className="post-card-body">
                <p>{post.body}</p>
              </Link>
              <div className="post-card-footer">
                <button
                  onClick={() => {
                    addLike(post._id, post.likes);
                  }}
                >
                  {post.likes.length} like
                </button>
                <div className={`comment-box ${post._id}`}>
                  <input
                    onKeyPress={(e) =>
                      e.key === "Enter" && addComment(post._id)
                    }
                    onChange={(e) => setComment(e.target.value)}
                    onClick={showComments}
                    type="text"
                    placeholder="Comment"
                  />
                  {post.comments &&
                    post.comments.map((comment) => (
                      <div style={myStyle} id={post._id} className="comment">
                        <UserSmByline
                          id={comment.authorId}
                          key={comment.body}
                        />
                        <p>{comment.body}</p>
                      </div>
                    ))}
                  {/* ref={showComment} */}
                </div>
              </div>
            </div>
          ))}
    </>
  );
});
export default Posts;
