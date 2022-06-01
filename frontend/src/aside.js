import Users from "./components/user/users";
import { useParams } from "react-router-dom";

const Aside = () => {
  const { id } = useParams();

  return <aside>{/* <Users /> */}</aside>;
};

export default Aside;
