import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const User = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useFatch(`/users/${id}`);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>{isLoading}</p>}
      {user && <h4>{user.firstname + " " + user.lastname}</h4>}
    </>
  );
};

export default User;
