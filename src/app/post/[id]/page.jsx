import PostDetail from "@/containers/post-detail-page/PostDetail";

const PostDetailPage = ({ params }) => {
  return (
    <div>
      <PostDetail params={params} />
    </div>
  );
};

export default PostDetailPage;
