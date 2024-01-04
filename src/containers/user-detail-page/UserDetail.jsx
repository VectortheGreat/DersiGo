import UserDetailComp from "@/components/user/UserDetailComp";
import { fetchUser } from "@/services/UserService";

const UserDetail = async ({ params }) => {
  const userDetail = await fetchUser(params.id);
  return (
    <div className="sm:container mx-auto mt-8 bg-gray-700">
      <UserDetailComp userDetail={userDetail} />
    </div>
  );
};

export default UserDetail;
