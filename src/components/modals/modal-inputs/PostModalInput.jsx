"use client";
import { fetchAllUsers } from "@/services/UserService";
import { postInputTypes } from "@/utils/inputTypes";
import { useEffect, useState } from "react";

const PostModalInput = ({ onchangeFunc, postInfo, postModalQuery }) => {
  const [users, setUsers] = useState([]);

  const fetchAllUserData = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  return postInputTypes.map((input, index) => {
    if (input.name === "owner" && postModalQuery === "update") {
      return null;
    }
    return (
      <div key={index} className={input.col === 2 ? "col-span-2 sm:col-span-1" : "col-span-1 sm:col-span-2"}>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {input.label}
        </label>
        {input.type === "select" ? (
          <select
            name={input.name}
            id={input.id}
            onChange={(e) => onchangeFunc(e)}
            value={postInfo[input.name]}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            {users?.map((user, index) => (
              <option key={index} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={input.type}
            name={input.name}
            id={input.id}
            value={postInfo[input.name]}
            onChange={(e) => onchangeFunc(e)}
            placeholder={input.placeholder}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required={input.required ? true : false}
          />
        )}
      </div>
    );
  });
};

export default PostModalInput;
