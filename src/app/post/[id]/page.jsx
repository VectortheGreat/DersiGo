import PostDetail from "@/containers/post-detail-page/PostDetail";

const PostDetailPage = ({ params }) => {
  const loading = false;
  return (
    <div>
      <PostDetail params={params} loading={loading} />
    </div>
  );
};

export default PostDetailPage;
