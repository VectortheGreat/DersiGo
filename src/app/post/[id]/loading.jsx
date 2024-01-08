import PostDetail from "@/containers/post-detail-page/PostDetail";

const loading = () => {
  const loading = true;
  return (
    <div>
      <PostDetail loading={loading} />
    </div>
  );
};

export default loading;
