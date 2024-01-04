import UserDetail from "@/containers/user-detail-page/UserDetail";

const UserDetailPage = ({ params }) => {
  return (
    <div>
      <UserDetail params={params} />
    </div>
  );
};

export default UserDetailPage;
