const Create = () => {
  return (
    <div>
      <h1>Create someting new!</h1>
      <form action="/create-new" method="POST">
        <label htmlFor="title"></label>
        <input type="text" name="title" placeholder="Title" />
        <label htmlFor="body"></label>
        <input type="text" name="body" placeholder="Body" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Create;
