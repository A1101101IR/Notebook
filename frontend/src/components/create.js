import { useState } from "react";

const Create = () => {
  const authorId = "626da81fbf53b876a68bc65f";
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
    console.log(data);
  }
  return (
    <>
      <form className="post-form" onSubmit={createPost}>
        <textarea
          type="text"
          onChange={(e) => setBody(e.target.value)}
          placeholder="body"
        />
        <button>Publish</button>
      </form>
    </>
  );
};

export default Create;
