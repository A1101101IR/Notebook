import { useState } from "react";

const Create = () => {
  const [authorId, setAuthorId] = useState();
  const [body, setBody] = useState();
  const aid = "626da495422f688882f886d0";
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
        <input
          type="text"
          onChange={(e) => setAuthorId(e.target.value)}
          placeholder="id"
        />
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
