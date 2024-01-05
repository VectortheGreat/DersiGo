"use client";
import { setUsers } from "@/redux/features/userSlice";
import { fetchAllUsers, fetchUsers } from "@/services/UserService";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const fetchData = async () => {
    try {
      const data = await fetchUsers(page, limit);
      dispatch(setUsers(data));
      const data2 = await fetchAllUsers(50);
      console.log(data2);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return users?.data?.map((user, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <Link href={`/user/${user.id}`}>
          <Image src={user.picture} alt={user.firstName} width={50} height={50} className="rounded-full" />
        </Link>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-sky-600"
      >
        <Link href={`/user/${user.id}`}>
          {user.firstName} {user.lastName}
        </Link>
      </th>
      <td className="px-6 py-4">{user.title}</td>
      <td className="px-6 py-4 text-right">
        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  ));
};

export default UserList;
