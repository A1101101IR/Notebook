import { useEffect, useState } from "react";
import useFatch from "./customHooks/useFetch";

const Create = (currentUser) => {
  const authorId = localStorage.getItem("user");
  const currentUserData = currentUser.data;
  const [body, setBody] = useState();

  async function createPost(event) {
    event.preventDefault();
    const response = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId,
        body,
      }),
    });
    const data = await response.json();
    /* window.location.reload(false); */
    console.log(data);
  }

  return (
    <>
      <form className="post-form" onSubmit={createPost}>
        <textarea
          type="text"
          onChange={(e) => setBody(e.target.value)}
          placeholder={
            currentUserData &&
            "Hej " + currentUserData.firstname + "! Vad händer? "
          }
        />
        <button>Publish</button>
      </form>
    </>
  );
};

export default Create;
