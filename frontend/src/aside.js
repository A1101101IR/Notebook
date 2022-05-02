import { useParams } from "react-router-dom";
import Users from "./components/user/users";

const Aside = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <aside>
      <Users />
    </aside>
  );
};

export default Aside;
