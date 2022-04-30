const Create = () => {
  const addPost = () => {};
  return (
    <form className="post-form">
      <input type="text" name="authorId" className="aauto-input" />
      <textarea type="text" name="body" id="body"></textarea>
      <button
        type="submit"
        onClick={() => {
          addPost();
        }}
      >
        Publisera
      </button>
    </form>
  );
};

export default Create;
