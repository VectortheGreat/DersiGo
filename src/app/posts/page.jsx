import PostContainer from "@/containers/post-page/PostContainer";

const PostsPage = () => {
  const loading = false;
  return (
    <div>
      <PostContainer loading={loading} />
    </div>
  );
};

export default PostsPage;
