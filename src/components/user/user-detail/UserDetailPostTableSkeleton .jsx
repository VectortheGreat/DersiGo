const UserDetailPostTableSkeleton = () => {
  const skeletonData = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    image: "placeholder-image-url",
    text: "Loading...",
    likes: "Loading...",
    publishDate: "Loading...",
    tags: ["Loading", "Loading"],
  }));

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Loading Posts
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Text
            </th>
            <th scope="col" className="px-6 py-3">
              Likes
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {skeletonData.map((skeletonPost) => (
            <tr key={skeletonPost.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
              </th>
              <td className="px-6 py-4">
                <div className="w-24 h-4 bg-gray-500"></div>
              </td>
              <td className="px-6 py-4">
                <div className="w-16 h-4 bg-gray-500"></div>
              </td>
              <td className="px-6 py-4">
                <div className="w-20 h-4 bg-gray-500"></div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex space-x-1 justify-end">
                  <div className="w-16 h-4 bg-gray-500 rounded-full"></div>
                  <div className="w-16 h-4 bg-gray-500 rounded-full"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPostTableSkeleton;
