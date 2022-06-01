import Like from "../../img/like.png";
import Delete from "../../img/delete.png";
import { useParams } from "react-router-dom";
import Bookmark from "../../img/bookmark.png";
import UserSmByline from "../user/user-sm-byline";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Posts = forwardRef((props, ref) => {
  const id = useParams();
  useImperativeHandle(ref, () => ({
    reload() {
      getPosts();
    },
  }));
  const currentUser = localStorage.getItem("user");

  const [posts, setPosts] = useState();

  /**
   * This function will fetch posts data depending on current page URL.
   * if user is in main page, there is not any id and it will fetch all posts data
   * otherwise if user is in a user page (profile) there will be a id
   * and therefor it will fetch posts data depending on this id.
   * @param {string} id user id depending on url
   */
  async function getPosts() {
    if (id.id == null || undefined) {
      const res = await fetch("/posts");
      const data = await res.json();
      setPosts(data);
    } else {
      const res = await fetch(`/posts/user/${id.id}`);
      const data = await res.json();
      setPosts(data);
    }
  }

  /**
   * This feature will delete posts depending on the ID it receives.
   * @param {string} id the post ID to be deleted
   */
  async function deletePost(id) {
    const res = await fetch(`/posts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.status === 200) {
      getPosts();
    }
  }

  const [comment, setComment] = useState();
  /**
   * This function will add comment to post depending on the ID it receives.
   * @param {string} id         Post ID to the post which comment to be added.
   * @param {string} authorId   Current user id, who create the comment.
   * @param {string} comment    Comments content.
   */
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

  const [myStyle, setMyStyle] = useState();
  const [commentBox, setCommentBox] = useState();
  /**
   * This function will display comment box depending on the post ID it receives.
   * @param {string} id         Post ID for the post that users have clicked on.
   */
  const showComments = (id) => {
    setCommentBox(id);
    setMyStyle({ display: "block" });
  };

  /* const myArr = [1, 2, 3, 4]; */
  /**
   * This function goes through evert posts like array
   * in order to see if the user has liked it or no.
   * if YES, it will return true, then we show disslike button.
   * if NO, it will return false, then we show like button.
   * @param {string} currentUser  Current user id,
   * @param {string} likeArr  The post like array, which consists of user IDs.
   */
  function likeBTN(likeArr, currentUser) {
    for (let i = 0; i < likeArr.length; i++) {
      console.log(likeArr[i].like);
      if (likeArr[i].like === currentUser) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * This function will add of remove posts like, depending on server response.
   * it sends a POST request to add a like, if it receives a positive response. updates the post.
   * otherwise it send a DELETE request in order to delete users like, (dislike)
   * @param {string} id           Post ID for the post that user will like or dislike
   * @param {string} currentUser  Current user id, which is used to count and identify like.
   */
  async function addLike(id) {
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
              <div className="post-card-body">
                <p>{post.body}</p>
              </div>
              <div className="post-card-footer">
                <div
                  className="like-box"
                  onClick={() => {
                    addLike(post._id, post.likes);
                  }}
                >
                  <img src={Like} alt="likeeee" />
                  {post.likes.length !== 0 && <span>{post.likes.length}</span>}
                </div>
                <div className={"comment-box"}>
                  <input
                    onKeyPress={(e) =>
                      e.key === "Enter" && addComment(post._id)
                    }
                    onChange={(e) => setComment(e.target.value)}
                    onClick={() => showComments(post._id)}
                    type="text"
                    placeholder="Comment"
                  />
                  {post.comments &&
                    post.comments.map((comment) => (
                      <>
                        {commentBox === post._id && (
                          <div
                            key={comment.body}
                            className={"comment"}
                            style={myStyle}
                          >
                            <UserSmByline
                              id={comment.authorId}
                              key={comment.body}
                            />
                            <p>{comment.body}</p>
                          </div>
                        )}
                      </>
                    ))}
                </div>
              </div>
            </div>
          ))}
    </>
  );
});
export default Posts;
