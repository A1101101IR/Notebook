import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
const User = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useFatch(`/users/${id}`);
  return (
    <>
      <h1>{user && user.firstname}</h1>
    </>
  );
};

export default User;
