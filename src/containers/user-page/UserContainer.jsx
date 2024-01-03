import { fetchUsers } from "@/services/UserService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserContainer = async () => {
  const users = await fetchUsers();
  console.log(users.data[0].picture);
  return (
    <div>
      {/* {users.data.map((user, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md my-2">
          <Image src={user.picture} width={60} height={60} alt="User Picture"></Image>

          <div className="font-bold text-xl">{user.firstName}</div>
          <div className="text-gray-500">{user.lastName}</div>
        </div>
      ))} */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <span>Tüm Üyeler</span>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Title
            </th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              <td className="px-0 py-0 lg:px-4 lg:py-4">
                {/* <Image
                  src={user.picture}
                  alt={user.firstName}
                  className="object-cover w-16 h-16 rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
                /> */}
                <Image src={user.picture} width={60} height={60} alt="User Picture"></Image>
              </td>

              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.firstName} {user.lastName}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.title}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserContainer;
