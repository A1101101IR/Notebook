const Create = () => {
  return (
    <form action="/create-new" method="POST" className="post-form">
      <input type="text" name="author" className="auto-input" />
      <textarea name="body" id=""></textarea>
      <button>Publisera</button>
    </form>
  );
};

export default Create;
