import CaptionComp from "@/components/CaptionComp";
import LimitComp from "@/components/paging/LimitComp";
import PageComp from "@/components/paging/PageComp";
import PostList from "@/components/post/PostList";

const PostContainer = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <CaptionComp />
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <PostList />
        </tbody>
      </table>
      <div className="flex justify-between p-2">
        <LimitComp />
        <PageComp />
      </div>
    </div>
  );
};

export default PostContainer;
