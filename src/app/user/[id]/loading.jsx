import UserDetail from "@/containers/user-detail-page/UserDetail";

const loading = () => {
  const loading = true;
  return (
    <div>
      <UserDetail loading={loading} />
    </div>
  );
};

export default loading;
