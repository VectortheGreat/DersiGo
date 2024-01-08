import PostDetailComp from "@/components/post/post-detail/PostDetailComp";
import PostDetailSkeleton from "@/components/post/post-detail/PostDetailSkeleton";
import { fetchPost } from "@/services/PostService";

const PostDetail = async ({ params, loading }) => {
  if (params === undefined) return <div>404</div>;
  const postDetail = await fetchPost(params.id);
  return (
    <div className="sm:container mx-auto mt-8">
      {loading ? <PostDetailSkeleton /> : <PostDetailComp postDetail={postDetail} />}
    </div>
  );
};

export default PostDetail;
