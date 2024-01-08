import PostContainer from "@/containers/post-page/PostContainer";

const Loading = () => {
  const loading = true;
  return (
    <div>
      <PostContainer loading={loading} />
    </div>
  );
};

export default Loading;
