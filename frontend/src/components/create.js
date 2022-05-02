import { useEffect, useState } from "react";
import useFatch from "./customHooks/useFetch";

const Create = () => {
  const authorId = localStorage.getItem("user");
  const { data: user, error, isLoading } = useFatch(`/users/${authorId}`);
  const [body, setBody] = useState();
  async function createPost(event) {
    event.preventDefault();
    const response = await fetch("/newpost", {
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
    window.location.reload(false);
    console.log(data);
  }

  return (
    <>
      <form className="post-form" onSubmit={createPost}>
        <textarea
          type="text"
          onChange={(e) => setBody(e.target.value)}
          placeholder={user && "Hej " + user.firstname + "! Vad händer? "}
        />
        <button>Publish</button>
      </form>
    </>
  );
};

export default Create;
