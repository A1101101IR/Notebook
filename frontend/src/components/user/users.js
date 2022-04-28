import useFatch from "../customHooks/useFetch";
const Users = () => {
  const { data: users, error, isLoading } = useFatch("/posts");
  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {isLoading && <p>{isLoading}</p>}
        {users && users.map((user) => <p key={user._id}>{user.username}</p>)}
      </div>
    </>
  );
};

export default Users;
