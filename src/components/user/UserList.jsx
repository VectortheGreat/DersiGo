"use client";
import { setLimit } from "@/redux/features/paginationSlice";
import { setUsers } from "@/redux/features/userSlice";
import { fetchAllUsers, fetchUsers } from "@/services/UserService";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserListSekeleton from "./UserListSekeleton";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const searchParams = useSearchParams();
  const searchParamQuery = searchParams.get("search");
  const fetchData = async () => {
    try {
      const data = await fetchUsers(page, limit);
      dispatch(setUsers(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const fetchAllUserData = async () => {
    try {
      const data = await fetchAllUsers();
      const filterSearch = data.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchParamQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchParamQuery.toLowerCase())
      );

      dispatch(setLimit(50));
      dispatch(setUsers({ data: filterSearch, total: filterSearch.length }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (searchParamQuery) {
      fetchAllUserData();
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchParams]);
  if (!users || users.page !== page) return <UserListSekeleton />;

  return users.data.map((user, index) => (
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
    </tr>
  ));
};

export default UserList;
