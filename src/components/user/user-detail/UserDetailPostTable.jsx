import Image from "next/image";
import Link from "next/link";

const UserDetailPostTable = ({ userPosts, userName }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {userName}&apos;s Posts
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
          {userPosts.map((userPost, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link href={`/post/${userPost.id}`}>
                  <Image
                    src={userPost.image}
                    alt={userPost.text}
                    width={50}
                    height={50}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                </Link>
              </th>
              <td className="px-6 py-4">
                <Link href={`/post/${userPost.id}`} className="hover:text-sky-600">
                  {userPost.text}
                </Link>
              </td>
              <td className="px-6 py-4">{userPost.likes}</td>
              <td className="px-6 py-4">{userPost.publishDate.split("T")[0]}</td>
              <td className="px-6 py-4 text-right">
                {userPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex mx-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800"
                  >
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPostTable;
