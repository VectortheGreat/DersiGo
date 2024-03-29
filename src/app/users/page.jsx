import UserContainer from "@/containers/user-page/UserContainer";
import "@/app/globals.css";

const UsersPage = () => {
  const loading = false;
  return (
    <div>
      <UserContainer loading={loading} />
    </div>
  );
};

export default UsersPage;
