import UserContainer from "@/containers/user-page/UserContainer";

const Loading = () => {
  const loading = true;
  return (
    <div>
      <UserContainer loading={loading} />
    </div>
  );
};

export default Loading;
