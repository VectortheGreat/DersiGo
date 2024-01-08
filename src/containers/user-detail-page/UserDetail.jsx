import UserDetailComp from "@/components/user/user-detail/UserDetailComp";
import UserDetailSkeleton from "@/components/user/user-detail/UserDetailSkeleton";
import { fetchUser } from "@/services/UserService";

const UserDetail = async ({ params, loading }) => {
  if (params === undefined) return <div>404</div>;
  const userDetail = await fetchUser(params.id);
  return (
    <div className="sm:container mx-auto mt-8">
      {loading ? <UserDetailSkeleton /> : <UserDetailComp paramsId={params.id} userDetail={userDetail} />}
    </div>
  );
};

export default UserDetail;
