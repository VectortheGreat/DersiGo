import PostDetailComp from "@/components/post/PostDetailComp";
import { fetchPost } from "@/services/PostService";

const PostDetail = async ({ params }) => {
  const postDetail = await fetchPost(params.id);
  return (
    <div className="sm:container mx-auto mt-8 bg-gray-700">
      {<PostDetailComp postDetail={postDetail} />}

      <h1>Comments</h1>
    </div>
  );
};

export default PostDetail;
