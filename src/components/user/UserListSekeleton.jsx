"use client";
import { useSelector } from "react-redux";

const UserListSekeleton = () => {
  const limit = useSelector((state) => state.pagination.limit);
  const skeletonElements = Array.from({ length: limit }, (_, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
      <td className="px-6 py-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-sky-600"
      >
        <div className="w-32 h-4 bg-gray-300"></div>
      </th>
      <td className="px-6 py-4">
        <div className="w-20 h-4 bg-gray-300"></div>
      </td>
    </tr>
  ));

  return <>{skeletonElements}</>;
};

export default UserListSekeleton;
