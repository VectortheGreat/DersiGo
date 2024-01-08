import UserDetail from "@/containers/user-detail-page/UserDetail";

const UserDetailPage = ({ params }) => {
  const loading = false;
  return (
    <div>
      <UserDetail params={params} loading={loading} />
    </div>
  );
};

export default UserDetailPage;
